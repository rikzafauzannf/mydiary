import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "myDiary",
  description:
    "Website dimana lu dapat share ceritalu sendiri dan berbagi sesama lu, dengan nasib dan keberagaman yang lu pada rasain, curhatin aja di sini kalo lu pusing nyari pelampiasan, bukan malah cari yang baru :)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <section className="w-full min-h-dvh p-5 bg-gradient-to-tr from-primary/50 to-secondary/50 space-y-4">
          {children}
        </section>
      </body>
    </html>
  );
}
