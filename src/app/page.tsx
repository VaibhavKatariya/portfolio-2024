import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FileDown } from "lucide-react";
import VaibhavImage from "@/../public/Vaibhav.jpg";
import Image from "next/image";
import Link from "next/link";

const Vaibhav_Birth_Year = 2005;

export default function Home() {

  return (
    <>
    <article className="mt-8 flex flex-col gap-16 pb-16">
    <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <Image
          className="rounded-lg"
          src={VaibhavImage}
          alt="Photo of Vaibhav"
          width={175}
          height={175}
          priority
        />
        <div className="flex flex-col">
          <h1 className="title text-5xl">Hi, I&apos;m Vaibhav! 👋</h1>
          <p className="mt-4 font-light">
            {new Date().getFullYear() - Vaibhav_Birth_Year}
            -year-old software developer from India 🇮🇳
          </p>
          <p className="mt-2 font-light">
          Trust me, I&apos;m a software engineer ^_^
          </p>
          <div className="mt-4 flex items-end gap-1">
            <Link href="/about">
            <div className="flex">
            <p className="font-semibold">More about me</p>
            <ArrowUpRight className="size-5 animate-bounce" />
            </div>
            </Link>
          </div>
          <section className="mt-8 flex items-center gap-8">
            <Link href="/resume.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>


    </article>
    </>
  );
}
