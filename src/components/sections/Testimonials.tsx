import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carolina Méndez",
    role: "Cliente frecuente",
    content:
      "Los mejores tratamientos faciales que he probado. Mi piel nunca se había visto tan radiante. ¡El equipo es increíble!",
    rating: 5,
  },
  {
    name: "Ana Rodríguez",
    role: "Cliente desde 2022",
    content:
      "El programa de lealtad es genial. Ya gané 3 servicios gratis y la atención siempre es de primera.",
    rating: 5,
  },
  {
    name: "Laura Fernández",
    role: "Cliente VIP",
    content:
      "El ambiente es súper relajante y los resultados hablan por sí solos. Totalmente recomendado.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonios" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonios
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-4">
            Lo que dicen nuestras clientas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Historias reales de transformaciones y experiencias únicas en Venus
            Cosmetología.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative bg-card rounded-2xl p-6 shadow-venus"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-venus-olive text-venus-olive"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-card-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-venus-olive to-venus-sage flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-card-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
