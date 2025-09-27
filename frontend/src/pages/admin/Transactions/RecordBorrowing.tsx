import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus } from 'lucide-react';

export default function RecordBorrow() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link to="/admin/transactions" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient">Catat Peminjaman</h1>
          <p className="text-muted-foreground">Proses peminjaman buku untuk anggota</p>
        </div>
      </div>

      <Card className="max-w-2xl shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Form Peminjaman Buku
          </CardTitle>
          <CardDescription>Masukkan detail peminjaman buku</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="memberNumber">Nomor Anggota</Label>
              <Input id="memberNumber" placeholder="Masukkan nomor anggota" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookId">ID/ISBN Buku</Label>
              <Input id="bookId" placeholder="Masukkan ID atau ISBN buku" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Tanggal Jatuh Tempo</Label>
              <Input id="dueDate" type="date" />
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <Button variant="outline" asChild>
                <Link to="/admin/transactions">Batal</Link>
              </Button>
              <Button className="bg-gradient-primary">Catat Peminjaman</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}