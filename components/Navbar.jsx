"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <nav className="shadow-sm">
      <div className="px-6 h-[3.5vw] max-w-[80%] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="dark:text-white text-[#00dd2c] font-semibold transition-all hover:scale-105 before:duration-300 text-2xl"
        >
          <span className="text-custom-Lcolor1 dark:text-custom-Dcolor1 font-bold">
            IPO
          </span>
          BAZAAR
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center justify-between gap-10">
          {[
            { href: "/", label: "Home" },
            { href: "/IPO", label: "MainBoard IPO" },
            { href: "/SME", label: "SME IPO" },
            { href: "/SubscriptionStatus", label: "Subscription Status" },
            
          ].map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/" // Exact match for Home
                : pathname.startsWith(href) && pathname !== "/"; // Exclude "/" from other matches

            return (
              <Link
                key={href}
                href={href}
                className={`relative text-md font-medium transition-all ${
                  isActive
                    ? "scale-105 before:opacity-100 text-[var(--Lcolor1)] dark:text-white"
                    : "hover:scale-105 before:opacity-0 text-[var(--Lcolor1)] dark:text-white hover:dark:text-[var(--Dcolor1)]"
                } before:content-[''] before:absolute before:bottom-[-0.4vw] before:left-0 before:w-full before:h-[2px] before:bg-[var(--Lcolor1)] dark:before:bg-[var(--Dcolor1)] before:transition-opacity before:duration-300`}
              >
                {label}
              </Link>
            );
          })}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
