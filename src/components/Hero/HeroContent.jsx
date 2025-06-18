import { Check } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="text-center px-4 sm:px-0">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-gray-900">
        Viaja seguro, cómodo y puntual
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
        El servicio de transporte ejecutivo que necesitas para llegar a tu
        destino con total tranquilidad
      </p>
      <ul className="space-y-4 text-base flex flex-col items-center text-center">
        <li className="flex items-start gap-3 max-w-md">
          <Check className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
          <span>
            <strong>Conductores certificados</strong> con años de experiencia
          </span>
        </li>
        <li className="flex items-start gap-3 max-w-md">
          <Check className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
          <span>
            <strong>Puntualidad garantizada</strong> con seguimiento en tiempo
            real de tu viaje
          </span>
        </li>
        <li className="flex items-start gap-3 max-w-md">
          <Check className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
          <span>
            <strong>Vehículos premium</strong> con mantenimiento regular y
            máxima comodidad
          </span>
        </li>
      </ul>
    </div>
  );
}
