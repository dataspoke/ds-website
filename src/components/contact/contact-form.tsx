"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICE_OPTIONS } from "@/lib/constants";
import { validateContactForm } from "@/lib/schemas";

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: preselectedService,
    message: "",
    website: "", // honeypot — hidden from real users, bots fill it in
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      const firstKey = ["name", "email", "service"].find((k) => validation.errors[k]);
      if (firstKey) document.getElementById(firstKey)?.focus();
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", company: "", service: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
        <p className="mt-2 text-muted-foreground">
          Thanks for reaching out. I&apos;ll reply within one business day.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Send another note
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field — invisible to humans, bots auto-fill it */}
      <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="Your name"
          className="mt-1 h-11"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="you@company.com"
          className="mt-1 h-11"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="Your company name"
          className="mt-1 h-11"
        />
      </div>

      <div>
        <Label htmlFor="service">What sounds most like you? *</Label>
        <Select
          value={formData.service}
          onValueChange={(value) => setFormData({ ...formData, service: value })}
        >
          <SelectTrigger
            id="service"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            className="mt-1 h-11 w-full text-base data-[size=default]:h-11"
          >
            <SelectValue placeholder="Pick the closest one" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && (
          <p id="service-error" className="mt-1 text-sm text-destructive">{errors.service}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="What is slowing you down right now?"
          rows={5}
          className="mt-1 min-h-32"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again or email me at nick@dataspoke.io.
        </p>
      )}

      <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send note
          </>
        )}
      </Button>
    </form>
  );
}
