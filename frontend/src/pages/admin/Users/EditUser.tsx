import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit } from 'lucide-react';

export default function EditMember() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+62 812-3456-7890',
    address: 'Jl. Example No. 123',
  });

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
          <h1 className="text-3xl font-serif font-bold text-gradient">Edit Anggota</h1>
          <p className="text-muted-foreground">Perbarui informasi anggota</p>
        </div>
      </div>

      <Card className="max-w-2xl shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Edit className="h-5 w-5 mr-2" />
            Edit Informasi Anggota
          </CardTitle>
          <CardDescription>Perbarui detail informasi anggota</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" value={formData.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={formData.email} readOnly />
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <Button variant="outline" asChild>
                <Link to="/admin/members">Batal</Link>
              </Button>
              <Button className="bg-gradient-primary">Simpan Perubahan</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}