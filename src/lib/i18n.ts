// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // Carga traducciones desde un servidor HTTP
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Pasa la instancia de i18n a react-i18next
  .init({
    fallbackLng: "es", // Idioma de respaldo si la traducción no existe
    debug: process.env.NODE_ENV === "development", // Habilita el modo debug en desarrollo
    interpolation: {
      escapeValue: false, // React ya escapa los valores
    },
    backend: {
      // Ruta desde donde i18next cargará los archivos de traducción
      // Los archivos deben estar en `/public/locales/{{lng}}/{{ns}}.json`
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: [
        "queryString",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"], // Almacena el idioma detectado en una cookie
    },
    // Definimos los namespaces (espacios de nombres) por defecto
    // 'common' es un buen punto de partida para traducciones generales
    ns: ["common"],
    defaultNS: "common",
  });

export default i18n;
