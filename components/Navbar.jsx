"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter

function Navbar() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <nav className="shadow-sm">
      <div className="px-6 h-[3.5vw] max-w-[80%] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-semibold transition-all hover:scale-105 before:duration-300 text-2xl">
          <span className="text-[#B0FA04]">IPO</span>BAZAAR
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
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
              className={`relative text-lg font-medium transition-all ${
                pathname === href
                  ? "text-[#B0FA04] scale-110 before:opacity-100"
                  : "text-white hover:text-[#B0FA04] hover:scale-105 before:opacity-0"
              } before:content-[''] before:absolute before:bottom-[-0.4vw] before:left-0 before:w-full before:h-[2px] before:bg-[#B0FA04] before:transition-opacity before:duration-300`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
