import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-gold" />
              <span className="font-bold text-xl">Perpuslib</span>
            </Link>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Sistem manajemen perpustakaan modern yang memudahkan pengelolaan koleksi buku, 
              anggota, dan transaksi peminjaman dengan interface yang intuitif.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-gold" />
                <span>Jl. Pendidikan No. 123, Jakarta</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gold" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gold" />
                <span>info@perpuslib.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gold">Menu Utama</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-gold transition-colors text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-primary-foreground/80 hover:text-gold transition-colors text-sm">
                  Katalog Buku
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-primary-foreground/80 hover:text-gold transition-colors text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-primary-foreground/80 hover:text-gold transition-colors text-sm">
                  Daftar
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-gold">Layanan</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80 text-sm">Peminjaman Buku</li>
              <li className="text-primary-foreground/80 text-sm">Manajemen Anggota</li>
              <li className="text-primary-foreground/80 text-sm">Statistik & Laporan</li>
              <li className="text-primary-foreground/80 text-sm">Katalog Digital</li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-primary-light" />
        
        <div className="text-center text-sm text-primary-foreground/60">
          <p>&copy; 2024 Perpuslib. Dikembangkan dengan ❤️ untuk perpustakaan modern.</p>
        </div>
      </div>
    </footer>
  );
};