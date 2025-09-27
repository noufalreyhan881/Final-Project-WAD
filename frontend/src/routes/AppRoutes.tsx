import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { MemberLayout } from '@/components/layout/MemberLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Public pages
import Home from '@/pages/public/Home';
import Login from '@/pages/public/Login';
import Register from '@/pages/public/Register';
import Catalog from '@/pages/public/Catalog';
import BookDetail from '@/pages/public/BookDetail';
import NotFound from '@/pages/NotFound';

// Member pages  
import MemberDashboard from '@/pages/member/Dashboard';
import BorrowHistory from '@/pages/member/BorrowHistory';
import Profile from '@/pages/member/Profile';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import BookList from '@/pages/admin/Books/BookList';
import AddBook from '@/pages/admin/Books/AddBook';
import EditBook from '@/pages/admin/Books/EditBook';
import UserList from '@/pages/admin/Users/UserList';
import AddUser from '@/pages/admin/Users/AddUser';
import EditUser from '@/pages/admin/Users/EditUser';
import TransactionList from '@/pages/admin/Transactions/TransactionList';
import RecordBorrowing from '@/pages/admin/Transactions/RecordBorrowing';
import RecordReturn from '@/pages/admin/Transactions/RecordReturn';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="books" element={<Catalog />} />
        <Route path="books/:id" element={<BookDetail />} />
      </Route>

      {/* Member routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <MemberLayout />
        </PrivateRoute>
      }>
        <Route index element={<MemberDashboard />} />
        <Route path="history" element={<BorrowHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<AdminDashboard />} />
        
        {/* Books management */}
        <Route path="books" element={<BookList />} />
        <Route path="books/add" element={<AddBook />} />
        <Route path="books/edit/:id" element={<EditBook />} />
        
        {/* Users management (changed from members) */}
        <Route path="users" element={<UserList />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/edit/:id" element={<EditUser />} />
        
        {/* Transactions management */}
        <Route path="transactions" element={<TransactionList />} />
        <Route path="transactions/borrow" element={<RecordBorrowing />} />
        <Route path="transactions/return" element={<RecordReturn />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}