// src/components/stats/Stats.jsx

export default function Stats() {
  const datos = [
    { valor: "4.97", etiqueta: "Calificación promedio" },
    { valor: "26,100", etiqueta: "Valoraciones de 5 estrellas" },
    { valor: "99%", etiqueta: "Tasa de puntualidad" },
    { valor: "300k", etiqueta: "Kilómetros recorridos" },
    { valor: "100%", etiqueta: "Trayectos seguros" },
    { valor: "9 años", etiqueta: "De experiencia" },
    { valor: "29,850", etiqueta: "Viajes completados" },
    { valor: "19,900", etiqueta: "Clientes satisfechos" },
  ];

  return (
    <section
      id="experiencia"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-[url('/mexico.jpg')] bg-cover bg-center bg-no-repeat bg-fixed py-16"
    >
      <div className="max-w-6xl w-full px-4 sm:px-10 py-10 rounded-3xl bg-black/30 backdrop-blur-md shadow-xl border border-white/20">
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-10 text-center">
          Nuestra Experiencia Habla
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {datos.map((stat, i) => (
            <div
              key={i}
              className="bg-black/10 text-white border border-white/40 p-6 rounded-xl text-center"
            >
              <p className="text-3xl font-bold text-neutral-100">{stat.valor}</p>
              <p className="text-sm mt-2 text-white/80 font-medium">
                {stat.etiqueta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}