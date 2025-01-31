import React from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#111822] text-white py-6 ">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <Link
              href="/"
              className="dark:text-white text-[#00dd2c] font-semibold transition-all hover:scale-105 before:duration-300 text-2xl"
            >
              <span className="text-custom-Lcolor1 dark:text-custom-Dcolor1 font-bold">
                IPO
              </span>
              BAZAAR
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/yash_heda._?igsh=ZWlzaWQ2dGE4eWtp"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-110"
            >
              <Instagram className="w-6 h-6 text-pink-500" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/yash-heda09/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-blue-500" />
            </a>
            
            <a
              href="mailto:yashheda777@gmail.com"
              className="transform transition-transform hover:scale-110"
            >
              <Mail className="w-6 h-6 text-red-500" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-4 text-gray-400 text-sm">
          © {new Date().getFullYear()} IPO BAZAAR. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;