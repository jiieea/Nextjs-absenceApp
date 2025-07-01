import type { Metadata } from "next";
import "./globals.css";
import Wrapper from "./_components/organisms/wrapper/Wrapper";
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'absensi.ku',
  description: 'Online School Management System',
  icons: {
    icon: 'favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" /> 
        <Wrapper >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           {children}
          </ThemeProvider>
        </Wrapper>
    </html>
  );
}
