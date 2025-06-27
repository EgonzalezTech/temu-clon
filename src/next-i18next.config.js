// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr"],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
