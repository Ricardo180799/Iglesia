import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importaciones de componentes
import Header from "./Components/UI/Header";
import Aside from "./Components/UI/Aside";
import Footer from "./Components/UI/Footer";
import Provider from "./Components/Redux/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iglesia de la Calle",
  description: "Plataforma ministerial y comunitaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900`}
      >
        <Provider>
          {/* 1. Header fijo en la parte superior */}
          <Header />

          <div className="flex">
            {/* 2. Aside fijo a la izquierda (oculto en móviles por defecto en su componente) */}
            <Aside />

            {/* 3. Área de contenido principal */}
            {/* md:ml-60 compensa el ancho del Aside, pt-16 compensa la altura del Header */}
            <main className="flex-1 min-h-screen pt-16 md:ml-60 flex flex-col">
              <div className="flex-1 p-6 lg:p-10">
                {children}
              </div>
              
              {/* 4. Footer al final del contenido principal */}
              <Footer />
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}