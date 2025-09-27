import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRightLeft } from 'lucide-react';

export default function RecordReturn() {
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
          <h1 className="text-3xl font-serif font-bold text-gradient">Catat Pengembalian</h1>
          <p className="text-muted-foreground">Proses pengembalian buku dari anggota</p>
        </div>
      </div>

      <Card className="max-w-2xl shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowRightLeft className="h-5 w-5 mr-2" />
            Form Pengembalian Buku
          </CardTitle>
          <CardDescription>Masukkan detail pengembalian buku</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="borrowId">ID Peminjaman</Label>
              <Input id="borrowId" placeholder="Masukkan ID peminjaman" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="returnDate">Tanggal Pengembalian</Label>
              <Input id="returnDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Kondisi Buku</Label>
              <Input id="condition" placeholder="Kondisi buku saat dikembalikan" />
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <Button variant="outline" asChild>
                <Link to="/admin/transactions">Batal</Link>
              </Button>
              <Button className="bg-gradient-primary">Catat Pengembalian</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}