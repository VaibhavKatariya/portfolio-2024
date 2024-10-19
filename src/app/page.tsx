import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ArrowUpRight, FileDown } from "lucide-react";
import VaibhavImage from "@/../public/Vaibhav.jpg";
import Image from "next/image";
import Link from "next/link";
import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import SectionCards from "@/components/SectionCards";
import SkillsSection from "@/components/SkillSection";

const Vaibhav_Birth_Year = 2005;
const LIMIT = 2;

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

        <Experience />

        <section className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h2 className="title text-2xl sm:text-3xl">Featured Projects</h2>
            <LinkWithIcon
              href="/projects"
              position="right"
              icon={<ArrowRightIcon className="size-5" />}
              text="View More"
            />
          </div>
          <SectionCards type="projects" limit={LIMIT} />
        </section>
        
        <SkillsSection />

        <section className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h2 className="title text-2xl sm:text-3xl">License & Certifications</h2>
            <LinkWithIcon
              href="/certificates"
              position="right"
              icon={<ArrowRightIcon className="size-5" />}
              text="View More"
            />
          </div>
          <SectionCards type="certificates" limit={LIMIT} />
        </section>

      </article>
    </>
  );
}
