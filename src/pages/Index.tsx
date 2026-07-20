import { useEffect, useRef, useState } from "react";
import { Header, ScrollProgress } from "@/components/Header";
import { Hero } from "@/sections/Hero";
import { Work } from "@/sections/Work";
import { Showcase } from "@/sections/Showcase";
import { Crossborder } from "@/sections/Crossborder";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { Numbers } from "@/sections/Numbers";
import { Pricing } from "@/sections/Pricing";
import { Faq } from "@/sections/Faq";
import { Team, FoundingTeam, Advisors } from "@/sections/People";
import { Reviews } from "@/sections/Reviews";
import { Forge } from "@/sections/Forge";
import { Audit } from "@/sections/Audit";
import { Footer, BrandBand } from "@/sections/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ContactBubble } from "@/components/ContactBubble";
import { initSmoothScroll } from "@/lib/scroll";
import { useRevealAll } from "@/hooks/useReveal";
import { useFillTitles } from "@/hooks/useFillTitles";
import { useLang } from "@/lib/i18n";

const Index = () => {
  const { lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(menuOpen);
  menuRef.current = menuOpen;

  useEffect(() => { initSmoothScroll(() => menuRef.current); }, []);
  useRevealAll();
  useFillTitles(lang);

  return (
    <>
      <ScrollProgress />
      <div className="frame">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Hero />
          <Work />
          <Showcase />
          <Crossborder />
          <Services />
          <Process />
          <Numbers />
          <Pricing />
          <Faq />
          <Advisors />
          <Team />
          <FoundingTeam />
          <Reviews />
          <Forge />
          <Audit />
        </main>
        <BrandBand />
        <Footer />
      </div>
      <Chatbot />
      <ContactBubble />
    </>
  );
};

export default Index;
