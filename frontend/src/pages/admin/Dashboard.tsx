import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, TrendingUp, AlertTriangle, Plus, Eye } from 'lucide-react';

export default function AdminDashboard() {
  // Mock data untuk dashboard admin
  const stats = {
    totalBooks: 1250,
    totalMembers: 456,
    activeBorrows: 89,
    overdueBooks: 12,
  };

  const recentActivities = [
    {
      id: '1',
      type: 'borrow',
      message: 'John Doe meminjam "Belajar React dan TypeScript"',
      time: '2 menit yang lalu',
    },
    {
      id: '2',
      type: 'return',
      message: 'Jane Smith mengembalikan "Filosofi Hidup Sederhana"',
      time: '15 menit yang lalu',
    },
    {
      id: '3',
      type: 'member',
      message: 'Anggota baru: Ahmad Rahman terdaftar',
      time: '1 jam yang lalu',
    },
    {
      id: '4',
      type: 'book',
      message: 'Buku baru ditambahkan: "Machine Learning Praktis"',
      time: '2 jam yang lalu',
    },
  ];

  const overdueBooks = [
    {
      id: '1',
      title: 'Database Design Fundamentals',
      member: 'Sarah Wilson',
      daysOverdue: 5,
      fine: 15000,
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      member: 'Mike Johnson',
      daysOverdue: 3,
      fine: 9000,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient">
            Dashboard Admin
          </h1>
          <p className="text-muted-foreground">
            Kelola perpustakaan digital dengan mudah
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buku</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBooks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Koleksi perpustakaan</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Anggota terdaftar</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sedang Dipinjam</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBorrows}</div>
            <p className="text-xs text-muted-foreground">Peminjaman aktif</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.overdueBooks}</div>
            <p className="text-xs text-muted-foreground">Perlu tindak lanjut</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-serif">Aktivitas Terbaru</CardTitle>
              <CardDescription>Aktivitas sistem dalam 24 jam terakhir</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/transactions" className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Lihat Semua
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overdue Books */}
        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-serif text-destructive">Buku Terlambat</CardTitle>
              <CardDescription>Buku yang perlu tindak lanjut</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/transactions" className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Lihat Semua
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {overdueBooks.length > 0 ? (
              <div className="space-y-4">
                {overdueBooks.map((item) => (
                  <div key={item.id} className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">Peminjam: {item.member}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-destructive font-medium">
                          {item.daysOverdue} hari terlambat
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Denda: Rp {item.fine.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tidak ada buku yang terlambat</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Buku
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" size="sm">
              <Link to="/admin/books/add">Tambah Buku Baru</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Anggota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" size="sm">
              <Link to="/admin/members/add">Daftarkan Anggota</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <BookOpen className="h-4 w-4 mr-2" />
              Catat Peminjaman
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" size="sm" variant="outline">
              <Link to="/admin/transactions/borrow">Proses Peminjaman</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <TrendingUp className="h-4 w-4 mr-2" />
              Catat Pengembalian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" size="sm" variant="outline">
              <Link to="/admin/transactions/return">Proses Pengembalian</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}