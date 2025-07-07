"use client";

import { useNavigate } from "react-router-dom";
import SeoTerms from "../seo/SeoTerms";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100 px-6 py-16"
      aria-labelledby="terminos-condiciones"
    >
      <SeoTerms />

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 id="terminos-condiciones" className="text-4xl font-bold text-gray-900 mb-6">
          Términos y Condiciones
        </h1>

        <p className="text-gray-700 mb-4">
          Al utilizar nuestros servicios a través del sitio web de <strong>HM Mobility</strong>, aceptas los siguientes términos y condiciones. Te recomendamos leerlos detenidamente antes de realizar cualquier solicitud.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Uso del servicio</h2>
        <p className="text-gray-700 mb-4">
          El servicio proporcionado es únicamente para fines de transporte privado. Al enviar una solicitud, declaras que la información proporcionada es veraz y completa.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Responsabilidad del usuario</h2>
        <p className="text-gray-700 mb-4">
          El usuario se compromete a usar el servicio de forma responsable y a respetar al conductor y las condiciones del viaje acordadas.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Cancelaciones y cambios</h2>
        <p className="text-gray-700 mb-4">
          Si necesitas cancelar o modificar tu solicitud, debes comunicarlo con antelación. Las cancelaciones de último momento podrían estar sujetas a cargos.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Modificaciones del servicio</h2>
        <p className="text-gray-700 mb-4">
          HM Mobility se reserva el derecho de modificar, suspender o interrumpir el servicio en cualquier momento por causas justificadas o de fuerza mayor.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Datos personales</h2>
        <p className="text-gray-700 mb-4">
          El tratamiento de tus datos personales se rige por nuestra{" "}
          <a
            href="/politica-de-privacidad"
            className="text-blue-700 hover:text-blue-600 hover:underline"
          >
            Política de Privacidad
          </a>.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. Aceptación de los términos</h2>
        <p className="text-gray-700 mb-4">
          El uso de nuestros servicios implica la aceptación total de estos términos. Si no estás de acuerdo, te pedimos no continuar con la solicitud.
        </p>

        <p className="text-gray-600 text-sm mt-6">
          Última actualización: {new Date().toLocaleDateString("es-MX")}
        </p>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer inline-block px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </main>
  );
}