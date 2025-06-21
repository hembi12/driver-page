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

const iconos = [
  <ThumbsUp className="w-6 h-6 text-green-400 mx-auto" />, // Calificación promedio
  <Star className="w-6 h-6 text-yellow-400 mx-auto" />, // Valoraciones
  <Clock className="w-6 h-6 text-blue-400 mx-auto" />, // Puntualidad
  <Map className="w-6 h-6 text-purple-400 mx-auto" />, // KM recorridos
  <ShieldCheck className="w-6 h-6 text-cyan-400 mx-auto" />, // Trayectos seguros
  <Award className="w-6 h-6 text-pink-400 mx-auto" />, // Experiencia
  <Send className="w-6 h-6 text-orange-400 mx-auto" />, // Viajes completados
  <Smile className="w-6 h-6 text-teal-400 mx-auto" />, // Clientes satisfechos
];

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
          if (actual >= meta) return meta;
          const incremento = Math.ceil(meta / 60);
          return Math.min(actual + incremento, meta);
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (valor, i) => {
    const stat = datos[i];
    if (stat.esDecimal) return valor.toFixed(2);
    if (stat.esPorcentaje) return `${valor}%`;
    if (stat.sufijo) return `${valor}${stat.sufijo}`;
    return valor.toLocaleString();
  };

  return (
    <div className="max-w-6xl w-full px-4 sm:px-10 py-10 rounded-3xl bg-black/30 backdrop-blur-md shadow-xl border border-white/20">
      <h2
        id="stats-title"
        className="text-white text-2xl sm:text-3xl font-bold mb-10 text-center"
      >
        Nuestra Experiencia Habla
      </h2>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        role="list"
      >
        {datos.map((stat, i) => (
          <div
            key={i}
            role="listitem"
            className="bg-black/10 text-white border border-white/40 p-6 rounded-xl text-center"
          >
            <div>{iconos[i]}</div>
            <p className="text-2xl font-bold text-neutral-100 mt-2">
              {formatNumber(contadores[i], i)}
            </p>
            <p className="text-sm mt-2 text-white/80 font-medium">
              {stat.etiqueta}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}