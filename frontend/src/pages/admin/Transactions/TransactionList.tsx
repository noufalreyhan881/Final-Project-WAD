import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, ArrowRightLeft } from 'lucide-react';

const mockTransactions = [
  {
    id: '1',
    memberName: 'John Doe',
    bookTitle: 'Belajar React dan TypeScript',
    type: 'borrow',
    date: '2024-01-15',
    dueDate: '2024-01-29',
    status: 'active',
  },
  {
    id: '2',
    memberName: 'Jane Smith',
    bookTitle: 'Filosofi Hidup Sederhana',
    type: 'return',
    date: '2024-01-14',
    returnDate: '2024-01-14',
    status: 'completed',
  },
];

export default function TransactionManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient">Manajemen Transaksi</h1>
          <p className="text-muted-foreground">Kelola peminjaman dan pengembalian buku</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/admin/transactions/borrow" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Catat Peminjaman
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/transactions/return" className="flex items-center">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Catat Pengembalian
            </Link>
          </Button>
        </div>
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>Semua transaksi peminjaman dan pengembalian</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anggota</TableHead>
                <TableHead>Buku</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.memberName}</TableCell>
                  <TableCell>{transaction.bookTitle}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.type === 'borrow' ? 'default' : 'secondary'}>
                      {transaction.type === 'borrow' ? 'Peminjaman' : 'Pengembalian'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === 'active' ? 'default' : 'secondary'}>
                      {transaction.status === 'active' ? 'Aktif' : 'Selesai'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}