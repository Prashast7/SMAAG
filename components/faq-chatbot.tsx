"use client";

import { useEffect, useId, useRef, useState } from "react";

import { MessageCircle, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FAQ_CATEGORY_LABELS,
  FAQ_FALLBACK_RESPONSE,
  type FaqEntry,
} from "@/lib/faq/knowledge-base";
import {
  FAQ_STARTER_ENTRIES,
  getFaqBatch,
  getRelatedEntries,
  isGreeting,
  matchFaq,
} from "@/lib/faq/matcher";
import { cn } from "@/lib/utils";

type Chip =
  | { type: "question"; text: string; category: string }
  | { type: "browse"; offset: number };

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  chips?: Chip[];
};

const WELCOME_MESSAGE =
  "Hi, I'm the SMAAG FAQ assistant. Ask me anything about our services, or pick a question below.";
const GREETING_REPLY =
  "Hi there! Ask me anything about SMAAG, or pick a question below.";
const BROWSE_MORE_LABEL = "See more questions →";
const BROWSE_TRIGGER_TEXT = "See more questions";

let messageIdCounter = 0;
function nextMessageId() {
  messageIdCounter += 1;
  return `msg-${messageIdCounter}`;
}

function toQuestionChips(entries: FaqEntry[]): Chip[] {
  return entries.map((entry) => ({
    type: "question",
    text: entry.question,
    category: entry.category,
  }));
}

// Every bot reply offers a fresh "browse all" entry point, in addition to
// whatever question-specific chips it also carries.
function withBrowseChip(chips: Chip[]): Chip[] {
  return [...chips, { type: "browse", offset: 0 }];
}

function answerQuestion(question: string): ChatMessage {
  if (isGreeting(question)) {
    return {
      id: nextMessageId(),
      role: "bot",
      text: GREETING_REPLY,
      chips: withBrowseChip(toQuestionChips(FAQ_STARTER_ENTRIES)),
    };
  }

  const match = matchFaq(question);

  if (!match) {
    return {
      id: nextMessageId(),
      role: "bot",
      text: FAQ_FALLBACK_RESPONSE,
      chips: withBrowseChip(toQuestionChips(FAQ_STARTER_ENTRIES)),
    };
  }

  const related = getRelatedEntries(match.entry);

  return {
    id: nextMessageId(),
    role: "bot",
    text: match.entry.answer,
    chips: withBrowseChip(toQuestionChips(related)),
  };
}

function browseMessage(offset: number): ChatMessage {
  const { entries, nextOffset } = getFaqBatch(offset);
  const chips: Chip[] = toQuestionChips(entries);

  if (nextOffset !== null) {
    chips.push({ type: "browse", offset: nextOffset });
  }

  return {
    id: nextMessageId(),
    role: "bot",
    text: "Here are more questions you can ask:",
    chips,
  };
}

/** Fully client-side FAQ chat widget — no network calls, no API keys. */
export function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputId = useId();

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: nextMessageId(),
          role: "bot",
          text: WELCOME_MESSAGE,
          chips: withBrowseChip(toQuestionChips(FAQ_STARTER_ENTRIES)),
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function submitQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || thinking) return;

    setMessages((current) => [
      ...current,
      { id: nextMessageId(), role: "user", text: trimmed },
    ]);
    setInputValue("");
    setThinking(true);

    // Brief flicker so an instant, synchronous answer doesn't feel jarring.
    window.setTimeout(() => {
      setMessages((current) => [...current, answerQuestion(trimmed)]);
      setThinking(false);
    }, 250);
  }

  function browseMore(offset: number) {
    if (thinking) return;

    setMessages((current) => [
      ...current,
      { id: nextMessageId(), role: "user", text: BROWSE_TRIGGER_TEXT },
    ]);
    setThinking(true);

    window.setTimeout(() => {
      setMessages((current) => [...current, browseMessage(offset)]);
      setThinking(false);
    }, 250);
  }

  function handleChipClick(chip: Chip) {
    if (chip.type === "question") {
      submitQuestion(chip.text);
    } else {
      browseMore(chip.offset);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(inputValue);
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end sm:right-6 sm:bottom-6">
      {open ? (
        <div
          aria-label="SMAAG FAQ chat"
          aria-modal="true"
          className="border-border bg-card mb-3 flex h-[32rem] max-h-[75vh] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border shadow-lg"
          role="dialog"
        >
          <div className="border-border bg-primary text-primary-foreground flex items-center justify-between gap-3 border-b px-4 py-3">
            <div>
              <p className="text-small font-semibold">SMAAG FAQ Assistant</p>
              <p className="text-caption text-primary-foreground/80">
                Instant answers, no waiting
              </p>
            </div>
            <Button
              aria-label="Close FAQ chat"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setOpen(false)}
              size="icon"
              variant="ghost"
            >
              <X aria-hidden="true" />
            </Button>
          </div>

          <div
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            ref={logRef}
          >
            {messages.map((message) => {
              let lastCategory: string | null = null;

              return (
                <div key={message.id} className="space-y-2">
                  <div
                    className={cn(
                      "text-small max-w-[85%] rounded-lg px-3 py-2",
                      message.role === "bot"
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground ml-auto",
                    )}
                  >
                    {message.text}
                  </div>

                  {message.role === "bot" &&
                  message.chips &&
                  message.chips.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {message.chips.map((chip) => {
                        if (chip.type === "browse") {
                          return (
                            <button
                              className="bg-accent text-small hover:bg-accent/70 w-fit rounded-full px-3 py-1.5 text-left font-medium"
                              disabled={thinking}
                              key="browse"
                              onClick={() => handleChipClick(chip)}
                              type="button"
                            >
                              {BROWSE_MORE_LABEL}
                            </button>
                          );
                        }

                        const showCategoryLabel =
                          chip.category !== lastCategory;
                        lastCategory = chip.category;

                        return (
                          <div
                            key={chip.text}
                            className="flex flex-col items-start gap-1"
                          >
                            {showCategoryLabel ? (
                              <p className="text-caption text-muted tracking-[0.08em] uppercase">
                                {FAQ_CATEGORY_LABELS[chip.category] ??
                                  chip.category}
                              </p>
                            ) : null}
                            <button
                              className="border-border text-small hover:bg-accent rounded-full border px-3 py-1.5 text-left"
                              disabled={thinking}
                              onClick={() => handleChipClick(chip)}
                              type="button"
                            >
                              {chip.text}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}

            {thinking ? (
              <div className="bg-muted text-muted text-small w-fit rounded-lg px-3 py-2">
                <span className="sr-only">Thinking</span>
                <span aria-hidden="true">···</span>
              </div>
            ) : null}
          </div>

          <form
            className="border-border flex items-center gap-2 border-t p-3"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor={inputId}>
              Ask a question
            </label>
            <Input
              id={inputId}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask a question..."
              ref={inputRef}
              value={inputValue}
            />
            <Button
              aria-label="Send"
              disabled={thinking}
              size="icon"
              type="submit"
            >
              <Send aria-hidden="true" />
            </Button>
          </form>
        </div>
      ) : null}

      <Button
        aria-expanded={open}
        aria-label={open ? "Close FAQ chat" : "Open FAQ chat"}
        className="size-14 rounded-full shadow-lg"
        onClick={() => setOpen((current) => !current)}
        ref={triggerRef}
        size="icon"
      >
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
      </Button>
    </div>
  );
}
