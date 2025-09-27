import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}