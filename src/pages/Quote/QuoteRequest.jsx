"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import {
  Car,
  Users,
  Repeat,
  MapPin,
  CalendarDays,
  Clock,
} from "lucide-react";
import QuoteForm from "./QuoteForm";
import SeoQuote from "../../seo/SeoQuote";

export default function QuoteRequest() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(localStorage.getItem("cotizacion"));
      setDatos(localData);
    }
  }, []);

  useEffect(() => {
    if (!datos || mapInitialized) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && mapRef.current && !mapInitialized) {
          const loader = new Loader({
            apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            version: "weekly",
            libraries: ["places"],
            language: "es",
            region: "MX",
          });

          loader.load().then(() => {
            if (!window.google) return;

            const map = new window.google.maps.Map(mapRef.current, {
              zoom: 7,
              center: { lat: 19.4326, lng: -99.1332 },
            });

            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);

            directionsService.route(
              {
                origin: datos.origen,
                destination: datos.destino,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === "OK") {
                  directionsRenderer.setDirections(result);
                } else {
                  console.error("Error al obtener la ruta:", status);
                }
              }
            );

            setMapInitialized(true);
          });

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => observer.disconnect();
  }, [datos, mapInitialized]);

  if (!datos) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100 text-gray-700 text-lg">
        No hay datos disponibles.
      </div>
    );
  }

  const fechaFormateada = new Date(datos.fecha).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [hour, minute] = datos.hora.split(":");
  const horaDate = new Date();
  horaDate.setHours(hour, minute);
  const horaFormateada = horaDate.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      <SeoQuote />
      <div className="min-h-screen bg-[#f5f7fa] px-4 py-8 md:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Encabezado y detalles */}
          <section aria-labelledby="detalles-viaje">
            <div className="text-center">
              <h1
                id="detalles-viaje"
                className="text-3xl font-extrabold text-gray-900"
              >
                Detalles de tu viaje
              </h1>
              <p className="text-gray-500 mt-2 text-base">
                Revisa los detalles de tu viaje y completa tu solicitud de
                cotización personalizada.
              </p>
            </div>

            <div className="flex flex-col lg:items-center gap-6 mt-8">
              {/* Tarjeta de información */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 w-full lg:w-1/2">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Información del viaje
                </h2>

                <ul className="divide-y divide-gray-200">
                  <li className="flex items-center gap-3 py-3">
                    <Car className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Servicio:</span>
                    <span className="ml-auto text-gray-900">
                      {datos.tipoServicio}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 py-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Pasajeros:</span>
                    <span className="ml-auto text-gray-900">
                      {datos.numeroPasajeros}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 py-3">
                    <Repeat className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">
                      Tipo de viaje:
                    </span>
                    <span className="ml-auto text-gray-900">
                      {datos.tipoViaje}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 py-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Origen:</span>
                    <span className="ml-auto text-gray-900 text-right">
                      {datos.origen}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 py-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Destino:</span>
                    <span className="ml-auto text-gray-900 text-right">
                      {datos.destino}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 py-3">
                    <CalendarDays className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Fecha:</span>
                    <span className="ml-auto text-gray-900">
                      {fechaFormateada}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 py-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Hora:</span>
                    <span className="ml-auto text-gray-900">
                      {horaFormateada}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Mapa del viaje */}
              <div
                ref={mapContainerRef}
                className="w-full lg:w-1/2 h-[400px] rounded-2xl border border-gray-300 shadow-lg"
              >
                <div ref={mapRef} className="w-full h-full rounded-2xl" />
              </div>
            </div>
          </section>

          {/* Formulario de contacto */}
          <section aria-labelledby="formulario-cotizacion">
            <h2 id="formulario-cotizacion" className="sr-only">
              Formulario de cotización
            </h2>
            <QuoteForm />
          </section>
        </div>
      </div>
    </>
  );
}