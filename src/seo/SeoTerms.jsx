import { Helmet } from "react-helmet-async";

export default function SeoTerms() {
  return (
    <Helmet>
      <title>Términos y Condiciones | HM Mobility</title>
      <meta
        name="description"
        content="Conoce los términos y condiciones de uso del servicio de transporte privado de HM Mobility. Lee nuestras políticas antes de reservar."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://tu-dominio.com/terms-and-conditions" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Términos y Condiciones",
          "description":
            "Conoce los términos y condiciones de uso del servicio de transporte privado de HM Mobility. Lee nuestras políticas antes de reservar.",
          "url": "https://tu-dominio.com/terms-and-conditions"
        })}
      </script>
    </Helmet>
  );
}