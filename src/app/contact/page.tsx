"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function ProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const onCaptchaChange = (token: string | null) => {
    if (token) {
      setCaptchaVerified(true);
      toast.success("Captcha verified!");
    } else {
      setCaptchaVerified(false);
      toast.error("Captcha verification failed!");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return; 
    
    if (!captchaVerified) {
      toast.error("Please complete the captcha.");
      return;
    }

    const form = formRef.current;

    if (form) {
      try {
        setIsSubmitting(true);
        form.submit();
        form.reset();
        setIsSubmitted(true);
        toast.success("Message submitted successfully!");

        setTimeout(() => {
          router.push("/");
        }, 5000);
      } catch (error) {
        toast.error("Error submitting the form. Please try again.");
        console.error(error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>
      <article className="mt-8 flex flex-col gap-8 pb-16">
        <h1 className="title">Contact Me</h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />
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
                </div>
                <div className="h-32 sm:col-span-2">
                  <Textarea
                    rows={4}
                    name="entry.839337160"
                    placeholder="Leave feedback or say hello."
                    autoComplete="Message"
                    className="resize-none"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <ReCAPTCHA
                  sitekey="6LdLvqwgAAAAAHBBAVg04LuznghSiq_z2YlAw-wd"
                  onChange={onCaptchaChange}
                />
              </div>

              <div className="mt-4">
                <Button
                  type="submit"
                  className="w-full disabled:opacity-50"
                  disabled={isSubmitting || isSubmitted}
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
                  By submitting this form, you agree to the{" "}
                  <Link href="/privacy" className="font-semibold">
                    privacy&nbsp;policy.
                  </Link>
                </p>
              </div>
            </>
          )}
        </form>
      </article>
    </>
  );
}
