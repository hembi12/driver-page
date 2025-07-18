import { Helmet } from "@dr.pogodin/react-helmet";

export default function SeoPrivacy() {
  return (
    <Helmet>
      <title>Política de Privacidad | HM Mobility</title>
      <meta
        name="description"
        content="Conoce cómo HM Mobility protege tu información personal. Nuestra política de privacidad garantiza la confidencialidad y seguridad de tus datos."
      />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="https://hmmobility.services/politica-de-privacidad" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Política de Privacidad",
          description:
            "Conoce cómo HM Mobility protege tu información personal. Nuestra política de privacidad garantiza la confidencialidad y seguridad de tus datos.",
          url: "https://hmmobility.services/politica-de-privacidad",
        })}
      </script>
    </Helmet>
  );
}