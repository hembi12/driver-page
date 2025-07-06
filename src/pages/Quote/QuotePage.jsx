import SeoQuote from "../../seo/SeoQuote";
import QuoteRequest from "./QuoteRequest"; // Importa localmente desde el mismo folder

export default function QuotePage() {
  return (
    <>
      <SeoQuote />
      <QuoteRequest />
    </>
  );
}