import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Save, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual profile update API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      
      toast({
        title: 'Profil berhasil diperbarui',
        description: 'Informasi profil Anda telah disimpan.',
      });
      
      navigate('/dashboard/profile');
    } catch (error) {
      toast({
        title: 'Gagal memperbarui profil',
        description: 'Terjadi kesalahan saat menyimpan data.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard/profile">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold">Edit Profil</h1>
          <p className="text-muted-foreground">Perbarui informasi profil Anda</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
          <CardDescription>
            Perbarui detail informasi akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">
                  {getInitials(formData.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="avatar">Foto Profil</Label>
                <Button type="button" variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Ganti Foto
                </Button>
                <p className="text-sm text-muted-foreground">
                  JPG, GIF atau PNG. Maksimal 1MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {user?.membershipNumber && (
                <div className="space-y-2">
                  <Label htmlFor="membershipNumber">Nomor Anggota</Label>
                  <Input
                    id="membershipNumber"
                    value={user.membershipNumber}
                    disabled
                    className="bg-muted"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">Peran</Label>
                <Input
                  id="role"
                  value={user?.role === 'admin' ? 'Administrator' : 'Anggota'}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/dashboard/profile">
                  Batal
                </Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  'Menyimpan...'
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}