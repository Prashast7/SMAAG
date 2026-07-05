import { FAQ_KNOWLEDGE_BASE, type FaqEntry } from "@/lib/faq/knowledge-base";

// Common English words that carry no matching signal on their own. Includes
// apostrophe-stripped contractions (who's -> whos) since normalize() removes
// punctuation before these are checked — otherwise a contraction survives
// this filter, then stemming can turn it into a literal (but generic) KB
// keyword like "who" and cause a false match on an unrelated question.
const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "do",
  "does",
  "did",
  "have",
  "has",
  "had",
  "i",
  "you",
  "your",
  "we",
  "they",
  "it",
  "this",
  "that",
  "these",
  "those",
  "to",
  "of",
  "for",
  "and",
  "or",
  "but",
  "if",
  "so",
  "on",
  "in",
  "at",
  "by",
  "can",
  "could",
  "will",
  "would",
  "should",
  "may",
  "might",
  "what",
  "whats",
  "how",
  "hows",
  "much",
  "does",
  "any",
  "some",
  "there",
  "who",
  "whos",
  "where",
  "wheres",
  "thats",
]);

// Generic connector words that show up across many different questions
// (e.g. nearly every services question uses "offer"). Left in the keyword
// arrays verbatim, but down-weighted during scoring so they can't single-
// handedly out-score a rarer, more distinctive keyword like "tax" or "audit".
const WEAK_SIGNAL_WORDS = new Set([
  "service",
  "offer",
  "do",
  "what",
  "with",
  "help",
  "provide",
  "business",
  "company",
  "firm",
  "work",
]);

function keywordWeight(word: string): number {
  return WEAK_SIGNAL_WORDS.has(word) ? 0.5 : 1;
}

// Informal phrasing mapped to a literal word that already exists in the
// knowledge base's own keyword lists — this widens recall without needing
// the scorer to understand anything beyond direct token overlap.
const SYNONYM_MAP: Record<string, string> = {
  // cost / price / fee / charge -> pricing
  costs: "cost",
  price: "cost",
  prices: "cost",
  pricing: "cost",
  fee: "cost",
  fees: "cost",
  charge: "cost",
  charges: "cost",
  rates: "rate",
  budget: "cost",
  budgets: "cost",
  quote: "cost",
  quotes: "cost",
  afford: "cost",
  affordable: "cost",
  // audit / assurance / attest -> audit
  audits: "audit",
  auditor: "audit",
  auditing: "audit",
  attestation: "audit",
  assure: "audit",
  // start / begin / onboard / sign up -> getting_started
  starting: "start",
  begin: "start",
  beginning: "start",
  began: "start",
  onboard: "start",
  onboarding: "start",
  signup: "start",
  join: "start",
  enroll: "start",
  register: "start",
  hire: "start",
  // where / located / address -> location
  where: "location",
  located: "location",
  address: "location",
  situated: "location",
  city: "location",
  area: "location",
  // misc extra recall
  offerings: "services",
  offering: "services",
  sector: "industry",
  verticals: "industry",
  vertical: "industry",
  reach: "contact",
  message: "contact",
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Folds simple plurals (taxes -> tax, statements -> statement) so singular
// and plural phrasing overlap without needing duplicate keyword entries.
function stem(word: string): string {
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) {
    return word.slice(0, -1);
  }
  return word;
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((word) => word.length > 1 && !STOPWORDS.has(word))
    .map(stem);
}

function expandSynonyms(tokens: string[]): string[] {
  const expanded = new Set<string>();

  for (const token of tokens) {
    expanded.add(token);
    const synonym = SYNONYM_MAP[token];
    if (synonym) {
      expanded.add(synonym);
    }
  }

  return Array.from(expanded);
}

// Minimal edit distance, used only to tolerate short typos on longer words.
function levenshteinDistance(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, (_, i) => [
    i,
    ...Array.from({ length: cols - 1 }, () => 0),
  ]);

  for (let col = 1; col < cols; col += 1) {
    matrix[0][col] = col;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}

function fuzzyIncludes(keywordSet: Set<string>, token: string): boolean {
  if (token.length < 4) return false;

  for (const keyword of keywordSet) {
    if (keyword.length < 4) continue;
    if (Math.abs(keyword.length - token.length) > 1) continue;
    if (levenshteinDistance(token, keyword) <= 1) {
      return true;
    }
  }

  return false;
}

type EntryScore = {
  score: number;
  // Count of hits on non-generic keywords (weight === 1). Used as the
  // primary tie-break so a distinctive word like "tax" or "audit" can't be
  // out-scored by an unrelated entry that merely shares generic connector
  // words (e.g. "offer"/"services") with the query.
  strongMatches: number;
};

function scoreEntry(tokens: string[], entry: FaqEntry): EntryScore {
  const keywordSet = new Set(
    entry.keywords.map((keyword) => stem(keyword.toLowerCase())),
  );
  const questionTokens = new Set(tokenize(entry.question));

  let score = 0;
  let strongMatches = 0;

  for (const token of tokens) {
    const weight = keywordWeight(token);

    if (keywordSet.has(token)) {
      score += weight;
      if (weight === 1) strongMatches += 1;
    } else if (fuzzyIncludes(keywordSet, token)) {
      score += weight * 0.75;
      if (weight === 1) strongMatches += 1;
    }

    if (questionTokens.has(token)) {
      score += weight * 0.5;
    }
  }

  return { score, strongMatches };
}

// Meaningful-overlap threshold — tune here if matches feel too loose/strict.
// 1.5 = one exact keyword hit plus the question-phrase bonus, which is the
// realistic floor for short questions that stopword-stripping reduces to a
// single content word (e.g. "How much does this cost?" -> just "cost").
const MATCH_THRESHOLD = 1.5;

export type FaqMatchResult = {
  entry: FaqEntry;
  score: number;
};

/** Runs entirely synchronously in the browser — no network calls. */
export function matchFaq(input: string): FaqMatchResult | null {
  const tokens = expandSynonyms(tokenize(input));

  if (tokens.length === 0) {
    return null;
  }

  let best: (FaqMatchResult & { strongMatches: number }) | null = null;

  for (const entry of FAQ_KNOWLEDGE_BASE) {
    const { score, strongMatches } = scoreEntry(tokens, entry);

    const isBetter =
      !best ||
      strongMatches > best.strongMatches ||
      (strongMatches === best.strongMatches && score > best.score);

    if (isBetter) {
      best = { entry, score, strongMatches };
    }
  }

  if (!best || best.score < MATCH_THRESHOLD) {
    return null;
  }

  return { entry: best.entry, score: best.score };
}

export function getFaqEntryById(id: string): FaqEntry | undefined {
  return FAQ_KNOWLEDGE_BASE.find((entry) => entry.id === id);
}

/** Related questions for an entry, excluding any accidental self-reference. */
export function getRelatedEntries(entry: FaqEntry, limit = 3): FaqEntry[] {
  const related: FaqEntry[] = [];

  for (const relatedId of entry.related) {
    if (relatedId === entry.id) continue;
    const relatedEntry = getFaqEntryById(relatedId);
    if (relatedEntry && !related.includes(relatedEntry)) {
      related.push(relatedEntry);
    }
    if (related.length >= limit) break;
  }

  return related;
}
