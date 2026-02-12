import type { Metadata } from "next";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Calistoga, Inter } from "next/font/google";
import "./globals.css";
import Chat from "@/components/chat";
import { ChatProvider } from "@/contexts/ChatContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Vaibhav Katariya | Portfolio | Kaily",
    template: "%s | Vaibhav Katariya",
  },
  description:
    "Official personal portfolio of Vaibhav Katariya, also known as Vaibhav or Kaily. Showcasing projects, skills, and work in web development using Next.js, JavaScript, and Firebase.",
  keywords: [
    "Vaibhav Katariya",
    "Vaibhav",
    "Katariya",
    "Kaily",
    "Vaibhav portfolio",
    "Kaily portfolio",
    "Vaibhav Katariya developer",
  ],
  metadataBase: new URL("https://kaily.in"),
  alternates: {
    canonical: "https://kaily.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Vaibhav Katariya | Developer Portfolio | Kaily",
    description:
      "Personal developer portfolio of Vaibhav Katariya, also known as Kaily. Explore projects, experience, and technical work.",
    url: "https://kaily.in",
    siteName: "Kaily",
    type: "website",
    images: [
      {
        url: "https://opengraph.githubassets.com/1a2b3c4d/vaibhavkatariya/portfolio-2024",
        width: 1200,
        height: 630,
        alt: "Vaibhav Katariya Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Katariya | Portfolio",
    description: "Personal portfolio of Vaibhav Katariya, also known as Kaily.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8BL1MW3XPW"
        strategy="afterInteractive"
      />

      <Script id="ga" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8BL1MW3XPW');
  `}
      </Script>

      <body
        className={cn(
          "mx-auto flex min-h-screen max-w-3xl flex-col px-8 font-sans antialiased",
          inter.variable,
          calistoga.variable,
        )}
      >
        <Providers>
          <Header />
          <ChatProvider>
            <main className="grow">{children}</main>
          </ChatProvider>
          <Chat />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
