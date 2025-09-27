import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulasi login - nanti akan dikoneksi dengan backend Laravel
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo: redirect berdasarkan email
      if (formData.email === "admin@perpuslib.com") {
        navigate('/admin/dashboard');
        toast({
          title: "Login berhasil!",
          description: "Selamat datang, Admin.",
        });
      } else {
        navigate('/member/dashboard');
        toast({
          title: "Login berhasil!",
          description: "Selamat datang kembali.",
        });
      }
    } catch (error) {
      toast({
        title: "Login gagal",
        description: "Email atau password salah. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle py-12 px-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-gold" />
              <span className="text-2xl font-bold text-primary">Perpuslib</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-primary">Masuk ke Akun Anda</CardTitle>
          <CardDescription>
            Masukkan email dan password untuk mengakses dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="contoh@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleInputChange}
                className="rounded border-gray-300"
              />
              <Label htmlFor="remember" className="text-sm">
                Ingat saya
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              variant="hero"
              disabled={isLoading}
            >
              {isLoading ? "Masuk..." : "Masuk"}
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link to="/register" className="text-primary hover:text-gold transition-colors font-medium">
                Daftar di sini
              </Link>
            </p>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Kembali ke beranda
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-2">Demo akun:</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="text-center">
                <strong>Admin:</strong> admin@perpuslib.com
              </div>
              <div className="text-center">
                <strong>Member:</strong> member@perpuslib.com
              </div>
              <div className="text-center">
                <strong>Password:</strong> password123
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};