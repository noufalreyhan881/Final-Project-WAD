import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Edit, Eye, Trash2, Users, UserCheck, AlertTriangle } from 'lucide-react';

// Mock data untuk anggota
const mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    membershipNumber: 'M001',
    phone: '+62 812-3456-7890',
    joinDate: '2024-01-15',
    status: 'active' as const,
    totalBorrows: 12,
    currentBorrows: 2,
    fines: 0,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    membershipNumber: 'M002',
    phone: '+62 813-4567-8901',
    joinDate: '2024-01-20',
    status: 'active' as const,
    totalBorrows: 8,
    currentBorrows: 1,
    fines: 15000,
  },
  {
    id: '3',
    name: 'Ahmad Rahman',
    email: 'ahmad.rahman@email.com',
    membershipNumber: 'M003',
    phone: '+62 814-5678-9012',
    joinDate: '2024-01-25',
    status: 'suspended' as const,
    totalBorrows: 5,
    currentBorrows: 0,
    fines: 45000,
  },
];

export default function MemberManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Aktif</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspend</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const stats = {
    totalMembers: mockMembers.length,
    activeMembers: mockMembers.filter(m => m.status === 'active').length,
    suspendedMembers: mockMembers.filter(m => m.status === 'suspended').length,
    membersWithFines: mockMembers.filter(m => m.fines > 0).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient">
            Manajemen Anggota
          </h1>
          <p className="text-muted-foreground">
            Kelola data anggota perpustakaan
          </p>
        </div>
        <Button asChild className="bg-gradient-primary">
          <Link to="/admin/members/add" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Anggota
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.totalMembers}</p>
                <p className="text-sm text-muted-foreground">Total Anggota</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-success mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.activeMembers}</p>
                <p className="text-sm text-muted-foreground">Anggota Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-destructive mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.suspendedMembers}</p>
                <p className="text-sm text-muted-foreground">Di-suspend</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-warning mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.membersWithFines}</p>
                <p className="text-sm text-muted-foreground">Ada Denda</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, email, atau nomor anggota..."
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
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Aktif
              </Button>
              <Button
                variant={statusFilter === 'suspended' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('suspended')}
              >
                Suspend
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Daftar Anggota</CardTitle>
          <CardDescription>
            Menampilkan {filteredMembers.length} dari {mockMembers.length} anggota
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Anggota</TableHead>
                  <TableHead>No. Anggota</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Peminjaman</TableHead>
                  <TableHead>Denda</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {member.membershipNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{member.phone}</p>
                        <p className="text-xs text-muted-foreground">
                          Bergabung: {new Date(member.joinDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(member.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>Aktif: {member.currentBorrows}</p>
                        <p className="text-muted-foreground">Total: {member.totalBorrows}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {member.fines > 0 ? (
                        <div className="text-sm text-destructive">
                          Rp {member.fines.toLocaleString('id-ID')}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">-</div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/members/${member.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2">Tidak ada anggota ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah kata kunci pencarian atau filter status.
              </p>
              <Button asChild>
                <Link to="/admin/members/add">Tambah Anggota Pertama</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}