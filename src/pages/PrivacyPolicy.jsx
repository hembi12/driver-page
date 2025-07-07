"use client";
import { useNavigate } from "react-router-dom";
import SeoPrivacy from "../seo/SeoPrivacy";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100 px-6 py-16"
      aria-labelledby="politica-de-privacidad"
    >
      <SeoPrivacy /> 

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 id="politica-de-privacidad" className="text-4xl font-bold text-gray-900 mb-6">
          Política de Privacidad
        </h1>

        <p className="text-gray-700 mb-4">
          En <strong>HM Mobility</strong> nos tomamos muy en serio la privacidad de
          tus datos. Esta política describe cómo recopilamos, usamos y
          protegemos la información personal que nos proporcionas a través de
          nuestro sitio web o formulario de cotización.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          1. Información que recopilamos
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Tipo de servicio y viaje</li>
          <li>Número de pasajeros</li>
          <li>Dirección de origen y destino</li>
          <li>Fecha y hora del servicio</li>
          <li>Aceptación de la política de privacidad</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          2. Uso de la información
        </h2>
        <p className="text-gray-700 mb-4">
          Utilizamos tus datos exclusivamente para contactar contigo y coordinar el
          servicio solicitado.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          3. Almacenamiento y seguridad
        </h2>
        <p className="text-gray-700 mb-4">
          Tus datos son almacenados de forma segura y no serán compartidos con
          terceros sin tu consentimiento. Implementamos medidas de protección
          para garantizar su confidencialidad.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          4. Derechos del usuario
        </h2>
        <p className="text-gray-700 mb-4">
          Puedes solicitar en cualquier momento la modificación o eliminación de
          tus datos personales escribiéndonos a:{" "}
          <a
            href="mailto:marcodigitaltv@gmail.com"
            className="text-blue-700 hover:text-blue-600 hover:underline"
          >
            marcodigitaltv@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          5. Cambios en la política
        </h2>
        <p className="text-gray-700 mb-4">
          Esta política puede ser actualizada ocasionalmente. Te notificaremos
          sobre cualquier cambio relevante a través de nuestros canales
          oficiales.
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