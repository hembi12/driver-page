import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import Form from "./components/Form/Form";
import QuoteRequest from "./pages/Quote/QuoteRequest";
import PrivacyPolicy from "./pages/PrivacyPolicy";

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
            </>
          }
        />
        <Route path="/quote-request" element={<QuoteRequest />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}