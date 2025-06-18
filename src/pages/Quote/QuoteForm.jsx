"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";

export default function QuoteForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState(""); // ya viene en formato +521234567890
  const [comentarios, setComentarios] = useState("");
  const [aceptaPolitica, setAceptaPolitica] = useState(false);

  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !telefono || !aceptaPolitica) {
      setError("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (!isValidPhoneNumber(telefono)) {
      setError("Número de teléfono no válido.");
      return;
    }

    setError("");
    setExito(false);
    setEnviando(true);

    const datosContacto = {
      nombre,
      correo,
      telefono,
      comentarios,
    };

    console.log("Enviando cotización:", datosContacto);

    setTimeout(() => {
      setExito(true);
      setEnviando(false);
      setNombre("");
      setCorreo("");
      setTelefono("");
      setComentarios("");
      setAceptaPolitica(false);
    }, 2000);
  };

  return (
    <div className="mt-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 w-full lg:w-1/2">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 text-left">
        Tus datos para enviarte la cotización
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="bg-gray-100 p-3 rounded-xl">
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              if (error) setError("");
            }}
            className="w-full bg-transparent focus:outline-none text-sm"
            placeholder="Nombre completo"
          />
        </div>

        <div className="bg-gray-100 p-3 rounded-xl">
          <input
            type="email"
            name="correo"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              if (error) setError("");
            }}
            className="w-full bg-transparent focus:outline-none text-sm"
            placeholder="Correo electrónico"
          />
        </div>

        <div className="bg-gray-100 p-3 rounded-xl">
          <PhoneInput
            international
            defaultCountry="MX"
            value={telefono}
            onChange={(value) => {
              setTelefono(value);
              if (error) setError("");
            }}
            className="text-sm"
            placeholder="Número de teléfono"
          />
        </div>

        <div className="bg-gray-100 p-3 rounded-xl">
          <textarea
            name="comentarios"
            rows={3}
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-sm resize-none"
            placeholder="Comentarios adicionales (opcional)"
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            id="politica"
            name="politica"
            type="checkbox"
            checked={aceptaPolitica}
            onChange={(e) => {
              setAceptaPolitica(e.target.checked);
              if (error) setError("");
            }}
            className="h-3 w-4 cursor-pointer text-indigo-600 border-gray-300 rounded mt-1"
          />
          <label
            htmlFor="politica"
            className="text-sm text-gray-700 leading-snug"
          >
            Acepto la{" "}
            <Link to="/privacy-policy" className="text-indigo-600 underline">
              política de privacidad
            </Link>
          </label>
        </div>

        {/* Mensajes */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {exito && (
          <p className="text-green-600 text-sm">
            ¡Tu cotización fue enviada correctamente!
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {enviando ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Enviando...
            </>
          ) : (
            "Enviar cotización"
          )}
        </button>
      </form>
    </div>
  );
}
