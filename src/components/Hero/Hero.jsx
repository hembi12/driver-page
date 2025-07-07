import { useState, useEffect, useRef, useCallback } from "react";
import HeroTabs from "./HeroTabs";

const tabs = [
  { id: "inicio", label: "Inicio" },
  { id: "reservar", label: "Reservar" },
  { id: "pagos", label: "Pagos" },
  { id: "beneficios", label: "Beneficios" },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const lastInteractionRef = useRef(Date.now());
  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const nextTab = useCallback((currentTab) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === currentTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    return tabs[nextIndex].id;
  }, []);

  const handleInteraction = (tabId) => {
    setActiveTab(tabId);
    setIsPaused(true);
    lastInteractionRef.current = Date.now();

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 15000);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveTab((prev) => nextTab(prev));
      }, 6000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextTab]);

  return (
    <>
      {/* ✅ Imagen invisible para cumplir con fetchpriority="high" */}
      <img
        src="/images/hero-bg.webp"
        fetchpriority="high"
        alt=""
        style={{ display: "none" }}
        width="0"
        height="0"
      />

      <section
        ref={sectionRef}
        id="inicio"
        className="h-screen flex items-center justify-center px-4 sm:px-6
                   bg-[url('/images/hero-bg.webp')] bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed
                   transition-colors duration-1000"
        aria-label="Sección principal de bienvenida"
      >
        <div className="max-w-lg w-full px-6 sm:px-10 py-8 rounded-3xl bg-black/30 backdrop-blur-md shadow-xl border border-white/20">
          <div className="min-h-[450px] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-full transition-all duration-300 ease-out">
              <HeroTabs activeTab={activeTab} onTabChange={handleInteraction} />
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleInteraction(tab.id)}
                aria-label={`Ir a ${tab.label}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white w-6"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}