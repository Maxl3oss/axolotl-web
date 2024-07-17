import '@/styles/globals.css';

import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import CheckAuth from '@/components/base/CheckAuth';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Axolotl',
  description: 'Axolotl Application for mine my',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CheckAuth>{children}</CheckAuth>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
