import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Calendar, TrendingUp, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function MemberDashboard() {
  const { user } = useAuth();

  // Mock data untuk dashboard
  const stats = {
    booksRead: 12,
    currentBorrows: 3,
    overdueBooks: 0,
    totalFines: 0,
  };

  const recentBorrows = [
    {
      id: '1',
      title: 'Belajar React dan TypeScript',
      author: 'John Doe',
      borrowDate: '2024-01-15',
      dueDate: '2024-01-29',
      status: 'borrowed' as const,
    },
    {
      id: '2',
      title: 'Filosofi Hidup Sederhana',
      author: 'Jane Smith',
      borrowDate: '2024-01-10',
      dueDate: '2024-01-24',
      status: 'borrowed' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient">
            Selamat Datang, {user?.name}
          </h1>
          <p className="text-muted-foreground">
            Kelola peminjaman buku dan lihat riwayat membaca Anda
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buku Dibaca</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.booksRead}</div>
            <p className="text-xs text-muted-foreground">Total buku yang pernah dibaca</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sedang Dipinjam</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentBorrows}</div>
            <p className="text-xs text-muted-foreground">Buku yang sedang dipinjam</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.overdueBooks}</div>
            <p className="text-xs text-muted-foreground">Buku yang terlambat dikembalikan</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Denda</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {stats.totalFines.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Total denda yang harus dibayar</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Borrows */}
      <Card className="shadow-medium">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-serif">Peminjaman Terbaru</CardTitle>
            <CardDescription>Buku yang sedang Anda pinjam</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/history" className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Lihat Semua
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentBorrows.length > 0 ? (
            <div className="space-y-4">
              {recentBorrows.map((borrow) => (
                <div key={borrow.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{borrow.title}</h4>
                    <p className="text-sm text-muted-foreground">oleh {borrow.author}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Dipinjam: {new Date(borrow.borrowDate).toLocaleDateString('id-ID')}</span>
                      <span>Jatuh tempo: {new Date(borrow.dueDate).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="default">
                      {borrow.status === 'borrowed' ? 'Dipinjam' : 'Dikembalikan'}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/books/${borrow.id}`}>Detail</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada peminjaman</h3>
              <p className="text-muted-foreground mb-4">
                Mulai jelajahi katalog buku dan pinjam buku favorit Anda
              </p>
              <Button asChild>
                <Link to="/books">Jelajahi Katalog</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Jelajahi Buku Baru
            </CardTitle>
            <CardDescription>
              Temukan buku-buku terbaru di koleksi perpustakaan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/books">Lihat Katalog</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Riwayat Peminjaman
            </CardTitle>
            <CardDescription>
              Lihat semua riwayat peminjaman dan pengembalian buku
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="w-full">
              <Link to="/dashboard/history">Lihat Riwayat</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}