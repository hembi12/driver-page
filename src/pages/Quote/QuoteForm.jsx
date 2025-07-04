"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function QuoteForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [numeroConfirmacion, setNumeroConfirmacion] = useState("");
  const [detallesViaje, setDetallesViaje] = useState(null);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("cotizacion"));
    setDetallesViaje(datos);
  }, []);

  const handleSubmit = async (e) => {
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

    const codigo =
      "#" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setNumeroConfirmacion(codigo);

    const datosContacto = {
      nombre,
      correo,
      telefono,
      comentarios,
      numeroConfirmacion: codigo,
      ...detallesViaje,
    };

    try {
      const res = await fetch("http://localhost:3001/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosContacto),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setExito(true);
      setEnviando(false);
      setNombre("");
      setCorreo("");
      setTelefono("");
      setComentarios("");
      setAceptaPolitica(false);
      setMostrarModal(true);
    } catch (err) {
      console.error("❌ Error al enviar el correo:", err.message);
      setError("Hubo un problema al enviar la cotización. Intenta nuevamente.");
      setEnviando(false);
    }
  };

  return (
    <div className="mt-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 w-full lg:w-1/2">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 text-left">
        Información de contacto
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="bg-neutral-50 border border-neutral-300 p-3 rounded-xl">
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

        <div className="bg-neutral-50 border border-neutral-300 p-3 rounded-xl">
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

        <div className="bg-neutral-50 border border-neutral-300 p-3 rounded-xl">
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

        <div className="bg-neutral-50 border border-neutral-300 p-3 rounded-xl">
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
            className="h-3 w-4 cursor-pointer text-blue-600 border-gray-300 rounded mt-1"
          />
          <label
            htmlFor="politica"
            className="text-sm text-gray-700 leading-snug"
          >
            Acepto la{" "}
            <a
              href="/politica-de-privacidad"
              className="text-blue-700 hover:text-blue-600 hover:underline"
            >
              política de privacidad
            </a>{" "}
            y los{" "}
            <a
              href="/terminos-y-condiciones"
              className="text-blue-700 hover:text-blue-600 hover:underline"
            >
              términos y condiciones
            </a>
          </label>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {exito && (
          <p className="text-green-600 text-sm">
            ¡Tu cotización fue enviada correctamente!
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
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

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ¡Cotización enviada!
            </h3>
            <p className="text-gray-600 mb-3">
              Gracias por compartir tus datos. Pronto recibirás una respuesta.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Tu número de confirmación es:{" "}
              <span className="font-mono font-semibold text-gray-800">
                {numeroConfirmacion}
              </span>
            </p>
            <button
              onClick={() => setMostrarModal(false)}
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
