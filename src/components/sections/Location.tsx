import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    content: "Av. Principal #123, Col. Centro",
    detail: "Ciudad, CP 12345",
  },
  {
    icon: Phone,
    title: "Teléfono",
    content: "+52 (123) 456-7890",
    detail: "WhatsApp disponible",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Sáb: 9:00 - 20:00",
    detail: "Domingo: Cerrado",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contacto@venus.com",
    detail: "Respuesta en 24hrs",
  },
];

export const Location = () => {
  return (
    <section id="ubicacion" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Encuéntranos
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-6">
              Visita nuestro spa
            </h2>
            <p className="text-muted-foreground mb-8">
              Te esperamos en un ambiente acogedor y profesional para brindarte
              la mejor experiencia de belleza.
            </p>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-card rounded-xl shadow-sm hover:shadow-venus transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground text-sm">
                        {info.title}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {info.content}
                      </p>
                      <p className="text-muted-foreground/70 text-xs">
                        {info.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="venus" size="lg">
              <MapPin className="w-5 h-5" />
              Cómo llegar
            </Button>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661234567890!2d-99.16869!3d19.42847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzQyLjUiTiA5OcKwMTAnMDcuMyJX!5e0!3m2!1ses!2smx!4v1234567890"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 p-4 bg-card rounded-2xl shadow-elevated max-w-xs hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-venus-olive to-venus-sage flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground text-sm">
                    A 5 min del metro
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Estacionamiento disponible
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
