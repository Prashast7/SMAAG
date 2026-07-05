export type FaqEntry = {
  id: string;
  category: string;
  question: string;
  keywords: string[];
  answer: string;
  related: string[];
};

export const FAQ_FALLBACK_RESPONSE =
  "I don't have a specific answer for that, but I'd love to make sure you get one — reach out to shivangi@smaagcpa.com and we'll get back to you directly.";

export const FAQ_STARTER_QUESTIONS = [
  "What services do you offer?",
  "Do you handle audits?",
  "How do I get started?",
  "What industries do you work with?",
  "How much does this cost?",
];

/**
 * Verbatim knowledge base. `id` values are inferred slugs that make the
 * `related` cross-references in the source content resolve to real entries —
 * question/keywords/answer/category/related are otherwise reproduced as given.
 */
export const FAQ_KNOWLEDGE_BASE: FaqEntry[] = [
  {
    id: "firm_identity",
    category: "firm_identity",
    question: "What is SMAAG?",
    keywords: ["smaag", "firm", "company", "who", "are", "you", "about"],
    answer:
      "SMAAG stands for SM Assurance & Advisory Group, APC — a California-licensed CPA firm based in Sunnyvale. Our tagline is 'Assurance. Advisory. Delivered.' We help businesses with bookkeeping, financial statement preparation, and internal controls and advisory work.",
    related: ["founder_background", "location", "services_overview"],
  },
  {
    id: "founder_background",
    category: "firm_identity",
    question: "Who founded SMAAG?",
    keywords: ["founder", "founded", "who", "started", "owner", "shivangi"],
    answer:
      "SMAAG was founded by Shivangi Mansinghka, a licensed California CPA with experience at KPMG, Deloitte, PwC/Aprio, and Grant Thornton. She brings Big 4-caliber expertise to businesses that need senior-level financial guidance without Big 4 overhead.",
    related: ["firm_identity", "why_smaag"],
  },
  {
    id: "licensed_credentials",
    category: "firm_identity",
    question: "Is SMAAG a licensed CPA firm?",
    keywords: [
      "licensed",
      "legit",
      "credentials",
      "cpa",
      "real",
      "legitimate",
      "certified",
    ],
    answer:
      "Yes — SMAAG is a California Professional Corporation (APC), the entity structure required by California law for CPA firms, and is led by a licensed California CPA.",
    related: ["firm_identity", "founder_background"],
  },
  {
    id: "location",
    category: "firm_identity",
    question: "Where is SMAAG located?",
    keywords: [
      "location",
      "where",
      "address",
      "based",
      "office",
      "sunnyvale",
      "california",
    ],
    answer:
      "SMAAG is based in Sunnyvale, California, and is licensed to practice as a CPA firm in California.",
    related: ["contact_info", "remote_clients"],
  },
  {
    id: "remote_clients",
    category: "firm_identity",
    question: "Do you work with clients outside California?",
    keywords: [
      "remote",
      "outside",
      "other",
      "states",
      "nationwide",
      "virtual",
      "clients",
    ],
    answer:
      "Our licensing is California-based, but many of our services can be delivered remotely. Reach out to shivangi@smaagcpa.com to discuss your specific location and needs.",
    related: ["location", "getting_started"],
  },
  {
    id: "services_overview",
    category: "services",
    question: "What services do you offer?",
    keywords: ["services", "offer", "do", "what", "provide", "help", "with"],
    answer:
      "SMAAG currently offers three core services: bookkeeping and accounting, financial statement preparation, and internal controls and business advisory. We're building out additional services over time, including audit and attest work once our firm permit is finalized.",
    related: [
      "bookkeeping_detail",
      "financial_statements_detail",
      "advisory_detail",
    ],
  },
  {
    id: "bookkeeping_detail",
    category: "services",
    question: "What does your bookkeeping service include?",
    keywords: [
      "bookkeeping",
      "accounting",
      "books",
      "reconcile",
      "reconciliation",
      "monthly",
      "transactions",
    ],
    answer:
      "Our bookkeeping and accounting service covers day-to-day recordkeeping, bank and credit card reconciliations, and month-end or quarter-end close support — keeping your books accurate and current so you always know where your business stands.",
    related: ["services_overview", "financial_statements_detail"],
  },
  {
    id: "financial_statements_detail",
    category: "services",
    question: "What does financial statement preparation include?",
    keywords: [
      "financial",
      "statements",
      "statement",
      "preparation",
      "balance",
      "sheet",
      "income",
      "prepare",
    ],
    answer:
      "We prepare financial statements for internal management use, lenders, investors, or other stakeholders — giving you a clear, professional picture of your business's financial position.",
    related: ["bookkeeping_detail", "services_overview"],
  },
  {
    id: "advisory_detail",
    category: "services",
    question: "What is internal controls and business advisory?",
    keywords: [
      "internal",
      "controls",
      "advisory",
      "business",
      "process",
      "consulting",
    ],
    answer:
      "This service focuses on evaluating and strengthening how your business manages financial processes — identifying gaps, designing better controls, and providing advisory support on operational and financial decisions.",
    related: ["services_overview", "why_smaag"],
  },
  {
    id: "audit_handling",
    category: "services",
    question: "Do you handle audits?",
    keywords: [
      "audit",
      "audits",
      "assurance",
      "attest",
      "review",
      "compilation",
    ],
    answer:
      "Not yet — we're currently in the process of obtaining our audit/attest firm permit through the California Board of Accountancy. In the meantime, we're glad to support you with bookkeeping, financial statement preparation, and advisory services. Reach out to discuss your needs and we'll keep you posted on timing.",
    related: ["services_overview", "getting_started"],
  },
  {
    id: "audit_availability",
    category: "services",
    question: "When will you offer audit services?",
    keywords: ["when", "audit", "timeline", "permit", "available", "soon"],
    answer:
      "We don't have a fixed date to share yet — our audit/attest permit is in progress. If audit or assurance work is something you'll need, reach out to shivangi@smaagcpa.com and we can talk through timing and options for your situation.",
    related: ["audit_availability", "getting_started"],
  },
  {
    id: "industries",
    category: "services",
    question: "What industries do you work with?",
    keywords: ["industry", "industries", "sector", "type", "business", "niche"],
    answer:
      "We work with businesses across a range of industries — we haven't limited ourselves to one niche. Reach out and we can talk through your specific business and needs.",
    related: ["services_overview", "why_smaag"],
  },
  {
    id: "tax_services",
    category: "services",
    question: "Do you offer tax services?",
    keywords: ["tax", "taxes", "filing", "return", "irs"],
    answer:
      "Tax services aren't part of our current core offerings, which are bookkeeping, financial statement preparation, and advisory. Reach out to shivangi@smaagcpa.com to discuss your specific needs — we may be able to point you in the right direction even if it's outside our current scope.",
    related: ["services_overview", "contact_info"],
  },
  {
    id: "getting_started",
    category: "getting_started",
    question: "How do I get started?",
    keywords: [
      "start",
      "started",
      "begin",
      "onboard",
      "sign",
      "up",
      "hire",
      "engage",
    ],
    answer:
      "Getting started is simple — email shivangi@smaagcpa.com or reach out through our LinkedIn page to schedule an initial conversation. We'll talk through your needs, scope the right services, and get you set up from there.",
    related: ["engagement_process", "contact_info"],
  },
  {
    id: "engagement_process",
    category: "getting_started",
    question: "What happens after I reach out?",
    keywords: [
      "process",
      "happens",
      "next",
      "steps",
      "after",
      "contact",
      "meeting",
    ],
    answer:
      "After you reach out, we'll set up a short discovery call to understand your business and what you need. From there, we scope the right services for you, put together a formal engagement letter, and begin onboarding — collecting the information we need and setting up secure access to your financial systems.",
    related: ["getting_started", "onboarding_documents"],
  },
  {
    id: "onboarding_documents",
    category: "getting_started",
    question: "What documents do I need to provide?",
    keywords: [
      "documents",
      "need",
      "provide",
      "records",
      "information",
      "paperwork",
    ],
    answer:
      "This depends on the services you need, but typically includes access to your accounting software (like QuickBooks or Xero), recent financial statements, and relevant bank or transaction records. We'll walk you through exactly what's needed once we've scoped your engagement.",
    related: ["onboarding_documents", "engagement_process"],
  },
  {
    id: "onboarding_timeline",
    category: "getting_started",
    question: "How long does onboarding take?",
    keywords: ["onboarding", "long", "time", "take", "quick", "fast"],
    answer:
      "Onboarding timing depends on the complexity of your books and how quickly records can be gathered. We'll give you a clear timeline once we understand your specific situation — reach out to shivangi@smaagcpa.com to get that conversation started.",
    related: ["getting_started", "onboarding_documents"],
  },
  {
    id: "pricing",
    category: "pricing",
    question: "How much does this cost?",
    keywords: [
      "cost",
      "price",
      "pricing",
      "fee",
      "fees",
      "charge",
      "rate",
      "expensive",
    ],
    answer:
      "Pricing depends on the scope of work and your specific needs — every engagement is scoped individually. Reach out to shivangi@smaagcpa.com for a conversation and a tailored quote.",
    related: ["getting_started", "services_overview"],
  },
  {
    id: "fee_structure",
    category: "pricing",
    question: "Do you charge hourly or a flat fee?",
    keywords: ["hourly", "flat", "fee", "structure", "billing", "retainer"],
    answer:
      "Fee structure depends on the engagement and what fits your business best. We'll discuss the right approach for you during your initial conversation — reach out to shivangi@smaagcpa.com.",
    related: ["pricing", "getting_started"],
  },
  {
    id: "minimum_engagement",
    category: "pricing",
    question: "Is there a minimum engagement size?",
    keywords: ["minimum", "small", "business", "size", "too", "small"],
    answer:
      "We work with businesses of varying sizes and don't have a fixed minimum publicly set. Reach out and we can talk through whether SMAAG is the right fit for where your business is today.",
    related: ["pricing", "industries"],
  },
  {
    id: "trust_and_security",
    category: "trust_and_security",
    question: "How do you handle confidential financial information?",
    keywords: [
      "confidential",
      "security",
      "secure",
      "private",
      "privacy",
      "safe",
      "data",
      "information",
    ],
    answer:
      "Client confidentiality is fundamental to how we operate as a CPA firm. We handle financial documents and records with strict confidentiality and limit access appropriately. If you have specific security requirements, let us know during onboarding and we'll work through them together.",
    related: ["firm_identity", "onboarding_documents"],
  },
  {
    id: "insurance",
    category: "trust_and_security",
    question: "Are you insured?",
    keywords: ["insured", "insurance", "liability", "coverage", "bonded"],
    answer:
      "Yes, SMAAG carries professional liability insurance as part of operating as a licensed CPA firm.",
    related: ["firm_identity", "trust_and_security"],
  },
  {
    id: "communication",
    category: "trust_and_security",
    question: "How do you communicate with clients?",
    keywords: [
      "communication",
      "communicate",
      "contact",
      "updates",
      "check",
      "in",
      "meetings",
    ],
    answer:
      "We tailor communication to what works for each client — typically regular check-ins to review your financials and address any questions, alongside email for day-to-day items. We'll set expectations together during onboarding.",
    related: ["getting_started", "why_smaag"],
  },
  {
    id: "why_smaag",
    category: "why_smaag",
    question: "Why should I choose SMAAG over a bigger firm?",
    keywords: [
      "why",
      "choose",
      "different",
      "bigger",
      "big",
      "firm",
      "compare",
      "versus",
    ],
    answer:
      "SMAAG gives you direct access to Big 4-caliber expertise — our founder has worked at KPMG, Deloitte, PwC/Aprio, and Grant Thornton — without the overhead, bureaucracy, or junior-staff turnover common at larger firms. You get senior-level attention on your business.",
    related: ["founder_background", "firm_identity"],
  },
  {
    id: "solo_bookkeeper_comparison",
    category: "why_smaag",
    question: "Why should I choose SMAAG over a solo bookkeeper?",
    keywords: [
      "why",
      "solo",
      "bookkeeper",
      "freelancer",
      "alone",
      "individual",
    ],
    answer:
      "SMAAG is a licensed CPA firm, which means the work is backed by professional standards, licensing accountability, and insurance — combined with the personal attention of a smaller firm. You get both credibility and responsiveness.",
    related: ["why_smaag", "trust_and_security"],
  },
  {
    id: "startup_friendly",
    category: "why_smaag",
    question: "Are you a startup-friendly firm?",
    keywords: ["startup", "startups", "new", "business", "early", "stage"],
    answer:
      "We work with businesses across a range of stages, including newer businesses that need reliable financial foundations built early. Reach out and we can talk through where your business is and what support makes sense right now.",
    related: ["industries", "getting_started"],
  },
  {
    id: "contact_info",
    category: "contact",
    question: "How do I contact SMAAG?",
    keywords: [
      "contact",
      "email",
      "reach",
      "phone",
      "call",
      "get",
      "in",
      "touch",
    ],
    answer:
      "You can reach us at shivangi@smaagcpa.com, or find us on LinkedIn under SMAAG. We'll respond and set up time to talk through your needs.",
    related: ["getting_started", "location"],
  },
  {
    id: "free_consultation",
    category: "contact",
    question: "Do you offer a free consultation?",
    keywords: [
      "free",
      "consultation",
      "call",
      "discovery",
      "initial",
      "meeting",
      "no",
      "cost",
    ],
    answer:
      "Reach out to shivangi@smaagcpa.com to schedule an initial conversation about your needs — we're happy to talk through your situation before any commitment is made.",
    related: ["getting_started", "pricing"],
  },
];
