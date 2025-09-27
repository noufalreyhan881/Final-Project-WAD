import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus } from 'lucide-react';

export default function AddBook() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publishYear: '',
    category: '',
    description: '',
    totalCopies: '',
    location: '',
  });

  const categories = [
    'Teknologi',
    'Filosofi',
    'Sejarah',
    'Fiksi',
    'Non-Fiksi',
    'Sains',
    'Ekonomi',
    'Politik',
    'Agama',
    'Seni',
    'Olahraga',
    'Kesehatan',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.author || !formData.isbn || !formData.category || !formData.totalCopies) {
        throw new Error('Harap lengkapi semua field yang wajib diisi');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Buku berhasil ditambahkan',
        description: `"${formData.title}" telah ditambahkan ke koleksi perpustakaan.`,
      });

      navigate('/admin/books');
    } catch (error) {
      toast({
        title: 'Gagal menambahkan buku',
        description: error instanceof Error ? error.message : 'Terjadi kesalahan, silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link to="/admin/books" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient">
            Tambah Buku Baru
          </h1>
          <p className="text-muted-foreground">
            Tambahkan buku baru ke koleksi perpustakaan
          </p>
        </div>
      </div>

      <Card className="max-w-4xl shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Informasi Buku
          </CardTitle>
          <CardDescription>
            Masukkan detail informasi buku yang akan ditambahkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Judul Buku <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul buku"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">
                  Penulis <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="author"
                  placeholder="Nama penulis"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="isbn">
                  ISBN <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="isbn"
                  placeholder="978-0-123456-78-9"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publisher">Penerbit</Label>
                <Input
                  id="publisher"
                  placeholder="Nama penerbit"
                  value={formData.publisher}
                  onChange={(e) => handleInputChange('publisher', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publishYear">Tahun Terbit</Label>
                <Input
                  id="publishYear"
                  type="number"
                  placeholder="2024"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.publishYear}
                  onChange={(e) => handleInputChange('publishYear', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Kategori <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange('category', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalCopies">
                  Jumlah Eksemplar <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="totalCopies"
                  type="number"
                  placeholder="1"
                  min="1"
                  value={formData.totalCopies}
                  onChange={(e) => handleInputChange('totalCopies', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi Rak</Label>
              <Input
                id="location"
                placeholder="Contoh: Rak A - Lantai 2"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Deskripsi singkat tentang buku..."
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button variant="outline" type="button" asChild>
                <Link to="/admin/books">Batal</Link>
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-primary"
              >
                {isSubmitting ? 'Menambahkan...' : 'Tambah Buku'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}