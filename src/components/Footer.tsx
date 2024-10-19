import Link from "next/link";
import Socials from "@/components/Socials";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center pb-32 sm:flex-row-reverse sm:justify-between">
      <Socials />
      <section className="mt-8 sm:mt-0">
        <p className="text-center text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()}</span>{" "}
          <Link className="link" href="/">
            Kaily.in
          </Link>
          {" | "}
          <Link className="link font-bold" href="/privacy">
            Privacy
          </Link>
          {" | "}
          <Link target="_blank" className="link font-bold" href="https://blog.kaily.in">
            Blog
          </Link>
        </p>
      </section>
    </footer>
  );
}
