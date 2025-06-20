import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ClipboardList,
  Star,
  Car,
  ShieldCheck,
  Languages,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  const mostrarSoloLogo = [
    "/solicitud-de-cotizacion",
    "/politica-de-privacidad",
    "/terminos-y-condiciones",
  ].includes(location.pathname);

  return (
    <nav className="bg-neutral-950 border-b border-white/30 text-white/80 px-4 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo como botón de inicio */}
        <Link
          to="/"
          className="text-xl text-neutral-100 font-light transition"
          onClick={() => setMenuAbierto(false)}
        >
          HM Mobility
        </Link>

        {mostrarSoloLogo ? (
          <div
            className="flex items-center gap-1 text-sm font-sm cursor-pointer hover:underline hover:text-neutral-100"
            aria-label="Idioma actual: Español"
            title="Idioma actual: Español"
          >
            <Languages className="w-4 h-4" />
            <span>ES</span>
          </div>
        ) : (
          <>
            {/* Menú desktop + idioma */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6 text-sm font-medium">
                <li>
                  <a
                    href="#cotizacion"
                    title="Ir a la sección de cotización"
                    aria-label="Sección Cotización"
                    className="flex items-center gap-1 hover:underline hover:text-neutral-100 transition"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Cotización
                  </a>
                </li>
                <li>
                  <a
                    href="#reseñas"
                    title="Ir a la sección de reseñas"
                    aria-label="Sección Reseñas"
                    className="flex items-center gap-1 hover:underline hover:text-neutral-100 transition"
                  >
                    <Star className="w-4 h-4" />
                    Reseñas
                  </a>
                </li>
                <li>
                  <a
                    href="#vehiculos"
                    title="Ir a la sección de vehículos"
                    aria-label="Sección Vehículos"
                    className="flex items-center gap-1 hover:underline hover:text-neutral-100 transition"
                  >
                    <Car className="w-4 h-4" />
                    Vehículos
                  </a>
                </li>
                <li>
                  <a
                    href="#experiencia"
                    title="Ir a la sección de experiencia"
                    aria-label="Sección Experiencia"
                    className="flex items-center gap-1 hover:underline hover:text-neutral-100 transition"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Experiencia
                  </a>
                </li>
              </ul>
              <div
                className="flex items-center gap-1 cursor-pointer hover:underline hover:text-neutral-100 text-sm font-sm"
                aria-label="Idioma actual: Español"
                title="Idioma actual: Español"
              >
                <Languages className="w-4 h-4" />
                <span>ES</span>
              </div>
            </div>

            {/* Botón hamburguesa móvil */}
            <button
              className="md:hidden text-white/80 hover:text-neutral-100 transition"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Abrir o cerrar menú de navegación"
              aria-expanded={menuAbierto}
              aria-controls="mobile-menu"
            >
              {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </>
        )}
      </div>

      {/* Menú móvil desplegable */}
      {!mostrarSoloLogo && menuAbierto && (
        <div id="mobile-menu" className="md:hidden px-6 pt-4">
          <ul className="flex flex-col gap-4 text-sm font-medium">
            <li>
              <a
                href="#cotizacion"
                onClick={() => setMenuAbierto(false)}
                title="Ir a la sección de cotización"
                aria-label="Sección Cotización"
                className="flex items-center gap-2 hover:underline hover:text-neutral-100 transition"
              >
                <ClipboardList className="w-4 h-4" />
                Cotización
              </a>
            </li>
            <li>
              <a
                href="#reseñas"
                onClick={() => setMenuAbierto(false)}
                title="Ir a la sección de reseñas"
                aria-label="Sección Reseñas"
                className="flex items-center gap-2 hover:underline hover:text-neutral-100 transition"
              >
                <Star className="w-4 h-4" />
                Reseñas
              </a>
            </li>
            <li>
              <a
                href="#vehiculos"
                onClick={() => setMenuAbierto(false)}
                title="Ir a la sección de vehículos"
                aria-label="Sección Vehículos"
                className="flex items-center gap-2 hover:underline hover:text-neutral-100 transition"
              >
                <Car className="w-4 h-4" />
                Vehículos
              </a>
            </li>
            <li>
              <a
                href="#experiencia"
                onClick={() => setMenuAbierto(false)}
                title="Ir a la sección de experiencia"
                aria-label="Sección Experiencia"
                className="flex items-center gap-2 hover:underline hover:text-neutral-100 transition"
              >
                <ShieldCheck className="w-4 h-4" />
                Experiencia
              </a>
            </li>
          </ul>
          <div
            className="mt-4 flex items-center gap-2 text-sm text-white/80 hover:underline hover:text-neutral-100 transition"
            aria-label="Idioma actual: Español"
            title="Idioma actual: Español"
          >
            <Languages className="w-4 h-4" />
            <span>ES</span>
          </div>
        </div>
      )}
    </nav>
  );
}