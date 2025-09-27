import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Calendar, User } from 'lucide-react';

// Mock data untuk demonstrasi
const mockBooks = [
  {
    id: '1',
    title: 'Belajar React dan TypeScript',
    author: 'John Doe',
    publisher: 'Tech Publisher',
    publishYear: 2023,
    category: 'Teknologi',
    availableCopies: 5,
    totalCopies: 10,
    cover: null,
    description: 'Panduan lengkap mempelajari React dan TypeScript untuk pengembangan web modern.'
  },
  {
    id: '2',
    title: 'Filosofi Hidup Sederhana',
    author: 'Jane Smith',
    publisher: 'Wisdom Books',
    publishYear: 2022,
    category: 'Filosofi',
    availableCopies: 3,
    totalCopies: 8,
    cover: null,
    description: 'Eksplorasi mendalam tentang filosofi hidup sederhana dan kebahagian sejati.'
  },
  {
    id: '3',
    title: 'Sejarah Nusantara',
    author: 'Ahmad Rahman',
    publisher: 'Historia Press',
    publishYear: 2021,
    category: 'Sejarah',
    availableCopies: 7,
    totalCopies: 12,
    cover: null,
    description: 'Perjalanan sejarah lengkap kepulauan Nusantara dari masa ke masa.'
  },
  {
    id: '4',
    title: 'Machine Learning Praktis',
    author: 'Dr. Sarah Chen',
    publisher: 'AI Publications',
    publishYear: 2023,
    category: 'Teknologi',
    availableCopies: 2,
    totalCopies: 6,
    cover: null,
    description: 'Implementasi praktis machine learning dalam berbagai bidang industri.'
  },
];

export default function BookCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Semua', ...new Set(mockBooks.map(book => book.category))];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Semua' || book.category === selectedCategory;
    
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
              variant={selectedCategory === category || (selectedCategory === '' && category === 'Semua') ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category === 'Semua' ? '' : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Menampilkan {filteredBooks.length} dari {mockBooks.length} buku
        </p>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg font-serif line-clamp-2">
                {book.title}
              </CardTitle>
              <CardDescription className="space-y-1">
                <div className="flex items-center text-sm">
                  <User className="h-3 w-3 mr-1" />
                  {book.author}
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  {book.publishYear}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <Badge variant="secondary">{book.category}</Badge>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Tersedia: {book.availableCopies}/{book.totalCopies}
                  </span>
                  <Badge variant={book.availableCopies > 0 ? 'default' : 'destructive'}>
                    {book.availableCopies > 0 ? 'Tersedia' : 'Habis'}
                  </Badge>
                </div>
                <Button asChild className="w-full" size="sm">
                  <Link to={`/books/${book.id}`}>
                    Lihat Detail
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-serif font-semibold mb-2">Buku tidak ditemukan</h3>
          <p className="text-muted-foreground">
            Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.
          </p>
        </div>
      )}
    </div>
  );
}