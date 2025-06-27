"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../app/locales/en.json";
import es from "../app/locales/es.json";
import fr from "../app/locales/fr.json";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector) // ✅ Habilita la detección automática
    .use(initReactI18next)
    .init({
      fallbackLng: "en", // ✅ Idioma por defecto si no detecta nada
      interpolation: {
        escapeValue: false, // ✅ necesario para React
      },
      resources: {
        en: { translation: en },
        es: { translation: es },
        fr: { translation: fr },
      },
      detection: {
        order: ["navigator", "htmlTag", "cookie", "localStorage", "sessionStorage", "querystring"],
        caches: ["localStorage", "cookie"],
      },
    });
}

export default i18n;
