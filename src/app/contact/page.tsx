"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, useRef } from "react";

export default function ProjectPage() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = formRef.current;
    setIsSubmitting(true);
    form.submit();
    form.reset();
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">Contact Me</h1>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <>
        <iframe name="iframe_form" id="iframe_form" style={{ display: "none" }}></iframe>

        <form
          ref={formRef}
          action="https://docs.google.com/forms/d/1bT9JelPLsTjGVvwe6ESLvs-PAicLfnh_vY6RZoNCPzU/formResponse"
          method="POST"
          target="iframe_form"
          onSubmit={handleSubmit}
        >
          {isSubmitted ? (
            <div className="bg-green-100 p-4 text-green-800 rounded-md">
              Thank you! Your message has been submitted.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="h-16">
                  <Input
                    id="name"
                    name="entry.2005620554"
                    type="text"
                    placeholder="Name"
                    autoComplete="given-name"
                    required
                  />
                  {errors.name && <p className="input-error">{errors.name}</p>}
                </div>

                <div className="h-16">
                  <Input
                    id="email"
                    name="entry.1045781291"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    required
                  />
                  {errors.email && <p className="input-error">{errors.email}</p>}
                </div>

                <div className="h-32 sm:col-span-2">
                  <Textarea
                    rows={4}
                    name="entry.839337160"
                    placeholder="Leave feedback about the site, career opportunities or just to say hello etc."
                    autoComplete="Message"
                    className="resize-none"
                    required
                  />
                  {errors.message && <p className="input-error">{errors.message}</p>}
                </div>
              </div>

              <input name="partialResponse" type="hidden" value="[null,null,&quot;887157074789705790&quot;]" />
              <input name="fbzx" type="hidden" value="887157074789705790" />

              <div className="mt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <span>Sending...</span>
                      <ReloadIcon className="ml-2 animate-spin" />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span>Send Message</span>
                      <PaperPlaneIcon className="ml-2" />
                    </div>
                  )}
                </Button>
                <p className="mt-4 text-xs text-muted-foreground">
                  By submitting this form, You agree to the{" "}
                  <Link href="/privacy" className="font-semibold">
                    privacy&nbsp;policy.
                  </Link>
                </p>
              </div>
            </>
          )}
        </form>
      </>
    </article>
  );
}
