import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Edit, Eye, Trash2, BookOpen } from 'lucide-react';

// Mock data untuk buku
const mockBooks = [
  {
    id: '1',
    title: 'Belajar React dan TypeScript',
    author: 'John Doe',
    isbn: '978-0-123456-78-9',
    category: 'Teknologi',
    totalCopies: 10,
    availableCopies: 5,
    addedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Filosofi Hidup Sederhana',
    author: 'Jane Smith',
    isbn: '978-0-123456-79-6',
    category: 'Filosofi',
    totalCopies: 8,
    availableCopies: 3,
    addedDate: '2024-01-10',
  },
  {
    id: '3',
    title: 'Sejarah Nusantara',
    author: 'Ahmad Rahman',
    isbn: '978-0-123456-80-2',
    category: 'Sejarah',
    totalCopies: 12,
    availableCopies: 7,
    addedDate: '2024-01-05',
  },
];

export default function BookManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Semua', ...new Set(mockBooks.map(book => book.category))];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Semua' || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient">
            Manajemen Buku
          </h1>
          <p className="text-muted-foreground">
            Kelola koleksi buku perpustakaan
          </p>
        </div>
        <Button asChild className="bg-gradient-primary">
          <Link to="/admin/books/add" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Buku
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari judul, penulis, atau ISBN..."
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
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{mockBooks.length}</p>
                <p className="text-sm text-muted-foreground">Total Buku</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-success mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {mockBooks.reduce((sum, book) => sum + book.availableCopies, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Tersedia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-warning mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {mockBooks.reduce((sum, book) => sum + (book.totalCopies - book.availableCopies), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Dipinjam</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Books Table */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Daftar Buku</CardTitle>
          <CardDescription>
            Menampilkan {filteredBooks.length} dari {mockBooks.length} buku
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul & Penulis</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{book.title}</p>
                        <p className="text-sm text-muted-foreground">oleh {book.author}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{book.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{book.availableCopies} / {book.totalCopies}</p>
                        <p className="text-muted-foreground">tersedia / total</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={book.availableCopies > 0 ? 'default' : 'destructive'}>
                        {book.availableCopies > 0 ? 'Tersedia' : 'Habis'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/books/${book.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/books/${book.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2">Tidak ada buku ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah kata kunci pencarian atau filter kategori.
              </p>
              <Button asChild>
                <Link to="/admin/books/add">Tambah Buku Pertama</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}