'use client'

import Footer from "@/components/footer";
import Header from "@/components/header";
import BackToTopButton from "@/components/back-to-top-button";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container max-w-6xl py-8 md:py-12">
            {children}
        </div>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
