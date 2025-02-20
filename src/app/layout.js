import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Tennis Circle - テニスサークル検索サイト",
  description: "テニスサークルを探して、新しい仲間と一緒にテニスを楽しみましょう。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-background`}>
        <ToastProvider>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
