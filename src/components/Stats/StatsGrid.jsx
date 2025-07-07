import { useEffect, useState } from "react";
import {
  Star,
  ThumbsUp,
  Clock,
  Map,
  ShieldCheck,
  Award,
  Send,
  Smile,
} from "lucide-react";

// Iconos configurados con color
const Iconos = [
  { Icon: ThumbsUp, color: "text-green-400" },
  { Icon: Star, color: "text-yellow-400" },
  { Icon: Clock, color: "text-blue-400" },
  { Icon: Map, color: "text-purple-400" },
  { Icon: ShieldCheck, color: "text-cyan-400" },
  { Icon: Award, color: "text-pink-400" },
  { Icon: Send, color: "text-orange-400" },
  { Icon: Smile, color: "text-teal-400" },
];

// Datos de las estadísticas
const datos = [
  { valor: 4.97, etiqueta: "Calificación promedio", esDecimal: true },
  { valor: 26100, etiqueta: "Valoraciones de 5 estrellas" },
  { valor: 99, etiqueta: "Tasa de puntualidad", esPorcentaje: true },
  { valor: 300000, etiqueta: "Kilómetros recorridos" },
  { valor: 100, etiqueta: "Trayectos seguros", esPorcentaje: true },
  { valor: 9, etiqueta: "De experiencia", sufijo: " años" },
  { valor: 29850, etiqueta: "Viajes completados" },
  { valor: 19900, etiqueta: "Clientes satisfechos" },
];

export default function StatsGrid() {
  const [contadores, setContadores] = useState(datos.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setContadores((prev) =>
        prev.map((actual, i) => {
          const meta = datos[i].valor;
          if (actual >= meta) return actual;
          const incremento = Math.ceil(meta / 80);
          return Math.min(actual + incremento, meta);
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (valor, i) => {
    const stat = datos[i];
    if (stat.esDecimal)
      return valor.toFixed(2).replace(/\.00$/, ""); // elimina .00 innecesario
    if (stat.esPorcentaje) return `${valor.toFixed(0)}%`;
    if (stat.sufijo) return `${valor}${stat.sufijo}`;
    return valor.toLocaleString();
  };

  return (
    <div className="max-w-6xl w-full px-4 sm:px-10 py-10 rounded-3xl bg-black/30 backdrop-blur-md shadow-xl border border-white/20">
      <h2
        id="stats-title"
        className="text-white text-4xl sm:text-5xl font-bold mb-4 text-center"
      >
        Nuestra Experiencia Habla
      </h2>
      <p className="text-center text-white/80 text-base max-w-2xl mx-auto mb-10">
        Cada número representa nuestro compromiso con la excelencia, la seguridad y la satisfacción de nuestros clientes.
      </p>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        role="list"
      >
        {datos.map((stat, i) => {
          const { Icon, color } = Iconos[i];
          return (
            <div
              key={i}
              role="listitem"
              aria-label={`${formatNumber(contadores[i], i)} ${stat.etiqueta}`}
              className="bg-black/10 text-white border border-white/40 p-6 rounded-xl text-center"
            >
              <Icon className={`w-6 h-6 mx-auto ${color}`} aria-hidden="true" />
              <p
                className="text-2xl font-bold text-neutral-100 mt-2"
                aria-live="polite"
              >
                {formatNumber(contadores[i], i)}
              </p>
              <p className="text-sm mt-2 text-white/80 font-medium">
                {stat.etiqueta}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}