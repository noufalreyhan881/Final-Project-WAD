import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, BookOpen, Calendar, User, Building, MapPin, Hash } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Mock data - dalam aplikasi nyata, ini akan diambil dari API berdasarkan ID
const mockBookDetail = {
  id: '1',
  title: 'Belajar React dan TypeScript',
  author: 'John Doe',
  isbn: '978-0-123456-78-9',
  publisher: 'Tech Publisher',
  publishYear: 2023,
  category: 'Teknologi',
  description: `Panduan lengkap mempelajari React dan TypeScript untuk pengembangan web modern. 
  
  Buku ini mengcover semua aspek penting dalam pengembangan aplikasi web menggunakan React dengan TypeScript, mulai dari konsep dasar hingga teknik-teknik advanced.
  
  Materi yang dibahas:
  • Pengenalan React dan TypeScript
  • Component-based Architecture
  • State Management dengan Redux Toolkit
  • Testing dengan Jest dan React Testing Library
  • Performance Optimization
  • Deployment ke Production
  
  Cocok untuk developer pemula hingga menengah yang ingin menguasai stack teknologi modern untuk web development.`,
  cover: null,
  totalCopies: 10,
  availableCopies: 5,
  location: 'Rak A - Lantai 2',
  addedDate: '2024-01-15',
};

export default function BookDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  // Dalam aplikasi nyata, gunakan ID untuk fetch data dari API
  const book = mockBookDetail;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/books" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Katalog
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="lg:col-span-1">
          <Card className="shadow-medium">
            <CardContent className="p-6">
              <div className="w-full h-80 bg-muted rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-20 w-20 text-muted-foreground" />
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <Badge variant={book.availableCopies > 0 ? 'default' : 'destructive'} className="text-sm">
                    {book.availableCopies > 0 ? 'Tersedia untuk Dipinjam' : 'Sedang Tidak Tersedia'}
                  </Badge>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Tersedia: {book.availableCopies} dari {book.totalCopies} eksemplar</p>
                </div>

                {isAuthenticated && book.availableCopies > 0 && (
                  <Button className="w-full bg-gradient-primary">
                    Ajukan Peminjaman
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2">
          <Card className="shadow-medium">
            <CardHeader>
              <div className="space-y-2">
                <Badge variant="secondary">{book.category}</Badge>
                <CardTitle className="text-3xl font-serif">{book.title}</CardTitle>
                <CardDescription className="text-lg">oleh {book.author}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Book Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Hash className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">ISBN:</span>
                    <span className="ml-2">{book.isbn}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Penerbit:</span>
                    <span className="ml-2">{book.publisher}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Tahun Terbit:</span>
                    <span className="ml-2">{book.publishYear}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Lokasi:</span>
                    <span className="ml-2">{book.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Ditambahkan:</span>
                    <span className="ml-2">{new Date(book.addedDate).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="text-lg font-serif font-semibold mb-3">Deskripsi</h3>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {book.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {!isAuthenticated && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-center text-muted-foreground">
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Masuk
                    </Link>
                    {' '}atau{' '}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      daftar
                    </Link>
                    {' '}untuk meminjam buku ini
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}