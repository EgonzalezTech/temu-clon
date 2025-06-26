import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        <p className="text-center lg:text-left text-sm sm:text-base animate-fadeIn">
          Developed 💻 by{" "}
          <span className="font-bold underline decoration-white underline-offset-4">
            Edwin Gonzalez
          </span>{" "}
          · &copy; {currentYear} All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-2xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition-colors duration-200"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-200 transition-colors duration-200"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
