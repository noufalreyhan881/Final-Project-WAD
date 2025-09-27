import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Filter, Eye, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

// Dummy data untuk demo
const dummyBooks = [
  {
    id: 1,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    isbn: "978-0596517748",
    category: "Programming",
    publisher: "O'Reilly Media",
    year: 2008,
    pages: 176,
    available: true,
    stock: 3,
    location: "A-001",
    description: "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad..."
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Programming",
    publisher: "Prentice Hall",
    year: 2008,
    pages: 464,
    available: true,
    stock: 5,
    location: "A-002",
    description: "A Handbook of Agile Software Craftsmanship. Even bad code can function. But if code isn't clean, it can bring a development organization to its knees."
  },
  {
    id: 3,
    title: "The Art of Computer Programming Vol 1",
    author: "Donald E. Knuth",
    isbn: "978-0201896831",
    category: "Computer Science",
    publisher: "Addison-Wesley",
    year: 1997,
    pages: 672,
    available: false,
    stock: 0,
    location: "B-001",
    description: "This multivolume work on the analysis of algorithms has long been recognized as the definitive description of classical computer science."
  },
  {
    id: 4,
    title: "Design Patterns",
    author: "Gang of Four",
    isbn: "978-0201633610",
    category: "Programming",
    publisher: "Addison-Wesley",
    year: 1994,
    pages: 395,
    available: true,
    stock: 2,
    location: "A-003",
    description: "Elements of Reusable Object-Oriented Software. Capturing a wealth of experience about the design of object-oriented software."
  },
  {
    id: 5,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "978-0262033848",
    category: "Computer Science",
    publisher: "MIT Press",
    year: 2009,
    pages: 1312,
    available: true,
    stock: 4,
    location: "B-002",
    description: "A comprehensive textbook covering the full spectrum of modern algorithms: from the fastest algorithms and data structures..."
  },
  {
    id: 6,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    isbn: "978-1491924464",
    category: "Programming",
    publisher: "O'Reilly Media",
    year: 2015,
    pages: 278,
    available: true,
    stock: 6,
    location: "A-004",
    description: "Up & Going. Are you new to programming? If so, this book is for you. This book will teach you about programming in general..."
  }
];

const categories = ["Semua", "Programming", "Computer Science", "Web Development", "Database"];

export const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [filteredBooks, setFilteredBooks] = useState(dummyBooks);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBooks(query, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterBooks(searchQuery, category);
  };

  const filterBooks = (query: string, category: string) => {
    let filtered = dummyBooks;

    if (query) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.includes(query)
      );
    }

    if (category !== "Semua") {
      filtered = filtered.filter(book => book.category === category);
    }

    setFilteredBooks(filtered);
  };

  return (
    <Layout>
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Katalog Buku</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Jelajahi koleksi buku perpustakaan kami. Temukan buku favorit Anda dengan mudah.
          </p>
        </div>

        {/* Search & Filter */}
        <Card className="shadow-card">
          <CardContent className="pt-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan judul, penulis, atau ISBN..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4 mr-2" />
                Kategori:
              </span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              Menampilkan {filteredBooks.length} dari {dummyBooks.length} buku
            </div>
          </CardContent>
        </Card>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card 
              key={book.id} 
              className="shadow-card hover:shadow-gold transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={book.available ? "default" : "destructive"}>
                    {book.available ? `Tersedia (${book.stock})` : "Tidak Tersedia"}
                  </Badge>
                  <Badge variant="outline">{book.category}</Badge>
                </div>
                <CardTitle className="text-primary line-clamp-2">{book.title}</CardTitle>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {book.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {book.publisher} • {book.year}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {book.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                  <div>ISBN: {book.isbn}</div>
                  <div>Hal: {book.pages}</div>
                  <div>Lokasi: {book.location}</div>
                  <div>Stok: {book.stock}</div>
                </div>

                <Button 
                  variant="hero" 
                  className="w-full" 
                  asChild
                >
                  <Link to={`/catalog/${book.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Lihat Detail
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="pt-6 text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Tidak ada buku yang ditemukan
              </h3>
              <p className="text-muted-foreground">
                Coba gunakan kata kunci yang berbeda atau ubah filter kategori
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};