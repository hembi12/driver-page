import React from "react";

const vehicles = [
  {
    id: "plata",
    nombre: "Suzuki Ertiga Plata",
    imagen: "images/ertigaplata.webp",
    descripcion:
      "Camioneta cómoda y espaciosa, ideal para traslados familiares o de grupos. Color plata.",
  },
  {
    id: "blanca",
    nombre: "Suzuki Ertiga Blanca",
    imagen: "images/ertigablanca.webp",
    descripcion:
      "Vehículo versátil y confiable, perfecto para viajes largos o servicios privados. Color blanco.",
  },
];

export default function Vehicles() {
  return (
    <section
      id="vehiculos"
      aria-labelledby="vehiculos-title"
      className="py-16 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2
          id="vehiculos-title"
          className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4"
        >
          Vehículos Disponibles
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-base">
          Nuestra flota está equipada para ofrecer comodidad, seguridad y
          confianza en cada trayecto.
        </p>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {vehicles.map((vehiculo) => (
            <article
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
                  {vehiculo.nombre}
                </h3>
                <p className="mt-2 text-gray-700" itemProp="description">
                  {vehiculo.descripcion}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}