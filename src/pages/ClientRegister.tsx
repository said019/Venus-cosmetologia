import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Phone, Calendar, ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import venusLogo from "@/assets/venus-logo.png";
import { toast } from "sonner";

const ClientRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("¡Cuenta creada exitosamente! 🎉", {
      description: "Tu tarjeta de lealtad está lista"
    });
    navigate("/mi-tarjeta");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-venus-cream rounded-3xl p-8 shadow-elevated">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/">
              <img
                src={venusLogo}
                alt="Venus"
                className="w-16 h-16 mx-auto mb-4 rounded-xl"
              />
            </Link>
            <h1 className="font-playfair text-2xl font-bold text-venus-forest mb-2">
              Únete a Venus
            </h1>
            <p className="text-venus-olive-dark text-sm">
              Crea tu cuenta y empieza a acumular recompensas
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-venus-forest/5 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-venus-olive/20 rounded-lg">
                <Gift className="w-5 h-5 text-venus-olive" />
              </div>
              <div>
                <h3 className="font-semibold text-venus-forest text-sm">
                  Beneficios exclusivos
                </h3>
                <ul className="text-xs text-venus-olive-dark space-y-1 mt-1">
                  <li>• Acumula sellos con cada visita</li>
                  <li>• Servicio gratis al completar 10 sellos</li>
                  <li>• Sorpresa especial en tu cumpleaños</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-venus-forest">
                Nombre completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-venus-olive/50" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 bg-white border-venus-forest/20 focus:border-venus-olive"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-venus-forest">
                Correo electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-venus-olive/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-white border-venus-forest/20 focus:border-venus-olive"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-venus-forest">
                  Teléfono
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-venus-olive/50" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="427 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 bg-white border-venus-forest/20 focus:border-venus-olive"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-venus-forest">
                  Cumpleaños
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-venus-olive/50" />
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="pl-10 bg-white border-venus-forest/20 focus:border-venus-olive"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-venus-forest">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-venus-olive/50" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 bg-white border-venus-forest/20 focus:border-venus-olive"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-venus-olive/50 hover:text-venus-olive"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-venus-forest">
                Confirmar contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-venus-olive/50" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 bg-white border-venus-forest/20 focus:border-venus-olive"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-venus-olive hover:bg-venus-olive-dark text-venus-cream mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-venus-cream/30 border-t-venus-cream rounded-full animate-spin" />
              ) : (
                <>
                  Crear mi cuenta
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-venus-olive-dark mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-venus-olive font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link 
            to="/"
            className="text-venus-cream/70 hover:text-venus-cream text-sm transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientRegister;
