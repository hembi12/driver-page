import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import Form from "./components/Form/Form";
import Testimonials from "./components/Testimonials/Testimonials";
import Vehicles from "./components/Vehicles";
import Stats from "./components/Stats";
import QuoteRequest from "./pages/Quote/QuoteRequest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  // Rutas donde no debe mostrarse el footer
  const ocultarFooter = [
    "/solicitud-de-cotizacion",
    "/politica-de-privacidad",
    "/terminos-y-condiciones",
  ].includes(location.pathname);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Form />
              <Testimonials />
              <Vehicles />
              <Stats />
            </>
          }
        />
        <Route path="/solicitud-de-cotizacion" element={<QuoteRequest />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
      </Routes>

      {/* Mostrar footer solo si no estamos en páginas especiales */}
      {!ocultarFooter && <Footer />}
    </>
  );
}