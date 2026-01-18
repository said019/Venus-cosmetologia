import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Gift,
  QrCode,
  X,
  Check,
  Calendar,
  Clock,
  User,
  LogOut,
  History,
  Sparkles,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import venusLogo from "@/assets/venus-logo.png";

interface CardData {
  id: string;
  name: string;
  phone: string;
  stamps: number;
  max: number;
  redeems: number;
  lastVisit: string | null;
  createdAt: string;
}

interface EventData {
  id: string;
  type: string;
  createdAt: string;
  serviceName?: string;
}

const MyCard = () => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos del localStorage
    const savedCard = localStorage.getItem('venus_card');
    if (!savedCard) {
      // Si no hay datos, redirigir al login
      navigate('/login');
      return;
    }

    try {
      const parsed = JSON.parse(savedCard);
      setCardData(parsed);

      // También cargar eventos si están disponibles
      const savedEvents = localStorage.getItem('venus_card_events');
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      navigate('/login');
    }

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('venus_card');
    localStorage.removeItem('venus_card_events');
    navigate('/');
  };

  // Datos del cliente (usar cardData o valores por defecto)
  const client = {
    name: cardData?.name || "Cliente",
    phone: cardData?.phone || "",
    stamps: cardData?.stamps || 0,
    totalStamps: cardData?.max || 8,
    memberSince: cardData?.createdAt
      ? new Date(cardData.createdAt).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
      : "2024",
    totalVisits: (cardData?.stamps || 0) + (cardData?.redeems || 0) * 8,
  };

  const visitHistory = events
    .filter(e => e.type === 'stamp' || e.type === 'redeem')
    .slice(0, 5)
    .map(e => ({
      date: new Date(e.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }),
      service: e.serviceName || (e.type === 'stamp' ? 'Servicio' : 'Canje de premio'),
      stampsEarned: e.type === 'stamp' ? 1 : 0
    }));

  if (loading) {
    return (
      <div className="min-h-screen bg-venus-forest flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-venus-cream/30 border-t-venus-cream rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-venus-forest">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-venus-forest/95 backdrop-blur-xl border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={venusLogo} alt="Venus" className="w-10 h-10 rounded-xl" />
            <span className="font-playfair text-venus-cream text-lg font-semibold">Venus</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-venus-cream/70 text-sm hidden sm:block">
              Hola, {client.name.split(' ')[0]}
            </span>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                <LogOut size={16} />
                <span className="hidden sm:inline ml-2">Salir</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-venus-cream mb-2">
            Mi Tarjeta de Lealtad
          </h1>
          <p className="text-venus-cream/60">
            Miembro desde {client.memberSince} • {client.totalVisits} visitas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Loyalty Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Loyalty Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-gradient-to-br from-venus-cream to-venus-cream-dark rounded-3xl p-6 shadow-elevated">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={venusLogo}
                      alt="Venus"
                      className="w-14 h-14 rounded-xl"
                    />
                    <div>
                      <h3 className="font-playfair text-xl font-semibold text-venus-forest">
                        Venus Lealtad
                      </h3>
                      <p className="text-sm text-venus-olive-dark">{client.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="p-3 rounded-xl bg-venus-forest/10 hover:bg-venus-forest/20 transition-colors"
                  >
                    {showQR ? (
                      <X className="w-6 h-6 text-venus-forest" />
                    ) : (
                      <QrCode className="w-6 h-6 text-venus-forest" />
                    )}
                  </button>
                </div>

                {/* Stamps Grid or QR */}
                <AnimatePresence mode="wait">
                  {!showQR ? (
                    <motion.div
                      key="stamps"
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -90 }}
                      className="grid grid-cols-5 gap-3 mb-6"
                    >
                      {[...Array(client.totalStamps)].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${index < client.stamps
                            ? "bg-venus-olive shadow-md"
                            : "bg-venus-forest/10 border-2 border-dashed border-venus-forest/30"
                            }`}
                        >
                          {index < client.stamps ? (
                            <Check className="w-7 h-7 text-venus-cream" />
                          ) : (
                            <span className="text-sm text-venus-forest/40 font-semibold">
                              {index + 1}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="qr"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      className="flex flex-col items-center justify-center py-8 mb-6"
                    >
                      <div className="w-48 h-48 bg-venus-forest rounded-2xl flex items-center justify-center mb-4">
                        <QrCode className="w-32 h-32 text-venus-cream" />
                      </div>
                      <p className="text-sm text-venus-forest/70 text-center">
                        Muestra este código en tu próxima visita
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-venus-forest/70">Tu progreso</span>
                    <span className="font-semibold text-venus-forest">
                      {client.stamps}/{client.totalStamps} sellos
                    </span>
                  </div>
                  <div className="h-4 bg-venus-forest/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(client.stamps / client.totalStamps) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-venus-olive to-venus-sage rounded-full"
                    />
                  </div>
                </div>

                {/* Reward Info */}
                <div className="p-4 bg-venus-forest/5 rounded-xl">
                  <p className="text-sm text-venus-forest text-center">
                    {client.stamps === client.totalStamps ? (
                      <span className="font-semibold">
                        🎉 ¡Felicidades! Tu próximo servicio es gratis
                      </span>
                    ) : (
                      <>
                        Te faltan{" "}
                        <span className="font-semibold">
                          {client.totalStamps - client.stamps} sellos
                        </span>{" "}
                        para tu servicio gratis
                      </>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Visit History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-venus-cream font-playfair flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Historial de Visitas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {visitHistory.map((visit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-venus-cream font-medium">{visit.service}</p>
                          <p className="text-venus-cream/60 text-sm">{visit.date}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                        +{visit.stampsEarned} sello
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-venus-cream font-playfair">
                    Acciones Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/#servicios">
                    <Button variant="outline" className="w-full justify-start border-white/10 text-venus-cream hover:bg-white/5">
                      <Calendar className="w-4 h-4 mr-3" />
                      Agendar Cita
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start border-white/10 text-venus-cream hover:bg-white/5">
                    <Gift className="w-4 h-4 mr-3" />
                    Agregar a Google Wallet
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/10 text-venus-cream hover:bg-white/5">
                    <Gift className="w-4 h-4 mr-3" />
                    Agregar a Apple Wallet
                  </Button>
                  <a href="https://wa.me/5214271234567" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start border-white/10 text-venus-cream hover:bg-white/5">
                      <Phone className="w-4 h-4 mr-3" />
                      Contactar por WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-venus-cream font-playfair flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Mi Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-venus-cream/60">Nombre</span>
                    <span className="text-venus-cream">{client.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-venus-cream/60">Teléfono</span>
                    <span className="text-venus-cream">{client.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-venus-cream/60">Miembro desde</span>
                    <span className="text-venus-cream">{client.memberSince}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-venus-cream mb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">Venus Spa & Beauty</span>
                  </div>
                  <p className="text-venus-cream/60 text-sm">
                    Blvd. Adolfo López Mateos 123, Centro
                    <br />
                    San Juan del Río, Qro. 76800
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-primary text-sm hover:underline"
                  >
                    Ver en Google Maps →
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyCard;
