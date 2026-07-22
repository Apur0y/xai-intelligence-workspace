import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import InsightFlow from "@/components/insight/InsightFlow";
import DashboardPreview from "@/components/dashboard/DashboardPreview";
import SignatureInteraction from "@/components/signature/SignatureInteraction";
import DataFlowTransition from "@/components/ui/DataFlowTransition";
import CTASection from "@/components/ui/CTASection";
import Footer from "@/components/ui/Footer";
import NewheroSection from "@/components/hero/NewheroSection";
import NewSignatureInteraction from "@/components/signature/NewSignatureInteraction";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <NewheroSection/>
      <DataFlowTransition />
      <InsightFlow />
      <DashboardPreview />
      <NewSignatureInteraction/>
      <CTASection />
      <Footer />
    </main>
  );
}
