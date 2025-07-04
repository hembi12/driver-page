export default function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-labelledby="footer-title"
      className="bg-neutral-950 border-t border-white/10 text-white py-8 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Información principal */}
        <div>
          <h3 id="footer-title" className="text-xl font-light text-neutral-100">
            HM Mobility
          </h3>
          <p className="text-sm text-white/70 mt-1">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>

        {/* Enlaces legales */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/80">
          <a
            href="/politica-de-privacidad"
            className="hover:text-neutral-100 hover:underline transition"
          >
            Política de privacidad
          </a>
          <a
            href="/terminos-y-condiciones"
            className="hover:text-neutral-100 hover:underline transition"
          >
            Términos y condiciones
          </a>
        </div>
      </div>
    </footer>
  );
}