import { motion } from "framer-motion";
import { Sparkles, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Venus Spa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-venus-forest/90 via-venus-forest/85 to-venus-forest/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-venus-cream/20 backdrop-blur-sm border border-venus-cream/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-venus-cream" />
            <span className="text-venus-cream text-sm font-medium">
              Tratamientos Profesionales
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-venus-cream mb-6 leading-tight"
          >
            Tu{" "}
            <span className="text-gradient-venus bg-gradient-to-r from-venus-sage to-venus-cream bg-clip-text text-transparent">
              belleza
            </span>
            , nuestra pasión
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-venus-cream/80 mb-10 max-w-2xl mx-auto"
          >
            Transformaciones reales, resultados visibles. Descubre los
            tratamientos personalizados que han cambiado la vida de cientos de
            clientas.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
          >
            {[
              { value: "+500", label: "Clientas felices" },
              {
                value: (
                  <span className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-venus-cream text-venus-cream"
                      />
                    ))}
                  </span>
                ),
                label: "En Google",
              },
              { value: "8+", label: "Años experiencia" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-venus-cream mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-venus-cream/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl">
              <Calendar className="w-5 h-5" />
              Agendar Cita
            </Button>
            <Button variant="heroOutline" size="xl">
              Ver Servicios
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-venus-cream/40 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-venus-cream/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
