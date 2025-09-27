import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        <div className="space-y-4">
          <div className="flex justify-center">
            <BookOpen className="h-16 w-16 text-gold" />
          </div>
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-primary">Halaman Tidak Ditemukan</h2>
          <p className="text-muted-foreground">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah dipindahkan atau tidak lagi tersedia.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/catalog">
              <Search className="h-4 w-4 mr-2" />
              Jelajahi Katalog
            </Link>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          URL yang dicoba: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
