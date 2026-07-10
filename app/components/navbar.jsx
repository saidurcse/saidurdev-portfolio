'use client';

import { useState } from 'react';
import Link from "next/link";
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0d1224]/80 backdrop-blur-md border-b border-[#1b2c68a0]">
      <div className="flex items-center justify-between py-5 px-4">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-2xl sm:text-3xl font-bold">
            Saidur Rahman
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white text-2xl p-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16f2b3]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex md:space-x-1">
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">ABOUT</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIENCE</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SKILLS</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJECTS</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EDUCATION</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#blogs"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">BLOGS</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#contact"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">CONTACT</div></Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul id="mobile-menu" className="md:hidden flex flex-col items-center bg-[#0d1224] py-4 space-y-4">
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#about"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">ABOUT</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#experience"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIENCE</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#skills"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SKILLS</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#projects"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJECTS</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#education"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EDUCATION</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#blogs"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">BLOGS</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#contact"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">CONTACT</div>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;