// src/components/Contexts/I18nProvider.tsx
'use client';

import React, { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { usePathname } from 'next/navigation'; // Importa usePathname para obtener la ruta actual

interface I18nProviderClientProps {
  children: ReactNode;
}

const I18nProviderClient: React.FC<I18nProviderClientProps> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Extrae el locale de la ruta (ej. /en/pagina -> en)
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1]; // Asume una estructura /locale/path

    // Lista de locales soportados (debe coincidir con next.config.js)
    const supportedLocales = ['en', 'fr', 'es'];

    // Si el segmento de la ruta es un locale válido y es diferente al idioma actual de i18n, cámbialo
    if (supportedLocales.includes(currentLocale) && i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale);
    } else if (!supportedLocales.includes(currentLocale) && i18n.language !== i18n.options.defaultNS) {
      // Si no hay locale en la ruta (ej. /pagina) y el idioma actual de i18n no es el por defecto,
      // establece el idioma por defecto. Esto maneja el caso de la ruta raíz sin prefijo.
      i18n.changeLanguage(i18n.options.defaultNS || 'es'); // Fallback a 'es' si defaultNS no está definido
    }
  }, [pathname, i18n]); // Dependencias: pathname para reaccionar a cambios de ruta, i18n para estabilidad

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProviderClient;