import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SaibaMais } from "@/components/SaibaMais";
import { Formulario } from "@/components/Formulario";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Differentials } from "@/components/Differentials";
import { HowItWorks } from "@/components/HowItWorks";
import { SocialProof } from "@/components/SocialProof";
import { ServiceArea } from "@/components/ServiceArea";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { FormSelectionProvider } from "@/lib/form-selection";

export default function Home() {
  return (
    <FormSelectionProvider>
      <Navbar />
      <main>
        <Hero />
        <SaibaMais />
        <Services />
        <Gallery />
        <Differentials />
        <HowItWorks />
        <SocialProof />
        <ServiceArea />
        <FAQ />
        <Formulario />
      </main>
      <Footer />
      <WhatsAppFloat />
    </FormSelectionProvider>
  );
}
