"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

interface SubscribeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscribeDialog({ isOpen, onClose }: SubscribeDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const headline = useMemo(() => {
    if (status === "success") return "Welcome to BEST";
    if (status === "error") return "Stay in the loop";
    return "Subscribe to Our Newsletter";
  }, [status]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.message || "We couldn’t save your subscription.");
      }

      setStatus("success");
      setMessage("You’re on the list. Look out for the next edition.");
    } catch (error: any) {
      console.error("Failed to subscribe", error);
      setStatus("error");
      setMessage(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 py-12 backdrop-blur-sm">
      <div className="w-full max-w-[520px] rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">BEST Newsletter</p>
            <h2 className="mt-2 text-[26px] font-serif font-normal leading-tight">
              {headline}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
            aria-label="Close subscribe dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-2">
              Name (optional)
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 px-4 py-3 text-sm tracking-wide outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-3 text-sm tracking-wide outline-none transition focus:border-black"
            />
          </div>

          {message && (
            <div
              className={`rounded border px-4 py-3 text-sm ${
                status === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || status === "success"}
            className="w-full bg-black px-6 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? "Joining..." : status === "success" ? "Subscribed" : "Join the List"}
          </button>

          <p className="text-[11px] leading-relaxed text-gray-500">
            By subscribing, you agree to receive curated stories, exclusive features, and event invitations from BEST Magazine. You can unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}
