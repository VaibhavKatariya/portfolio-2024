"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import ChatToggle from "./ChatToggle";
import { usePathname } from "next/navigation"; // Add this import

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Blog",
    href: "/blog", 
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Certificates",
    href: "/certificates",
  },
];

export default function Header() {
  const pathname = usePathname(); 

  return (
    <header className="sticky top-0 z-50 bg-background/75 py-6 backdrop-blur-sm">
      <nav className="flex items-center justify-between">
        <ul className="flex gap-4 sm:gap-8">
          {navLinks.map((nav, id) => {
            if (pathname === nav.href) return null;
            
            return (
              <li key={id} className="link">
                <Link href={nav.href}>{nav.name}</Link>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-0 sm:gap-4">
          <ChatToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}