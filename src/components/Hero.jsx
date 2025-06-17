import { useState, useRef, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Hero() {
  const [tipoServicio, setTipoServicio] = useState("");
  const [numeroPasajeros, setNumeroPasajeros] = useState(""); // Nuevo estado
  const [tipoViaje, setTipoViaje] = useState(""); // Nuevo estado para ida/ida y vuelta
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [error, setError] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState("");
  const [advertenciaHora, setAdvertenciaHora] = useState("");
  const [mapsLoaded, setMapsLoaded] = useState(false);
  
  // Referencias para los inputs de autocompletado
  const origenInputRef = useRef(null);
  const destinoInputRef = useRef(null);
  const origenAutocompleteRef = useRef(null);
  const destinoAutocompleteRef = useRef(null);

  const hoy = new Date();
  const yyyyMMdd = hoy.toISOString().split("T")[0];
  const pad = (n) => n.toString().padStart(2, "0");
  const horaActual = `${pad(hoy.getHours())}:${pad(hoy.getMinutes())}`;

  // Cargar Google Maps API y configurar autocompletado
  useEffect(() => {
    // Configuración del loader de Google Maps
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
      language: "es",
      region: "MX"
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

  const initializeAutocomplete = () => {
    if (!window.google || !origenInputRef.current || !destinoInputRef.current) {
      return;
    }

    // Configuración para el autocompletado
    const options = {
      componentRestrictions: { country: 'mx' }, // Restringir a México
      fields: ['place_id', 'geometry', 'name', 'formatted_address', 'address_components'],
      types: ['address'], // Solo direcciones
      strictBounds: false
    };

    // Crear instancias de Autocomplete
    origenAutocompleteRef.current = new window.google.maps.places.Autocomplete(
      origenInputRef.current,
      options
    );

    destinoAutocompleteRef.current = new window.google.maps.places.Autocomplete(
      destinoInputRef.current,
      options
    );

    // Listeners para cuando se selecciona un lugar
    origenAutocompleteRef.current.addListener('place_changed', () => {
      const place = origenAutocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setOrigen(place.formatted_address);
        console.log('Lugar origen seleccionado:', place);
      }
    });

    destinoAutocompleteRef.current.addListener('place_changed', () => {
      const place = destinoAutocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setDestino(place.formatted_address);
        console.log('Lugar destino seleccionado:', place);
      }
    });
  };

  const handleSubmit = () => {
    if (!tipoServicio) {
      setError("Por favor, selecciona un tipo de servicio.");
      return;
    }
    if (!numeroPasajeros) {
      setError("Por favor, selecciona el número de pasajeros.");
      return;
    }
    if (!tipoViaje) {
      setError("Por favor, selecciona el tipo de viaje.");
      return;
    }
    if (!origen.trim() || !destino.trim()) {
      setError("Por favor, introduzca una dirección de origen y destino.");
      return;
    }
    if (!fecha || !hora) {
      setError("Por favor, introduzca una fecha y hora de origen.");
      return;
    }

    setError("");
    setExito("");
    setEnviando(true);

    setTimeout(() => {
      setEnviando(false);
      setExito("¡Solicitud enviada correctamente!");
      console.log("Tipo de servicio:", tipoServicio);
      console.log("Número de pasajeros:", numeroPasajeros);
      console.log("Tipo de viaje:", tipoViaje);
      console.log("Origen:", origen);
      console.log("Destino:", destino);
      console.log("Fecha:", fecha);
      console.log("Hora:", hora);

      // Limpiar campos
      setTipoServicio("");
      setNumeroPasajeros("");
      setTipoViaje("");
      setOrigen("");
      setDestino("");
      setFecha("");
      setHora("");
    }, 2000);
  };

  return (
    <section className="pt-16 flex items-center justify-center bg-white p-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-5xl font-semibold leading-tight text-center mb-12 max-w-5xl mx-auto">
          Viaja seguro, cómodo y puntual
        </h1>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            {/* Selector tipo de servicio */}
            <div className="max-w-sm mb-4">
              <select
                value={tipoServicio}
                onChange={(e) => {
                  setTipoServicio(e.target.value);
                  if (error) setError("");
                }}
                className="w-full p-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
              >
                <option value="" disabled>Selecciona un servicio</option>
                <option value="ciudad">Viaje en la ciudad</option>
                <option value="foraneo">Viaje foráneo</option>
                <option value="aeropuerto">Traslado al aeropuerto</option>
                <option value="pet-friendly">Viaje pet friendly</option>
              </select>
            </div>

            {/* Selector número de pasajeros */}
            <div className="max-w-sm mb-4">
              <select
                value={numeroPasajeros}
                onChange={(e) => {
                  setNumeroPasajeros(e.target.value);
                  if (error) setError("");
                }}
                className="w-full p-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
              >
                <option value="" disabled>Número de pasajeros</option>
                {[...Array(12)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1} {index + 1 === 1 ? 'pasajero' : 'pasajeros'}
                  </option>
                ))}
                <option value="mas-de-12">Más de 12 pasajeros</option>
              </select>
            </div>

            {/* Selector tipo de viaje */}
            <div className="max-w-sm mb-4">
              <select
                value={tipoViaje}
                onChange={(e) => {
                  setTipoViaje(e.target.value);
                  if (error) setError("");
                }}
                className="w-full p-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
              >
                <option value="" disabled>Tipo de viaje</option>
                <option value="ida">Solo ida</option>
                <option value="ida-vuelta">Ida y vuelta</option>
              </select>
            </div>

            {/* Input origen con autocompletado */}
            <div className="max-w-sm flex items-center gap-2 p-3 bg-gray-100 rounded-xl mb-2 relative">
              <MapPin className="w-4 h-4 text-gray-500" />
              <input
                ref={origenInputRef}
                type="text"
                placeholder={mapsLoaded ? "Dirección de origen" : "Cargando autocompletado..."}
                value={origen}
                onChange={(e) => {
                  setOrigen(e.target.value);
                  if (error) setError("");
                }}
                disabled={!mapsLoaded}
                className="flex-1 bg-transparent focus:outline-none text-sm disabled:opacity-50"
              />
            </div>

            {/* Input destino con autocompletado */}
            <div className="max-w-sm flex items-center gap-2 p-3 bg-gray-100 rounded-xl mb-4 relative">
              <MapPin className="w-4 h-4 text-gray-500" />
              <input
                ref={destinoInputRef}
                type="text"
                placeholder={mapsLoaded ? "Dirección de destino" : "Cargando autocompletado..."}
                value={destino}
                onChange={(e) => {
                  setDestino(e.target.value);
                  if (error) setError("");
                }}
                disabled={!mapsLoaded}
                className="flex-1 bg-transparent focus:outline-none text-sm disabled:opacity-50"
              />
            </div>

            {/* Fecha y hora */}
            <div className="flex gap-4 mb-4">
              <div className="bg-gray-100 p-4 rounded-xl w-46 flex items-center justify-center">
                <input
                  type="date"
                  min={yyyyMMdd}
                  value={fecha}
                  onChange={(e) => {
                    setFecha(e.target.value);
                    if (error) setError("");
                  }}
                  className="bg-transparent text-sm text-center focus:outline-none w-full"
                />
              </div>

              <div className="bg-gray-100 p-4 rounded-xl w-46 flex items-center justify-center">
                <input
                  type="time"
                  value={hora}
                  min={fecha === yyyyMMdd ? horaActual : undefined}
                  onChange={(e) => {
                    const nuevaHora = e.target.value;

                    if (fecha === yyyyMMdd && nuevaHora < horaActual) {
                      setAdvertenciaHora(
                        "No puedes seleccionar una hora anterior a la actual."
                      );
                      setHora("");
                    } else {
                      setAdvertenciaHora("");
                      setHora(nuevaHora);
                    }

                    if (error) setError("");
                  }}
                  className="bg-transparent text-sm text-center focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Mensajes */}
            {error ? (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            ) : advertenciaHora ? (
              <p className="text-red-600 text-sm mb-4">{advertenciaHora}</p>
            ) : exito ? (
              <p className="text-green-600 text-sm mb-4">{exito}</p>
            ) : null}

            {/* Botón */}
            <button
              className="bg-black text-white py-3 px-6 rounded-lg text-sm font-medium mb-4 flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={enviando || !mapsLoaded}
            >
              {enviando ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Enviando...
                </>
              ) : (
                "Solicitar cotización"
              )}
            </button>

            <p className="text-sm text-gray-500">
              Inicia sesión para ver tu actividad reciente
            </p>
          </div>

          <div className="flex-1">
            <div className="bg-gray-200 rounded-xl w-full h-64 flex items-center justify-center">
              <span className="text-gray-500">Imagen del hero</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}