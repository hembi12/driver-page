"use client";
import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TravelForm({
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
}) {
  const navigate = useNavigate();
  const [exito, setExito] = useState("");

  const handleSubmit = () => {
    if (
      !tipoServicio ||
      !numeroPasajeros ||
      !tipoViaje ||
      !origen.trim() ||
      !destino.trim() ||
      !fecha ||
      !hora
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");
    setAdvertenciaHora("");
    setExito("");
    setEnviando(true);

    const datosViaje = {
      tipoServicio,
      numeroPasajeros,
      tipoViaje,
      origen,
      destino,
      fecha,
      hora,
    };

    localStorage.setItem("cotizacion", JSON.stringify(datosViaje));

    setTimeout(() => {
      setExito("¡Cotización enviada con éxito!");
      setEnviando(false);
      navigate("/solicitud-de-cotizacion");
    }, 2000);
  };

  return (
    <div className="flex justify-center px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl"
        aria-labelledby="form-title"
      >
        <h2 id="form-title" className="sr-only">
          Formulario de cotización
        </h2>

        {/* Tipo de servicio */}
        <div className="mb-4">
          <label htmlFor="tipoServicio" className="sr-only">Tipo de servicio</label>
          <select
            id="tipoServicio"
            value={tipoServicio}
            onChange={(e) => {
              setTipoServicio(e.target.value);
              if (error) setError("");
            }}
            className="cursor-pointer w-full p-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
          >
            <option value="" disabled>Selecciona un servicio</option>
            <option value="viaje-ciudad">Viaje en la ciudad</option>
            <option value="viaje-foraneo">Viaje foráneo</option>
            <option value="aeropuerto">Traslado al aeropuerto</option>
            <option value="pet-friendly">Viaje pet friendly</option>
          </select>
        </div>

        {/* Número de pasajeros */}
        <div className="mb-4">
          <label htmlFor="numeroPasajeros" className="sr-only">Número de pasajeros</label>
          <select
            id="numeroPasajeros"
            value={numeroPasajeros}
            onChange={(e) => {
              setNumeroPasajeros(e.target.value);
              if (error) setError("");
            }}
            className="cursor-pointer w-full p-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
          >
            <option value="" disabled>Número de pasajeros</option>
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} {index + 1 === 1 ? "pasajero" : "pasajeros"}
              </option>
            ))}
            <option value="mas-de-12">Más de 12 pasajeros</option>
          </select>
        </div>

        {/* Tipo de viaje */}
        <div className="mb-4">
          <label htmlFor="tipoViaje" className="sr-only">Tipo de viaje</label>
          <select
            id="tipoViaje"
            value={tipoViaje}
            onChange={(e) => {
              setTipoViaje(e.target.value);
              if (error) setError("");
            }}
            className="cursor-pointer w-full p-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
          >
            <option value="" disabled>Tipo de viaje</option>
            <option value="ida">Solo ida</option>
            <option value="ida-vuelta">Ida y vuelta</option>
          </select>
        </div>

        {/* Dirección de origen */}
        <div className="flex items-center gap-2 p-3 bg-neutral-50 border border-neutral-300 rounded-xl mb-4">
          <MapPin className="w-4 h-4 text-gray-500" aria-hidden="true" />
          <label htmlFor="origen" className="sr-only">Dirección de origen</label>
          <input
            ref={origenInputRef}
            id="origen"
            type="text"
            placeholder={mapsLoaded ? "Dirección de origen" : "Cargando..."}
            value={origen}
            onChange={(e) => {
              setOrigen(e.target.value);
              if (error) setError("");
            }}
            disabled={!mapsLoaded}
            className="flex-1 bg-transparent focus:outline-none text-sm disabled:opacity-50"
          />
        </div>

        {/* Dirección de destino */}
        <div className="flex items-center gap-2 p-3 bg-neutral-50 border border-neutral-300 rounded-xl mb-4">
          <MapPin className="w-4 h-4 text-gray-500" aria-hidden="true" />
          <label htmlFor="destino" className="sr-only">Dirección de destino</label>
          <input
            ref={destinoInputRef}
            id="destino"
            type="text"
            placeholder={mapsLoaded ? "Dirección de destino" : "Cargando..."}
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
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="bg-neutral-50 border border-neutral-300 p-4 rounded-xl w-full sm:w-1/2">
            <label htmlFor="fecha" className="sr-only">Fecha</label>
            <input
              id="fecha"
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
          <div className="bg-neutral-50 border border-neutral-300 p-4 rounded-xl w-full sm:w-1/2">
            <label htmlFor="hora" className="sr-only">Hora</label>
            <input
              id="hora"
              type="time"
              value={hora}
              min={fecha === yyyyMMdd ? horaActual : undefined}
              onChange={(e) => {
                const nuevaHora = e.target.value;
                if (fecha === yyyyMMdd && nuevaHora < horaActual) {
                  setAdvertenciaHora("No puedes seleccionar una hora anterior a la actual.");
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
        {error && (
          <p role="alert" className="text-red-600 text-sm mb-4">
            {error}
          </p>
        )}
        {advertenciaHora && (
          <p role="alert" className="text-red-600 text-sm mb-4">
            {advertenciaHora}
          </p>
        )}
        {exito && (
          <p role="alert" className="text-green-600 text-sm mb-4">
            {exito}
          </p>
        )}

        {/* Botón */}
        <button
          type="submit"
          aria-label="Enviar solicitud de cotización"
          className="w-full bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={enviando || !mapsLoaded}
        >
          {enviando ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Cotizando...
            </>
          ) : (
            "Cotizar Viaje"
          )}
        </button>
      </form>
    </div>
  );
}