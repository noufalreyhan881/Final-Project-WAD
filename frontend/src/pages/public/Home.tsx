import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Search, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ApiTest } from "@/components/ApiTest";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: "Koleksi Lengkap",
      description:
        "Akses ribuan buku dari berbagai kategori dan genre untuk memenuhi kebutuhan baca Anda.",
    },
    {
      icon: Search,
      title: "Pencarian Mudah",
      description:
        "Temukan buku yang Anda cari dengan sistem pencarian yang canggih dan filter yang detail.",
    },
    {
      icon: Users,
      title: "Komunitas Pembaca",
      description:
        "Bergabung dengan komunitas pembaca yang aktif dan berbagi pengalaman membaca.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Selamat Datang di
            <br />
            <span className="text-secondary-light">DigiLibrary</span>
          </h1>
          <ApiTest />
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Jelajahi dunia pengetahuan tanpa batas. Temukan, pinjam, dan nikmati
            ribuan koleksi buku terbaik dalam satu platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register" className="flex items-center">
                    Daftar Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
<<<<<<< HEAD
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link to="/books">Jelajahi Katalog</Link>
=======
                <Button size="lg" className="bg-sky-400 text-white hover:bg-sky-500 hover:text-white border border-sky-400">
                  <Link to="/books">
                    Jelajahi Katalog
                  </Link>
>>>>>>> 9e2666832e2ed3f9d508b8e9c3042491c9321f51
                </Button>
              </>
            ) : (
              <Button size="lg" variant="secondary" asChild>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/dashboard"}
                  className="flex items-center"
                >
                  Ke Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen memberikan pengalaman terbaik dalam mengakses dan
              mengelola koleksi perpustakaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Siap Memulai Petualangan Membaca?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pembaca lainnya dan nikmati akses
            unlimited ke koleksi terbaik kami.
          </p>
          <Button
            size="lg"
            className="bg-gradient-primary hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/books" className="flex items-center">
              Mulai Eksplorasi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
