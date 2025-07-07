import { Helmet } from "@dr.pogodin/react-helmet";

export default function SeoQuote() {
  return (
    <Helmet>
      <title>Cotiza tu viaje | HM Mobility</title>
      <meta
        name="description"
        content="Solicita una cotización rápida y personalizada para tu próximo traslado con HM Mobility. Servicio privado, seguro y disponible 24/7 en México."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://hmmobility.services/solicitud-de-cotizacion" />

      {/* ✅ Preconnect para Google Maps: mejora LCP */}
      <link rel="preconnect" href="https://maps.gstatic.com" crossorigin />
      <link rel="preconnect" href="https://maps.googleapis.com" crossorigin />
      <link rel="dns-prefetch" href="https://maps.gstatic.com" />
      <link rel="dns-prefetch" href="https://maps.googleapis.com" />

      {/* JSON-LD: Cotización como WebPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Cotización",
          url: "https://hmmobility.services/solicitud-de-cotizacion",
          description:
            "Solicita una cotización rápida y personalizada para tu próximo traslado con HM Mobility. Servicio privado, seguro y disponible 24/7 en México.",
          publisher: {
            "@type": "Organization",
            name: "HM Mobility",
            url: "https://hmmobility.services",
          },
        })}
      </script>
    </Helmet>
  );
}