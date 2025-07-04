import { Helmet } from "react-helmet-async";

export default function SeoHome() {
  return (
    <Helmet>
      <title>HM Mobility | Traslados privados 24/7 en México</title>
      <meta
        name="description"
        content="Transporte privado confiable y seguro en todo México. Solicita tu cotización en línea y viaja con HM Mobility. Disponible 24/7."
      />
      <link rel="canonical" href="https://tu-dominio.com/" />

      {/* Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "HM Mobility",
          "url": "https://tu-dominio.com",
          "logo": "https://tu-dominio.com/logo.png",
          "sameAs": [
            "https://www.facebook.com/hmmobility",
            "https://www.instagram.com/hmmobility"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+52-123-456-7890",
            "contactType": "Customer Service",
            "areaServed": "MX",
            "availableLanguage": ["Spanish"]
          }
        })}
      </script>

      {/* WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://tu-dominio.com",
          "name": "HM Mobility",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://tu-dominio.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      {/* FAQPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Cómo puedo solicitar una cotización?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Completa el formulario en la página de inicio con los detalles de tu viaje. En pocos minutos recibirás respuesta."
              }
            },
            {
              "@type": "Question",
              "name": "¿Ofrecen traslados al aeropuerto?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, contamos con traslados desde y hacia cualquier aeropuerto de CDMX y alrededores."
              }
            },
            {
              "@type": "Question",
              "name": "¿Puedo viajar con mi mascota?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "¡Claro! Tenemos opción de viajes pet friendly para que tu mascota viaje contigo con seguridad."
              }
            },
            {
              "@type": "Question",
              "name": "¿Qué métodos de pago aceptan?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aceptamos efectivo, tarjetas de débito/crédito, transferencia bancaria y MercadoPago."
              }
            }
          ]
        })}
      </script>

      {/* Vehicles - ItemList */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Vehículos HM Mobility",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "Vehicle",
                "name": "Suzuki Ertiga Plata",
                "modelDate": "2022",
                "description":
                  "Camioneta cómoda y espaciosa, ideal para traslados familiares o de grupos. Color plata, modelo 2022.",
                "image": "https://tu-dominio.com/ertigaplata.webp"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Vehicle",
                "name": "Suzuki Ertiga Blanca",
                "modelDate": "2019",
                "description":
                  "Vehículo versátil y confiable, perfecto para viajes largos o servicios privados. Color blanco, modelo 2019.",
                "image": "https://tu-dominio.com/ertigablanca.webp"
              }
            }
          ]
        })}
      </script>
    </Helmet>
  );
}