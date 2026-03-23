import './globals.css';
import type { Metadata } from 'next';
import { AppPreferencesProvider } from './providers';

export const metadata: Metadata = {
  title: 'Veridian Lab',
  description: 'Advanced Hydroponics Intelligence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Nhúng Font chữ Manrope */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Nhúng Thư viện Icon Material Symbols */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="font-['Manrope'] antialiased">
        <AppPreferencesProvider>{children}</AppPreferencesProvider>
      </body>
    </html>
  );
}