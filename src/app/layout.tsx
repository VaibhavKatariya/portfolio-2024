import type { Metadata } from "next";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Calistoga, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Vaibhav Katariya",
  description: "Explore the personal portfolio of Vaibhav Katariya, a passionate web developer proficient in modern technologies like JavaScript, Next.js, and Firebase. Discover innovative projects, insights into my development journey, and contributions to open-source communities.",
  openGraph: {
    title: "Vaibhav Katariya - Portfolio",
    description: "Dive into Vaibhav Katariya's personal developer portfolio, showcasing expertise in full-stack development, open-source contributions, and cutting-edge web technologies.",
    url: "https://kaily.in",
    type: "website",
    images: [
      {
        url: "https://opengraph.githubassets.com/1a2b3c4d/vaibhavkatariya/portfolio-2024",
        width: 1200,
        height: 630,
        alt: "Vaibhav Katariya Portfolio",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "mx-auto flex min-h-screen max-w-3xl flex-col px-8 font-sans antialiased",
          inter.variable,
          calistoga.variable,
        )}
      >
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
