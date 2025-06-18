import type { Metadata } from "next";
import "./globals.css";
import Wrapper from "./_components/organisms/wrapper/Wrapper";




export const metadata: Metadata = {
  title: 'absensi.ku',
  description: 'Online School Management System',
  icons : {
    icon  : 'favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <Wrapper>{ children }</Wrapper>

    </html>
  );
}
