import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import Form from "./components/Form/Form";
import Testimonials from "./components/Testimonials/Testimonials";
import Vehicles from "./components/Vehicles";
import Stats from "./components/Stats";
import QuoteRequest from "./pages/Quote/QuoteRequest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer"; // 👈 asegúrate de importar correctamente

export default function App() {
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
        <Route path="/quote-request" element={<QuoteRequest />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer /> {/* 👈 visible en todas las rutas */}
    </>
  );
}