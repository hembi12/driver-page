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
    <section className="h-screen flex items-center justify-center px-4 sm:px-6 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="max-w-lg w-full px-6 sm:px-10 py-8 rounded-3xl bg-black/30 backdrop-blur-md shadow-xl border border-white/20">
        <div className="min-h-[450px] flex items-center justify-center">
          <div className="w-full transition-all duration-300 ease-out">
            <HeroTabs activeTab={activeTab} onTabChange={handleInteraction} />
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleInteraction(tab.id)}
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
  );
}