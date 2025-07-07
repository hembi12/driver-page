import { Helmet } from "@dr.pogodin/react-helmet";

export default function SeoTerms() {
  return (
    <Helmet>
      <title>Términos y Condiciones | HM Mobility</title>
      <meta
        name="description"
        content="Conoce los términos y condiciones de uso del servicio de transporte privado de HM Mobility. Lee nuestras políticas antes de reservar."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://hmmobility.services/terminos-y-condiciones" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Términos y Condiciones",
          description:
            "Conoce los términos y condiciones de uso del servicio de transporte privado de HM Mobility. Lee nuestras políticas antes de reservar.",
          url: "https://hmmobility.services/terminos-y-condiciones",
        })}
      </script>
    </Helmet>
  );
}