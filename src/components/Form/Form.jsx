"use client";
import { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import TravelForm from "./TravelForm";
import AdBanner from "../../ads/AdBanner";    // ← ajusta la ruta si tu archivo está en otra carpeta

export default function Form() {
  /* ---------- estados ---------- */
  const [tipoServicio, setTipoServicio]         = useState("");
  const [numeroPasajeros, setNumeroPasajeros]   = useState("");
  const [tipoViaje, setTipoViaje]               = useState("");
  const [origen, setOrigen]                     = useState("");
  const [destino, setDestino]                   = useState("");
  const [error, setError]                       = useState("");
  const [fecha, setFecha]                       = useState("");
  const [hora, setHora]                         = useState("");
  const [enviando, setEnviando]                 = useState(false);
  const [advertenciaHora, setAdvertenciaHora]   = useState("");
  const [mapsLoaded, setMapsLoaded]             = useState(false);

  /* ---------- refs ---------- */
  const origenInputRef          = useRef(null);
  const destinoInputRef         = useRef(null);
  const origenAutocompleteRef   = useRef(null);
  const destinoAutocompleteRef  = useRef(null);

  /* ---------- utilidades de fecha/hora ---------- */
  const hoy        = new Date();
  const yyyyMMdd   = hoy.toISOString().split("T")[0];
  const pad        = (n) => n.toString().padStart(2, "0");
  const horaActual = `${pad(hoy.getHours())}:${pad(hoy.getMinutes())}`;

  /* ---------- carga de Google Maps + Places ---------- */
  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
      language: "es",
      region: "MX",
    });

    const loadGoogleMaps = async () => {
      try {
        await loader.load();
        setMapsLoaded(true);
        initializeAutocomplete();
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    loadGoogleMaps();
  }, []);

  /* ---------- Autocomplete ---------- */
  const initializeAutocomplete = () => {
    if (!window.google || !origenInputRef.current || !destinoInputRef.current) return;

    const options = {
      componentRestrictions: { country: "mx" },
      fields: [
        "place_id",
        "geometry",
        "name",
        "formatted_address",
        "address_components",
      ],
      types: ["address"],
      strictBounds: false,
    };

    origenAutocompleteRef.current  = new window.google.maps.places.Autocomplete(origenInputRef.current, options);
    destinoAutocompleteRef.current = new window.google.maps.places.Autocomplete(destinoInputRef.current, options);

    origenAutocompleteRef.current.addListener("place_changed", () => {
      const place = origenAutocompleteRef.current.getPlace();
      if (place.formatted_address) setOrigen(place.formatted_address);
    });
    destinoAutocompleteRef.current.addListener("place_changed", () => {
      const place = destinoAutocompleteRef.current.getPlace();
      if (place.formatted_address) setDestino(place.formatted_address);
    });
  };

  /* ---------- render ---------- */
  return (
    <section
      id="cotizacion"
      className="py-16 px-4 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100"
      aria-labelledby="cotizacion-title"
    >
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2
          id="cotizacion-title"
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2"
        >
          Solicita tu cotización
        </h2>
        <p className="text-gray-600 text-lg">
          Llena el formulario con los detalles de tu viaje
        </p>
      </div>

      {/* ---------- formulario ---------- */}
      <TravelForm
        {...{
          tipoServicio,
          setTipoServicio,
          numeroPasajeros,
          setNumeroPasajeros,
          tipoViaje,
          setTipoViaje,
          origen,
          setOrigen,
          destino,
          setDestino,
          fecha,
          setFecha,
          hora,
          setHora,
          error,
          setError,
          advertenciaHora,
          setAdvertenciaHora,
          mapsLoaded,
          origenInputRef,
          destinoInputRef,
          yyyyMMdd,
          horaActual,
          enviando,
          setEnviando,
        }}
      />

      {/* ---------- anuncio de AdSense ---------- */}
      <div className="mt-12 flex justify-center">
        <AdBanner />
      </div>
    </section>
  );
}