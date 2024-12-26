import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QnConnectProvider } from "@/context/QnConnect";
import "./globals.css";
import SideBar from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "介護事業書検索",
  description: "google mapのアプリです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <QnConnectProvider>
          <Header />
          <div className="flex body-height overflow-scroll">
            <main className="p-4 w-full overflow-scroll">{children}</main>
          </div>
        </QnConnectProvider>
      </body>
    </html>
  );
}
