import { Helmet } from "@dr.pogodin/react-helmet";
import { testimonios } from "../components/Testimonials/data";

function calcularPromedio(testimonios) {
  const total = testimonios.reduce((acc, t) => acc + t.calificacion, 0);
  return (total / testimonios.length).toFixed(1);
}

function formatearFechaISO(fechaStr) {
  const meses = {
    enero: "01",
    febrero: "02",
    marzo: "03",
    abril: "04",
    mayo: "05",
    junio: "06",
    julio: "07",
    agosto: "08",
    septiembre: "09",
    octubre: "10",
    noviembre: "11",
    diciembre: "12",
  };
  const partes = fechaStr.split(" de ");
  if (partes.length !== 3) return new Date().toISOString().split("T")[0];
  const [dia, mesTexto, año] = partes;
  const mes = meses[mesTexto.toLowerCase()];
  return `${año}-${mes}-${dia.padStart(2, "0")}`;
}

export default function SeoHome() {
  return (
    <Helmet>
      <title>HM Mobility | Traslados privados 24/7 en México</title>
      <meta
        name="description"
        content="Transporte privado confiable y seguro en todo México. Solicita tu cotización en línea y viaja con HM Mobility. Disponible 24/7."
      />
      <link rel="canonical" href="https://hmmobility.services/" />

      {/* ✅ Preload para optimizar LCP */}
      <link rel="preload" as="image" href="/images/hero-bg.webp" />

      {/* 1. WebSite principal */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: "https://hmmobility.services",
          name: "HM Mobility",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://hmmobility.services/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}
      </script>

      {/* 2. WebPage + Service - Formulario de cotización */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Solicita tu Cotización | HM Mobility",
          description:
            "Completa el formulario para recibir una cotización personalizada para tu traslado privado. Disponible 24/7.",
          url: "https://hmmobility.services/#cotizacion",
          mainEntity: {
            "@type": "Service",
            name: "Cotización de traslados privados",
            provider: {
              "@type": "Organization",
              name: "HM Mobility",
              url: "https://hmmobility.services",
            },
            areaServed: { "@type": "Country", name: "México" },
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: "https://hmmobility.services/#cotizacion",
              availableLanguage: "Spanish",
            },
            serviceType:
              "Cotización de viajes privados, traslados al aeropuerto, viajes foráneos, pet friendly.",
            audience: { "@type": "Audience", name: "Pasajeros en México" },
          },
        })}
      </script>

      {/* 3. HowTo - Proceso para reservar un viaje */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Cómo reservar un viaje con HM Mobility",
          description:
            "Sigue estos pasos para reservar un viaje privado con nosotros.",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Solicita tu cotización",
              text: "Llena el formulario con los detalles de tu viaje",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Envía tu cotización",
              text: "La información será enviada al conductor",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Confirmación del viaje",
              text: "El conductor te contactará para confirmar el costo del viaje",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "¡Listo para viajar!",
              text: "Una vez confirmado, disfruta de tu viaje con nosotros",
            },
          ],
        })}
      </script>

      {/* 4. Organization con Testimonios */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "HM Mobility",
          url: "https://hmmobility.services",
          logo: "https://hmmobility.services/logo.png",
          sameAs: [
            "https://www.facebook.com/hmmobility",
            "https://www.instagram.com/hmmobility",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+52-123-456-7890",
            contactType: "Customer Service",
            areaServed: "MX",
            availableLanguage: ["Spanish"],
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: calcularPromedio(testimonios),
            reviewCount: testimonios.length.toString(),
          },
          review: testimonios.slice(0, 10).map((t) => ({
            "@type": "Review",
            author: { "@type": "Person", name: t.nombre },
            reviewBody: t.texto,
            datePublished: formatearFechaISO(t.fecha),
            reviewRating: {
              "@type": "Rating",
              ratingValue: t.calificacion,
              bestRating: "5",
              worstRating: "1",
            },
          })),
        })}
      </script>

      {/* 5. Vehículos */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Vehículos HM Mobility",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Vehicle",
                name: "Suzuki Ertiga Plata",
                modelDate: "2022",
                description:
                  "Camioneta cómoda y espaciosa, ideal para traslados familiares o de grupos. Color plata, modelo 2022.",
                image: "https://hmmobility.services/ertigaplata.webp",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Vehicle",
                name: "Suzuki Ertiga Blanca",
                modelDate: "2019",
                description:
                  "Vehículo versátil y confiable, perfecto para viajes largos o servicios privados. Color blanco, modelo 2019.",
                image: "https://hmmobility.services/ertigablanca.webp",
              },
            },
          ],
        })}
      </script>

      {/* 6. Estadísticas */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Estadísticas de HM Mobility",
          description:
            "Resumen de experiencia, seguridad y satisfacción de clientes de HM Mobility.",
          url: "https://hmmobility.services/#experiencia",
          mainEntity: {
            "@type": "Organization",
            name: "HM Mobility",
            url: "https://hmmobility.services",
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Calificación promedio",
                value: "4.97",
              },
              {
                "@type": "QuantitativeValue",
                name: "Valoraciones de 5 estrellas",
                value: 26100,
              },
              {
                "@type": "QuantitativeValue",
                name: "Tasa de puntualidad",
                value: 99,
                unitText: "PERCENT",
              },
              {
                "@type": "QuantitativeValue",
                name: "Kilómetros recorridos",
                value: 300000,
                unitText: "KILOMETER",
              },
              {
                "@type": "QuantitativeValue",
                name: "Trayectos seguros",
                value: 100,
                unitText: "PERCENT",
              },
              {
                "@type": "QuantitativeValue",
                name: "Años de experiencia",
                value: 9,
                unitText: "YEAR",
              },
              {
                "@type": "QuantitativeValue",
                name: "Viajes completados",
                value: 29850,
              },
              {
                "@type": "QuantitativeValue",
                name: "Clientes satisfechos",
                value: 19900,
              },
            ],
          },
        })}
      </script>

      {/* 7. FAQ */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "¿Cómo puedo solicitar una cotización?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Completa el formulario en la página de inicio con los detalles de tu viaje. En pocos minutos recibirás respuesta.",
              },
            },
            {
              "@type": "Question",
              name: "¿Ofrecen traslados al aeropuerto?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sí, contamos con traslados desde y hacia cualquier aeropuerto de CDMX y alrededores.",
              },
            },
            {
              "@type": "Question",
              name: "¿Puedo viajar con mi mascota?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "¡Claro! Tenemos opción de viajes pet friendly para que tu mascota viaje contigo con seguridad.",
              },
            },
            {
              "@type": "Question",
              name: "¿Qué métodos de pago aceptan?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Aceptamos efectivo, tarjetas de débito/crédito, transferencia bancaria y MercadoPago.",
              },
            },
          ],
        })}
      </script>
    </Helmet>
  );
}
