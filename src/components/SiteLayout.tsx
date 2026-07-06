import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <PageBackground>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </PageBackground>
  );
}
