import { Helmet } from "react-helmet-async";

export default function SeoQuote() {
  return (
    <Helmet>
      <title>Cotiza tu viaje | HM Mobility</title>
      <meta
        name="description"
        content="Solicita una cotización rápida y personalizada para tu próximo traslado con HM Mobility. Servicio privado, seguro y disponible 24/7 en México."
      />
      <link rel="canonical" href="https://tu-dominio.com/#cotizacion" />

      {/* JSON-LD: Cotización como WebPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Cotización",
          "url": "https://tu-dominio.com/#cotizacion",
          "description":
            "Solicita una cotización rápida y personalizada para tu próximo traslado con HM Mobility. Servicio privado, seguro y disponible 24/7 en México.",
          "publisher": {
            "@type": "Organization",
            "name": "HM Mobility",
            "url": "https://tu-dominio.com",
          }
        })}
      </script>
    </Helmet>
  );
}