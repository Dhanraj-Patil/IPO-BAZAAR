"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <nav className="shadow-sm">
      <div className="px-6 h-[3.5vw] max-w-[80%] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="dark:text-white text-[#00dd2c] font-semibold transition-all hover:scale-105 before:duration-300 text-2xl">
          <span className="text-custom-Lcolor1 dark:text-custom-Dcolor1 font-bold">IPO</span>BAZAAR
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center justify-between gap-10">
  {[
    { href: "/", label: "Home" },
    { href: "/MainBoard", label: "MainBoard IPO" },
    { href: "/SMEIPO", label: "SME IPO" },
    { href: "/SubscriptionStatus", label: "Subscription Status" },
    { href: "/GreyMarketPremium", label: "GMP" },
  ].map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={`relative text-lg font-semibold transition-all ${
        pathname === href
          ? "scale-110 before:opacity-100"
          : "hover:scale-105 before:opacity-0"
      } ${
        pathname === href
          ? "text-[var(--Lcolor1)] dark:text-white"
          : "text-[var(--Lcolor1)] dark:text-white hover:dark:text-[var(--Dcolor1)]"
      } before:content-[''] before:absolute before:bottom-[-0.4vw] before:left-0 before:w-full before:h-[2px] before:bg-[var(--Lcolor1)] dark:before:bg-[var(--Dcolor1)] before:transition-opacity before:duration-300`}
    >
      {label}
    </Link>
  ))}
  <ModeToggle />
</div>

      </div>
    </nav>
  );
}

export default Navbar;
