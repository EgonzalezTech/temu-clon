"use client";

import { logoutUser } from "@/actions/auth";
import HeaderSearchBar from "@/components/layout/HeaderSearchBar";
import { useCartStore } from "@/stores/cart-store";
import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";

// Announcement Bar
const AnnouncementBar = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-black dark:bg-gray-900 py-2 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-center px-8">
        <span className="text-center text-sm font-medium tracking-wide text-white dark:text-yellow-300">
          {t(
            "free_shipping",
            "FREE SHIPPING ON ORDERS OVER $15.00 • FREE RETURNS"
          )}
        </span>
      </div>
    </div>
  );
};

type HeaderProps = {
  user: Omit<User, "passwordHash"> | null;
  categorySelector: React.ReactNode;
};

const Header = ({ user, categorySelector }: HeaderProps) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const { open, getTotalItems } = useCartStore(
    useShallow((state) => ({
      open: state.open,
      getTotalItems: state.getTotalItems,
    }))
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledUp = currentScrollY < prevScrollY;

      if (scrolledUp) setIsOpen(true);
      else if (currentScrollY > 100) setIsOpen(false);

      setPrevScrollY(currentScrollY);
    };

    setPrevScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className={`w-full transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <AnnouncementBar />

        <div className="w-full flex justify-between items-center py-3 sm:py-4 bg-white/80 dark:bg-gray-900/80 shadow-sm border-b border-gray-100 dark:border-gray-700 backdrop-blur-sm transition-colors duration-300">
          <div className="flex justify-between items-center container mx-auto px-8">
            {/* Left: Menu + Categories */}
            <div className="flex flex-1 justify-start items-center gap-4 sm:gap-6">
              <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <nav className="hidden md:flex gap-4 lg:gap-6 text-sm font-medium text-gray-700 dark:text-gray-300 items-center">
                {categorySelector}

                <Link
                  href="#"
                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  {t("sale", "Sale")}
                </Link>

                {/* Language selector */}
                <label
                  htmlFor="language-select"
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                >
                  {t("language", "Language")}
                  <select
                    id="language-select"
                    value={i18n.language}
                    onChange={handleLanguageChange}
                    className="ml-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-2 text-sm cursor-pointer"
                  >
                    <option value="en">🇺🇸 English</option>
                    <option value="fr">🇨🇦 Français</option>
                    <option value="es">🇳🇮 Español</option>
                  </select>
                </label>
              </nav>
            </div>

            {/* Center: Brand */}
            <Link href="#" className="absolute left-1/2 -translate-x-1/2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">
                {t("deal", "DEAL")}
              </span>
            </Link>

            {/* Right: Search + Auth + Cart */}
            <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
              <HeaderSearchBar />

              {user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:block">
                    {user.email}
                  </span>
                  <Link
                    href="#"
                    className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={async (e) => {
                      e.preventDefault();
                      await logoutUser();
                      router.refresh();
                    }}
                  >
                    {t("sign_out", "Sign Out")}
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/sign-in"
                    className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {t("sign_in", "Sign In")}
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {t("sign_up", "Sign Up")}
                  </Link>
                </>
              )}

              {/* Cart Button */}
              <button
                onClick={() => open()}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z "
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center animate-bounce">
                  {getTotalItems()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
