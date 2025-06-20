// src/components/footer/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-white/30 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Información principal */}
        <div>
          <h3 className="text-xl font-light text-neutral-100">HM Mobility</h3>
          <p className="text-sm text-white/70 mt-1">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>

        {/* Links rápidos */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/80">
          <a href="#cotizacion" className="hover:text-neutral-100 hover:underline transition">
            Cotización
          </a>
          <a href="#reseñas" className="hover:text-neutral-100 hover:underline transition">
            Reseñas
          </a>
          <a href="#vehiculos" className="hover:text-neutral-100 hover:underline transition">
            Vehículos
          </a>
          <a href="#resultados" className="hover:text-neutral-100 hover:underline transition">
            Resultados
          </a>
        </div>

        {/* Enlaces legales */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/80">
          <a
            href="/privacy-policy"
            className="hover:text-neutral-100 hover:underline transition"
          >
            Aviso de privacidad
          </a>
          <a
            href="/terminos-condiciones"
            className="hover:text-neutral-100 hover:underline transition"
          >
            Términos y condiciones
          </a>
        </div>
      </div>
    </footer>
  );
}
