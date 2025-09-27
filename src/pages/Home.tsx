import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, TrendingUp, Clock, Search, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Home = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-gold" />,
      title: "Katalog Digital",
      description: "Cari dan jelajahi koleksi buku dengan mudah menggunakan sistem pencarian yang canggih"
    },
    {
      icon: <Users className="h-8 w-8 text-gold" />,
      title: "Manajemen Anggota",
      description: "Kelola data anggota perpustakaan dengan sistem yang terintegrasi dan efisien"
    },
    {
      icon: <Clock className="h-8 w-8 text-gold" />,
      title: "Peminjaman Real-time",
      description: "Proses peminjaman dan pengembalian buku yang cepat dan akurat"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-gold" />,
      title: "Statistik & Laporan",
      description: "Dapatkan insights mendalam tentang aktivitas perpustakaan Anda"
    },
    {
      icon: <Shield className="h-8 w-8 text-gold" />,
      title: "Keamanan Terjamin",
      description: "Sistem autentikasi yang aman dengan role-based access control"
    },
    {
      icon: <Zap className="h-8 w-8 text-gold" />,
      title: "Performa Tinggi",
      description: "Interface yang responsif dan cepat untuk pengalaman pengguna yang optimal"
    }
  ];

  const stats = [
    { label: "Total Buku", value: "10,000+", icon: <BookOpen className="h-6 w-6 text-gold" /> },
    { label: "Anggota Aktif", value: "1,500+", icon: <Users className="h-6 w-6 text-gold" /> },
    { label: "Peminjaman/Bulan", value: "2,800+", icon: <TrendingUp className="h-6 w-6 text-gold" /> },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-primary/90" />
        <div className="relative container text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Kelola Perpustakaan
            <br />
            <span className="text-gold">Modern & Efisien</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Sistem manajemen perpustakaan yang komprehensif untuk mengelola koleksi buku, 
            anggota, dan transaksi dengan mudah dan efektif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="gold" asChild>
              <Link to="/catalog">Jelajahi Katalog</Link>
            </Button>
            <Button size="xl" variant="library" asChild>
              <Link to="/register">Daftar Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Fitur Lengkap untuk Perpustakaan Modern
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dilengkapi dengan berbagai fitur canggih yang dirancang khusus untuk kebutuhan perpustakaan digital
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-gold transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap untuk Modernisasi Perpustakaan Anda?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ratusan perpustakaan yang telah merasakan kemudahan sistem kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="gold" asChild>
              <Link to="/register">Mulai Gratis</Link>
            </Button>
            <Button size="xl" variant="library" asChild>
              <Link to="/login">Sudah Punya Akun?</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};