// components/hero/HeroTabs.jsx
import {
  Calendar,
  CreditCard,
  Star,
  ChevronRight,
  MapPin,
  Clock,
  HeartHandshake,
  DollarSign,
  Smartphone,
  FileText,
  ShieldCheck,
  Gem,
  Wallet,
} from "lucide-react";

export default function HeroTabs({ activeTab }) {
  switch (activeTab) {
    case "inicio":
      return (
        <div className="text-center">
          <HeartHandshake className="w-20 h-20 text-white mx-auto mb-4" />
          <h1 className="text-5xl sm:text-6xl font-light text-white drop-shadow-lg mb-4">
            HM Mobility
          </h1>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-sm mb-8">
            Más que un viaje, una experiencia confiable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const formSection = document.getElementById("formulario");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="cursor-pointer bg-blue-700 hover:bg-blue-600 text-white px-5 py-3 rounded-full border border-white/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Reservar Ahora <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-6 flex gap-3 justify-center text-sm">
            <div className="flex items-center gap-1 text-white/80">
              <Clock className="w-4 h-4" />
              Disponible 24/7
            </div>
            <div className="flex items-center gap-1 text-white/80">
              <MapPin className="w-4 h-4" />
              Cobertura nacional
            </div>
          </div>
        </div>
      );

    case "reservar":
      return (
        <div className="text-center">
          <Calendar className="w-15 h-15 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-light text-white mb-6">
            ¿Cómo Reservar?
          </h2>
          <div className="space-y-4 text-white/90">
            {[
              {
                title: "Solicita tu cotización",
                desc: "Llena el formulario con los detalles de tu viaje",
              },
              {
                title: "Envia tu cotización",
                desc: "La información será enviada al conductor",
              },
              {
                title: "Confirmación del viaje",
                desc: "El conductor te contactará para confirmar el costo del viaje",
              },
              {
                title: "¡Listo para viajar!",
                desc: "Una vez confirmado, disfruta de tu viaje con nosotros",
              },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>
                <div className="text-left">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-white/70">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "pagos":
      return (
        <div className="text-center">
          <CreditCard className="w-15 h-15 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-light text-white mb-6">
            Métodos de Pago
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: <CreditCard className="w-5 h-5 text-white" />,
                title: "Tarjetas",
                desc: "Débito y Crédito",
                color: "bg-blue-500/30",
              },
              {
                icon: <DollarSign className="w-5 h-5 text-white" />,
                title: "Efectivo",
                desc: "Pago directo",
                color: "bg-green-500/30",
              },
              {
                icon: <Smartphone className="w-5 h-5 text-white" />,
                title: "Transferencia",
                desc: "Bancaria digital",
                color: "bg-purple-500/30",
              },
              {
                icon: <FileText className="w-5 h-5 text-white" />,
                title: "Facturación",
                desc: "Para empresas",
                color: "bg-orange-500/30",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-black/10 p-4 rounded-xl border border-white/40"
              >
                <div
                  className={`w-8 h-8 ${item.color} rounded-full mx-auto mb-2 flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-white/70 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <img src="/visa.svg" alt="Visa" className="h-10" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-10" />
            <img src="/mercadopago.svg" alt="MercadoPago" className="h-10" />
          </div>
        </div>
      );

    case "beneficios":
      return (
        <div className="text-center">
          <Star className="w-15 h-15 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-light text-white mb-6">
            Nuestros Beneficios
          </h2>
          <div className="space-y-3">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5 text-white" />,
                color: "bg-blue-500/30",
                title: "Viajes Seguros",
                desc: "Conductores certificados y vehículos revisados",
              },
              {
                icon: <Clock className="w-5 h-5 text-white" />,
                color: "bg-green-500/30",
                title: "Puntualidad",
                desc: "Llegamos siempre a tiempo",
              },
              {
                icon: <Gem className="w-5 h-5 text-white" />,
                color: "bg-purple-500/30",
                title: "Servicio Premium",
                desc: "Comodidad y atención personalizada",
              },
              {
                icon: <Wallet className="w-5 h-5 text-white" />,
                color: "bg-orange-500/30",
                title: "Precios Justos",
                desc: "Tarifas transparentes sin sorpresas",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-black/10 p-3 rounded-lg border border-white/40 flex items-center gap-3"
              >
                <div
                  className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-white/70 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}
