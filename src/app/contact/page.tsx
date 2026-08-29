"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot?: string; // Optional honeypot field for spam prevention
}

export default function ProjectPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const sanitizedValue = value.replace(/[^0-9+()\-\s]/g, "");
      setFormData((prev) => ({ ...prev, phone: sanitizedValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!captchaVerified) {
      toast.error("Please complete the captcha.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (formData.honeypot) {
        setIsSubmitting(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("entry.2005620554", formData.name);
      formDataToSend.append("entry.1045781291", formData.email);
      formDataToSend.append("entry.762983244", formData.phone);
      formDataToSend.append("entry.839337160", formData.message);

      const response = await fetch(
        "https://docs.google.com/forms/d/1bT9JelPLsTjGVvwe6ESLvs-PAicLfnh_vY6RZoNCPzU/formResponse",
        {
          method: "POST",
          body: formDataToSend,
          mode: "no-cors",
        }
      );

      setFormData({ name: "", email: "", phone: "", message: "", honeypot: "" });
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
  };

  return (
    <>
      <article className="mt-8 flex flex-col gap-8 pb-16">
        <h1 className="title">Contact Me</h1>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />

        <form onSubmit={handleSubmit}>
          {isSubmitted ? (
            <div className="bg-green-100 p-4 text-green-800 rounded-md">
              Thank you! Your message has been submitted.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div
                  className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="h-16">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="given-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="h-16">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="h-16">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9+()\-\s]*"
                    placeholder="Phone (WhatsApp Preferred)"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onWheel={(event) => event.preventDefault()}
                    required
                  />
                </div>
                <div className="h-32 sm:col-span-2">
                  <Textarea
                    rows={4}
                    name="message"
                    placeholder="Leave feedback or say hello."
                    autoComplete="Message"
                    className="resize-none"
                    value={formData.message}
                    onChange={handleInputChange}
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
                    privacy policy.
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
