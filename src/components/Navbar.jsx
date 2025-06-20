import { Globe } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-neutral-950 border-b border-white/30 text-white/80 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo + menú */}
        <div className="flex items-center gap-8">
          <span className="text-xl text-neutral-100 font-light">
            HM Mobility
          </span>
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li>
              <a
                href="#cotizacion"
                className="hover:underline hover:text-neutral-100 transition"
              >
                Cotización
              </a>
            </li>
            <li>
              <a
                href="#reseñas"
                className="hover:underline hover:text-neutral-100 transition"
              >
                Reseñas
              </a>
            </li>
            <li>
              <a
                href="#vehiculos"
                className="hover:underline hover:text-neutral-100 transition"
              >
                Vehículos
              </a>
            </li>
            <li>
              <a
                href="#resultados"
                className="hover:underline hover:text-neutral-100 transition"
              >
                Resultados
              </a>
            </li>
          </ul>
        </div>

        {/* Idioma + acciones */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:underline hover:text-neutral-100">
            <Globe className="w-4 h-4" />
            <span>ES</span>
          </div>
        </div>
      </div>
    </nav>
  );
}