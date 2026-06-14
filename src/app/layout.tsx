import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terralogic",
  description: "Technology and IT solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/" className="site-header__logo">
            Terralogic
          </a>
          <nav className="site-header__nav">
            <a href="/">Home</a>
            <a href="/api-debug">API Debug</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
