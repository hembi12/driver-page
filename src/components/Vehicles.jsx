import React from "react";
import { Helmet } from "react-helmet-async";

const vehicles = [
  {
    id: "plata",
    nombre: "Suzuki Ertiga Plata",
    modelo: "2022",
    imagen: "/ertigaplata.webp", 
    descripcion:
      "Camioneta cómoda y espaciosa, ideal para traslados familiares o de grupos. Color plata, modelo 2022.",
  },
  {
    id: "blanca",
    nombre: "Suzuki Ertiga Blanca",
    modelo: "2019",
    imagen: "/ertigablanca.webp", 
    descripcion:
      "Vehículo versátil y confiable, perfecto para viajes largos o servicios privados. Color blanco, modelo 2019.",
  },
];

export default function Vehicles() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Vehículos HM Mobility",
            itemListElement: vehicles.map((vehiculo, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Vehicle",
                name: vehiculo.nombre,
                modelDate: vehiculo.modelo,
                description: vehiculo.descripcion,
                image: `https://tusitio.com${vehiculo.imagen}`, // cambia por tu dominio real
              },
            })),
          })}
        </script>
      </Helmet>

      <section
        id="vehiculos"
        className="py-16 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Vehículos Disponibles
          </h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
            {vehicles.map((vehiculo) => (
              <div
                key={vehiculo.id}
                itemScope
                itemType="https://schema.org/Vehicle"
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="w-full h-64 bg-white flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={vehiculo.imagen}
                    alt={vehiculo.nombre}
                    itemProp="image"
                    className={`h-full max-w-[70%] object-contain ${
                      vehiculo.id === "plata" ? "-scale-x-100" : ""
                    }`}
                  />
                </div>
                <div className="p-6 text-left">
                  <h3
                    className="text-xl font-semibold text-gray-900"
                    itemProp="name"
                  >
                    {vehiculo.nombre} ({vehiculo.modelo})
                  </h3>
                  <p className="mt-2 text-gray-700" itemProp="description">
                    {vehiculo.descripcion}
                  </p>
                  <meta itemProp="modelDate" content={vehiculo.modelo} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}