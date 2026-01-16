import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import venusLogo from "@/assets/venus-logo.png";
import { toast } from "sonner";

const ClientLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("¡Bienvenida de vuelta!");
    navigate("/mi-tarjeta");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
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
              Bienvenida de vuelta
            </h1>
            <p className="text-venus-olive-dark text-sm">
              Ingresa para ver tu tarjeta de lealtad
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-venus-forest">
                  Contraseña
                </Label>
                <Link 
                  to="/recuperar" 
                  className="text-xs text-venus-olive hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
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

            <Button
              type="submit"
              className="w-full bg-venus-olive hover:bg-venus-olive-dark text-venus-cream"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-venus-cream/30 border-t-venus-cream rounded-full animate-spin" />
              ) : (
                <>
                  Ingresar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-venus-forest/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-venus-cream text-venus-olive-dark">
                ¿No tienes cuenta?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Link to="/registro">
            <Button
              variant="outline"
              className="w-full border-venus-forest/20 text-venus-forest hover:bg-venus-forest/5"
            >
              Crear cuenta nueva
            </Button>
          </Link>
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

export default ClientLogin;
