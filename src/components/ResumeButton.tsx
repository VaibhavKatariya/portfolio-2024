"use client";

import { Button } from "./ui/button";
import { FileDown } from "lucide-react";

const ResumeButton = () => {
  const trackClick = () => {
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      window.gtag("event", "resumeButtonClicked", {
        event_category: "engagement",
        event_label: "Resume Button",
      });
    }
  };

  return (
    <Button onClick={trackClick} variant="outline">
      <span className="font-semibold">Resume</span>
      <FileDown className="ml-2 size-5" />
    </Button>
  );
};

export default ResumeButton;
