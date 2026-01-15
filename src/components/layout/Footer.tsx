import { Instagram, Facebook, MessageCircle, Heart } from "lucide-react";
import venusLogo from "@/assets/venus-logo.png";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
];

const footerLinks = [
  {
    title: "Servicios",
    links: ["Faciales", "Masajes", "Manicure", "Pedicure", "Depilación"],
  },
  {
    title: "Información",
    links: ["Sobre nosotros", "Galería", "Blog", "Trabaja con nosotros"],
  },
  {
    title: "Legal",
    links: ["Aviso de privacidad", "Términos de uso", "Políticas"],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-venus-forest text-venus-cream/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={venusLogo}
                alt="Venus"
                className="w-12 h-12 rounded-xl"
              />
              <span className="font-playfair text-2xl font-semibold text-venus-cream">
                Venus
              </span>
            </div>
            <p className="text-venus-cream/60 mb-6 max-w-sm">
              Tu destino de belleza y bienestar. Transformamos tu cuidado
              personal en una experiencia única.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg bg-venus-cream/10 hover:bg-venus-cream/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-venus-cream mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-venus-cream/60 hover:text-venus-cream transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-venus-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-venus-cream/50 text-sm">
            © {new Date().getFullYear()} Venus Cosmetología. Todos los derechos
            reservados.
          </p>
          <p className="text-venus-cream/50 text-sm flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 fill-venus-sage text-venus-sage" /> en
            México
          </p>
        </div>
      </div>
    </footer>
  );
};
