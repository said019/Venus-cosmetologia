import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import serviceFacial from "@/assets/service-facial.jpg";
import serviceMassage from "@/assets/service-massage.jpg";
import serviceNails from "@/assets/service-nails.jpg";

const services = [
  {
    title: "Tratamientos Faciales",
    description:
      "Limpieza profunda, rejuvenecimiento y cuidado personalizado para tu piel.",
    image: serviceFacial,
    price: "Desde $45",
  },
  {
    title: "Masajes Relajantes",
    description:
      "Libera tensiones y renueva tu energía con nuestros masajes terapéuticos.",
    image: serviceMassage,
    price: "Desde $60",
  },
  {
    title: "Manicure & Pedicure",
    description:
      "Diseños únicos y cuidado premium para tus manos y pies.",
    image: serviceNails,
    price: "Desde $25",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-4">
            Experiencias de belleza únicas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada tratamiento está diseñado para realzar tu belleza natural con
            productos premium y técnicas profesionales.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-venus hover:shadow-elevated transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-venus-forest/80 to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-venus-cream text-venus-forest text-sm font-semibold">
                  {service.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <button className="inline-flex items-center gap-2 text-primary font-medium text-sm group/btn">
                  Ver más
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
