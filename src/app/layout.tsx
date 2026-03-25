import type { Metadata, Viewport } from "next";
import { Teko, Inter } from "next/font/google";
import "./globals.css";

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Dragão Motos | Oficina Premium & Performance",
  description: "Elite em manutenção e customização de motos de alta cilindrada.",
  keywords: ["mecânica", "moto", "performance", "customização", "oficina"],
  manifest: "/manifest.json",
  themeColor: "#09090b", // Adicionado explicitamente para garantir o Chrome PWA
  icons: {
    icon: "/icon-pwa-192.png?v=7",
    shortcut: "/icon-pwa-192.png?v=7",
    apple: "/icon-pwa-192.png?v=7",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dragão Motos",
  },
  formatDetection: {
    telephone: false,
  },
};

import { BottomNav } from "@/components/layout/BottomNav";
import RegisterSW from "@/components/pwa/RegisterSW";
import PWAInstall from "@/components/pwa/PWAInstall";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${teko.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-preto-profundo text-white font-sans pb-[env(safe-area-inset-bottom,4.5rem)] pt-[env(safe-area-inset-top,0px)] md:pb-0 overflow-x-hidden">
        <RegisterSW />
        <PWAInstall />
        <Script id="hide-nextjs-dev-pill" strategy="afterInteractive">
          {`
            (function() {
              const css = '[id^="nextjs"], [class*="NextJS_"], #nextjs-dev-overlay, .__next-prerender-indicator, .nextjs-static-indicator, #__next-prerender-indicator { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }';
              const head = document.head || document.getElementsByTagName('head')[0];
              const style = document.createElement('style');
              style.appendChild(document.createTextNode(css));
              head.appendChild(style);

              // Função para monitorar mudanças e remover pilhas do Shadow DOM
              const observer = new MutationObserver(() => {
                document.querySelectorAll('*').forEach(el => {
                  if (el.shadowRoot && !el.shadowRoot.querySelector('#hide-next-shadow')) {
                    const shadowStyle = document.createElement('style');
                    shadowStyle.id = 'hide-next-shadow';
                    shadowStyle.appendChild(document.createTextNode(css));
                    el.shadowRoot.appendChild(shadowStyle);
                  }
                });
              });
              observer.observe(document.body, { childList: true, subtree: true });
            })();
          `}
        </Script>
        <main className="flex-grow page-enter">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
