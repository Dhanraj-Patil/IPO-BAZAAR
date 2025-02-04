"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/IPO", label: "MainBoard IPO" },
    { href: "/SME", label: "SME IPO" },
    { href: "/SubscriptionStatus", label: "Subscription Status" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/IPO") return pathname.startsWith("/IPO");
    if (href === "/SME") return pathname.startsWith("/SME");
    if (href === "/SubscriptionStatus") return pathname === "/SubscriptionStatus";
    return false;
  };

  const renderLink = (href, label) => (
    <Link
      key={href}
      href={href}
      className={`relative text-md md:text-sm transition-all ${
        isActive(href)
          ? "scale-105 before:opacity-100 font-semibold text-[var(--Lcolor1)] dark:text-[#B0FA04]"
          : "hover:scale-105 before:opacity-0 font-medium text-[var(--Lcolor1)] dark:text-white hover:dark:text-[var(--Dcolor1)]"
      } before:content-[''] before:absolute before:bottom-[-0.4vw] before:left-0 before:w-full before:h-[2px] before:bg-[var(--Lcolor1)] dark:before:bg-[var(--Dcolor1)] before:transition-opacity before:duration-300`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="shadow-md">
      <div className="py-5 h-[3.5vw] max-w-[90%] lg:max-w-[80%] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="dark:text-white text-[#289125] font-semibold transition-all hover:scale-105 before:duration-300 text-2xl"
        >
          <span className="text-custom-Lcolor1 dark:text-custom-Dcolor1 font-bold">
            IPO
          </span>
          BAZAAR
        </Link>

        {/* Desktop and Tablet Navigation */}
        <div className="hidden md:flex items-center justify-between gap-4 lg:gap-7">
          {navLinks.map(({ href, label }) => renderLink(href, label))}
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4 justify-end">
          {/* Mode Toggle */}
          <ModeToggle />

          {/* Menu Trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <FontAwesomeIcon icon={faBars} className="text-2xl cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="" className="p-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`text-lg transition-colors duration-300 ${
                      isActive(href) 
                        ? "font-semibold text-[var(--Lcolor1)] dark:text-[#B0FA04]" 
                        : "font-medium text-[var(--Lcolor1)] dark:text-white hover:text-[var(--Lcolor1)] dark:hover:text-[var(--Dcolor1)]"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;