import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import Form from "./components/Form/Form";
import Testimonials from "./components/Testimonials/Testimonials";
import Vehicles from "./components/Vehicles";
import Stats from "./components/Stats/Stats";
import QuoteRequest from "./pages/Quote/QuoteRequest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Footer from "./components/Footer";
import SeoHome from "./components/SeoHome"; // ✅ SEO para la home
import FAQ from "./components/FAQ";
// import NotFound from "./pages/NotFound"; // Opcional

export default function App() {
  const location = useLocation();

  const ocultarFooter = [
    "/solicitud-de-cotizacion",
    "/politica-de-privacidad",
    "/terminos-y-condiciones",
  ].includes(location.pathname);

  return (
    <>
      <Navbar />

      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SeoHome /> 
                <Hero />
                <Form />
                <Testimonials />
                <Vehicles />
                <Stats />
                <FAQ />
              </>
            }
          />
          <Route path="/solicitud-de-cotizacion" element={<QuoteRequest />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>

      {!ocultarFooter && <Footer />}
    </>
  );
}