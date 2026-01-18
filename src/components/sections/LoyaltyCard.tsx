import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, QrCode, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import venusLogo from "@/assets/venus-logo.png";

interface LoyaltyCardProps {
  stamps?: number;
  totalStamps?: number;
  clientName?: string;
}

export const LoyaltyCard = ({
  stamps = 6,
  totalStamps = 8,
  clientName = "María García",
}: LoyaltyCardProps) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <section id="lealtad" className="py-24 hero-gradient">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-venus-cream/20 text-venus-cream text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Programa de Lealtad
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-venus-cream mb-4">
            Tu tarjeta de fidelidad
          </h2>
          <p className="text-venus-cream/70 max-w-xl mx-auto">
            Acumula sellos con cada visita y obtén un servicio gratis al
            completar tu tarjeta.
          </p>
        </motion.div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          {/* Loyalty Card */}
          <div className="relative bg-gradient-to-br from-venus-cream to-venus-cream-dark rounded-3xl p-6 shadow-elevated">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={venusLogo}
                  alt="Venus"
                  className="w-12 h-12 rounded-xl"
                />
                <div>
                  <h3 className="font-playfair text-lg font-semibold text-venus-forest">
                    Venus Lealtad
                  </h3>
                  <p className="text-sm text-venus-olive-dark">{clientName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowQR(!showQR)}
                className="p-2 rounded-xl bg-venus-forest/10 hover:bg-venus-forest/20 transition-colors"
              >
                {showQR ? (
                  <X className="w-5 h-5 text-venus-forest" />
                ) : (
                  <QrCode className="w-5 h-5 text-venus-forest" />
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
                  {[...Array(totalStamps)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${index < stamps
                          ? "bg-venus-olive shadow-md"
                          : "bg-venus-forest/10 border-2 border-dashed border-venus-forest/30"
                        }`}
                    >
                      {index < stamps ? (
                        <Check className="w-6 h-6 text-venus-cream" />
                      ) : (
                        <span className="text-xs text-venus-forest/40 font-semibold">
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
                  className="flex items-center justify-center py-8 mb-6"
                >
                  <div className="w-40 h-40 bg-venus-forest rounded-2xl flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-venus-cream" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-venus-forest/70">Tu progreso</span>
                <span className="font-semibold text-venus-forest">
                  {stamps}/{totalStamps} sellos
                </span>
              </div>
              <div className="h-3 bg-venus-forest/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stamps / totalStamps) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-venus-olive to-venus-sage rounded-full"
                />
              </div>
            </div>

            {/* Reward Info */}
            <div className="p-4 bg-venus-forest/5 rounded-xl">
              <p className="text-sm text-venus-forest text-center">
                {stamps === totalStamps ? (
                  <span className="font-semibold">
                    🎉 ¡Felicidades! Tu próximo servicio es gratis
                  </span>
                ) : (
                  <>
                    Te faltan{" "}
                    <span className="font-semibold">
                      {totalStamps - stamps} sellos
                    </span>{" "}
                    para tu servicio gratis
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <Button variant="hero" size="lg" className="w-full">
              <Gift className="w-5 h-5" />
              Agregar a Google Wallet
            </Button>
            <Button variant="hero" size="lg" className="w-full mt-2">
              <Gift className="w-5 h-5" />
              Agregar a Apple Wallet
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
