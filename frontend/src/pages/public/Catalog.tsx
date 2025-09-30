import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Calendar, User } from "lucide-react";
import { useGetBooks } from "@/lib/api/books";

export default function BookCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { books, isLoading } = useGetBooks();

  const categories = ["Semua", ...new Set(books.map((book) => book.category))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "Semua" ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-4 text-gradient">
          Katalog Buku
        </h1>
        <p className="text-muted-foreground text-lg">
          Jelajahi koleksi buku perpustakaan digital kami
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari judul buku atau nama penulis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category ||
                (selectedCategory === "" && category === "Semua")
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() =>
                setSelectedCategory(category === "Semua" ? "" : category)
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Menampilkan {filteredBooks.length} dari {books.length} buku
        </p>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Card
            key={book.id}
            className="shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader className="pb-3">
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg font-serif line-clamp-2">
                {book.title}
              </CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <User className="h-3 w-3 mr-1" />
                    {book.author}
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    {book.publishYear}
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <Badge variant="secondary">{book.category}</Badge>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Tersedia: {book.availableCopies}/{book.totalCopies}
                  </span>
                  <Badge
                    variant={
                      book.availableCopies > 0 ? "default" : "destructive"
                    }
                  >
                    {book.availableCopies > 0 ? "Tersedia" : "Habis"}
                  </Badge>
                </div>
                <Button asChild className="w-full" size="sm">
                  <Link to={`/books/${book.id}`}>Lihat Detail</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-serif font-semibold mb-2">
            Buku tidak ditemukan
          </h3>
          <p className="text-muted-foreground">
            Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.
          </p>
        </div>
      )}
    </div>
  );
}
