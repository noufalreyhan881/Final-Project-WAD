import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Filter, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data untuk riwayat peminjaman
const mockBorrowHistory = [
  {
    id: '1',
    bookId: '1',
    bookTitle: 'Belajar React dan TypeScript',
    author: 'John Doe',
    borrowDate: '2024-01-15',
    dueDate: '2024-01-29',
    returnDate: null,
    status: 'borrowed' as const,
    fine: 0,
  },
  {
    id: '2',
    bookId: '2',
    bookTitle: 'Filosofi Hidup Sederhana',
    author: 'Jane Smith',
    borrowDate: '2024-01-10',
    dueDate: '2024-01-24',
    returnDate: null,
    status: 'borrowed' as const,
    fine: 0,
  },
  {
    id: '3',
    bookId: '3',
    bookTitle: 'Sejarah Nusantara',
    author: 'Ahmad Rahman',
    borrowDate: '2023-12-15',
    dueDate: '2023-12-29',
    returnDate: '2023-12-28',
    status: 'returned' as const,
    fine: 0,
  },
  {
    id: '4',
    bookId: '4',
    bookTitle: 'Machine Learning Praktis',
    author: 'Dr. Sarah Chen',
    borrowDate: '2023-12-01',
    dueDate: '2023-12-15',
    returnDate: '2023-12-20',
    status: 'returned' as const,
    fine: 15000, // Terlambat 5 hari × Rp 3.000/hari
  },
];

export default function BorrowHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'borrowed' | 'returned' | 'overdue'>('all');

  const filteredHistory = mockBorrowHistory.filter((record) => {
    const matchesSearch = record.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === 'borrowed') {
      matchesStatus = record.status === 'borrowed';
    } else if (statusFilter === 'returned') {
      matchesStatus = record.status === 'returned';
    } else if (statusFilter === 'overdue') {
      matchesStatus = record.status === 'borrowed' && new Date(record.dueDate) < new Date();
    }

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (record: any) => {
    if (record.status === 'returned') {
      return <Badge variant="default">Dikembalikan</Badge>;
    } else if (new Date(record.dueDate) < new Date()) {
      return <Badge variant="destructive">Terlambat</Badge>;
    } else {
      return <Badge variant="secondary">Dipinjam</Badge>;
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Terlambat ${Math.abs(diffDays)} hari`;
    } else if (diffDays === 0) {
      return 'Jatuh tempo hari ini';
    } else {
      return `${diffDays} hari lagi`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gradient mb-2">
          Riwayat Peminjaman
        </h1>
        <p className="text-muted-foreground">
          Lihat semua riwayat peminjaman dan status pengembalian buku Anda
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari judul buku atau penulis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Semua
              </Button>
              <Button
                variant={statusFilter === 'borrowed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('borrowed')}
              >
                Dipinjam
              </Button>
              <Button
                variant={statusFilter === 'returned' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('returned')}
              >
                Dikembalikan
              </Button>
              <Button
                variant={statusFilter === 'overdue' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('overdue')}
              >
                Terlambat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="text-muted-foreground">
        Menampilkan {filteredHistory.length} dari {mockBorrowHistory.length} riwayat
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((record) => (
          <Card key={record.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{record.bookTitle}</h3>
                      <p className="text-muted-foreground">oleh {record.author}</p>
                    </div>
                    {getStatusBadge(record)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Tanggal Pinjam:</span>
                      <br />
                      <span className="text-muted-foreground">
                        {new Date(record.borrowDate).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-medium">Jatuh Tempo:</span>
                      <br />
                      <span className="text-muted-foreground">
                        {new Date(record.dueDate).toLocaleDateString('id-ID')}
                      </span>
                      {record.status === 'borrowed' && (
                        <div className={`text-xs mt-1 ${
                          new Date(record.dueDate) < new Date() 
                            ? 'text-destructive' 
                            : 'text-warning'
                        }`}>
                          {getDaysRemaining(record.dueDate)}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      {record.returnDate ? (
                        <>
                          <span className="font-medium">Tanggal Kembali:</span>
                          <br />
                          <span className="text-muted-foreground">
                            {new Date(record.returnDate).toLocaleDateString('id-ID')}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium">Status:</span>
                          <br />
                          <span className="text-muted-foreground">Belum dikembalikan</span>
                        </>
                      )}
                    </div>
                  </div>

                  {record.fine > 0 && (
                    <div className="mt-3 p-3 bg-destructive/10 rounded-lg">
                      <span className="text-destructive font-medium">
                        Denda: Rp {record.fine.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/books/${record.bookId}`} className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Detail Buku
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold mb-2">Tidak ada riwayat</h3>
            <p className="text-muted-foreground">
              Belum ada riwayat peminjaman yang sesuai dengan filter yang dipilih.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}