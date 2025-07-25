import Socials from "@/components/Socials";
import ResumeButton from "@/components/ResumeButton";
import { ArrowRightIcon, ArrowDownRight, ArrowDown } from "lucide-react";
import VaibhavImage from "@/../public/vaibhavToon.jpg";
import Image from "next/image";
import Link from "next/link";
import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import SectionCards from "@/components/SectionCards";
import SkillsSection from "@/components/SkillSection";
import Posts from "@/components/Posts";
import { getPosts } from "@/lib/posts";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content");
const LIMIT = 2;

export default async function Home() {
  const posts = await getPosts(blogDirectory, LIMIT);

  return (
    <>
      <article className="mt-8 flex flex-col gap-16 pb-16">
        <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
          {/* When inserting an image, change md:justify-center to md:justify-between */}
          <Image
            className="rounded-lg"
            src={VaibhavImage}
            alt="Photo of Vaibhav"
            width={200}
            height={200}
            priority
          />
          <div className="flex max-w-[320px] flex-col sm:max-w-full">
            <h1 className="title text-5xl">Hi, I&apos;m Vaibhav! 👋</h1>
            <p className="mt-4 font-light">
              {Math.floor(
                (new Date().getTime() - new Date(2005, 9, 22).getTime()) /
                  (1000 * 60 * 60 * 24 * 365.25)
              )}
              -year-old Full-Stack developer from India 🇮🇳
            </p>
            <p className="mt-2 font-light">
              Trust me, I&apos;m a software engineer ^_^
            </p>
            <div className="mt-4 flex items-end gap-1">
              <div className="flex">
                <p className="font-semibold">
                  Ask the chatbot anything about me
                </p>
                <ArrowDownRight className="hidden size-5 animate-bounce sm:block" />
                <ArrowDown className="block size-5 animate-bounce sm:hidden" />
              </div>
            </div>
            <section className="mt-8 flex items-center gap-8">
              <Link href="/resume.pdf" target="_blank">
                <ResumeButton />
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

        {/* Skill Section */}
        <SkillsSection />

        <section className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h2 className="title text-3xl">Recent Posts</h2>
            <LinkWithIcon
              href="/blog"
              position="right"
              icon={<ArrowRightIcon className="size-5" />}
              text="View More"
            />
          </div>
          <Posts posts={posts} />
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h2 className="title text-2xl sm:text-3xl">
              License & Certifications
            </h2>
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
