import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, User } from 'lucide-react';

export default function AddMember() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipType: 'regular',
    initialPassword: '',
  });

  const membershipTypes = [
    { value: 'regular', label: 'Anggota Regular' },
    { value: 'student', label: 'Mahasiswa/Pelajar' },
    { value: 'premium', label: 'Anggota Premium' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateMembershipNumber = () => {
    // Generate membership number (M + timestamp)
    const timestamp = Date.now().toString().slice(-6);
    return `M${timestamp}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error('Harap lengkapi semua field yang wajib diisi');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Format email tidak valid');
      }

      // Generate membership number
      const membershipNumber = generateMembershipNumber();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Anggota berhasil didaftarkan',
        description: `${formData.name} telah terdaftar dengan nomor anggota ${membershipNumber}.`,
      });

      navigate('/admin/members');
    } catch (error) {
      toast({
        title: 'Gagal mendaftarkan anggota',
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
          <Link to="/admin/members" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient">
            Tambah Anggota Baru
          </h1>
          <p className="text-muted-foreground">
            Daftarkan anggota baru perpustakaan
          </p>
        </div>
      </div>

      <Card className="max-w-2xl shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Informasi Anggota
          </CardTitle>
          <CardDescription>
            Masukkan detail informasi anggota baru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nama Lengkap <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Nomor Telepon <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+62 812-3456-7890"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="membershipType">
                  Jenis Keanggotaan <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange('membershipType', value)} defaultValue="regular">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis keanggotaan" />
                  </SelectTrigger>
                  <SelectContent>
                    {membershipTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Input
                id="address"
                placeholder="Alamat lengkap"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialPassword">
                Password Awal <span className="text-destructive">*</span>
              </Label>
              <Input
                id="initialPassword"
                type="password"
                placeholder="Password untuk akun anggota"
                value={formData.initialPassword}
                onChange={(e) => handleInputChange('initialPassword', e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Password ini akan digunakan anggota untuk login pertama kali. Anggota dapat mengubahnya nanti.
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Informasi Keanggotaan</h4>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    <li>• Nomor anggota akan dibuat otomatis setelah pendaftaran</li>
                    <li>• Anggota akan mendapat akses ke sistem perpustakaan digital</li>
                    <li>• Status keanggotaan: Aktif (dapat langsung meminjam buku)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button variant="outline" type="button" asChild>
                <Link to="/admin/members">Batal</Link>
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-primary"
              >
                {isSubmitting ? 'Mendaftarkan...' : 'Daftarkan Anggota'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}