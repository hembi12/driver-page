import { Globe } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-4 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo + menú */}
        <div className="flex items-center gap-8">
          <span className="text-2xl font-light">Uber</span>
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li className="cursor-pointer hover:underline">Viaja</li>
            <li className="cursor-pointer hover:underline">Conduce</li>
            <li className="cursor-pointer hover:underline">Empresas</li>
            <li className="cursor-pointer hover:underline">Uber Eats</li>
            <li className="cursor-pointer hover:underline">
              Quiénes somos <span className="ml-1">▼</span>
            </li>
          </ul>
        </div>

        {/* Idioma + acciones */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <Globe className="w-4 h-4" />
            <span>ES</span>
          </div>
          <span className="cursor-pointer hover:underline">Ayuda</span>
          <span className="cursor-pointer hover:underline">Inicia sesión</span>
          <button className="bg-white text-black px-3 py-1.5 rounded-full font-medium hover:bg-gray-200">
            Regístrate
          </button>
        </div>
      </div>
    </nav>
  );
}