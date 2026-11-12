// ghb-farms/components/ContactForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="subject" value="New contact form submission from ghbfarms.co.za" />
      <input type="hidden" name="from_name" value="GHB Farms Website" />
      <div>
        <label htmlFor="name" className="mb-1 block font-heading text-sm font-medium text-teal-dark">
          Name
        </label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block font-heading text-sm font-medium text-teal-dark">
          Email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block font-heading text-sm font-medium text-teal-dark">
          Phone (optional)
        </label>
        <Input id="phone" name="phone" type="tel" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block font-heading text-sm font-medium text-teal-dark">
          Message
        </label>
        <Textarea id="message" name="message" required rows={5} />
      </div>
      <Button type="submit" disabled={status === "submitting"} className="bg-gold text-teal-dark hover:bg-gold/90">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
      {status === "success" && <p className="text-teal">Thank you — your message has been sent.</p>}
      {status === "error" && <p className="text-red">Something went wrong. Please try again or email hr@ghbfarms.com directly.</p>}
    </form>
  );
}
