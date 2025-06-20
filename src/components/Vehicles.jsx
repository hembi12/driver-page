// src/components/vehicles/Vehicles.jsx
import React from "react";

const vehicles = [
  {
    id: "plata",
    nombre: "Suzuki Ertiga Plata",
    modelo: "2022",
    imagen: "/ertigaplata.png",
    descripcion:
      "Camioneta cómoda y espaciosa, ideal para traslados familiares o de grupos. Color plata, modelo 2022.",
  },
  {
    id: "blanca",
    nombre: "Suzuki Ertiga Blanca",
    modelo: "2019",
    imagen: "/ertigablanca.png",
    descripcion:
      "Vehículo versátil y confiable, perfecto para viajes largos o servicios privados. Color blanco, modelo 2019.",
  },
];

export default function Vehicles() {
  return (
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
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="w-full h-64 bg-white flex items-center justify-center">
                <img
                  src={vehiculo.imagen}
                  alt={vehiculo.nombre}
                  className={`h-full max-w-[70%] object-contain ${
                    vehiculo.id === "plata" ? "-scale-x-100" : ""
                  }`}
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-900">
                  {vehiculo.nombre} ({vehiculo.modelo})
                </h3>
                <p className="mt-2 text-gray-700">{vehiculo.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}