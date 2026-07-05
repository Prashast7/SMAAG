"use client";

import { useEffect, useId, useRef, useState } from "react";

import { MessageCircle, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FAQ_FALLBACK_RESPONSE,
  FAQ_STARTER_QUESTIONS,
} from "@/lib/faq/knowledge-base";
import { getRelatedEntries, matchFaq } from "@/lib/faq/matcher";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  chips?: string[];
};

const WELCOME_MESSAGE =
  "Hi, I'm the SMAAG FAQ assistant. Ask me anything about our services, or pick a question below.";

let messageIdCounter = 0;
function nextMessageId() {
  messageIdCounter += 1;
  return `msg-${messageIdCounter}`;
}

function answerQuestion(question: string): ChatMessage {
  const match = matchFaq(question);

  if (!match) {
    return {
      id: nextMessageId(),
      role: "bot",
      text: FAQ_FALLBACK_RESPONSE,
      chips: FAQ_STARTER_QUESTIONS,
    };
  }

  const related = getRelatedEntries(match.entry);

  return {
    id: nextMessageId(),
    role: "bot",
    text: match.entry.answer,
    chips: related.map((entry) => entry.question),
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
          chips: FAQ_STARTER_QUESTIONS,
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
            {messages.map((message) => (
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
                  <div className="flex flex-wrap gap-2">
                    {message.chips.map((chip) => (
                      <button
                        className="border-border text-small hover:bg-accent rounded-full border px-3 py-1.5 text-left"
                        disabled={thinking}
                        key={chip}
                        onClick={() => submitQuestion(chip)}
                        type="button"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

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
