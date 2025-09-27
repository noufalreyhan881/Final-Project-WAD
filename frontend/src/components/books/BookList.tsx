import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen } from 'lucide-react';
import { BookCard } from './BookCard';
import { Book } from '@/types/book';
import { BOOK_CATEGORIES } from '@/utils/constants';

interface BookListProps {
  books: Book[];
  showActions?: boolean;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

export function BookList({ books, showActions = false, onEdit, onDelete }: BookListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Semua', ...BOOK_CATEGORIES];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Semua' || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari judul buku atau nama penulis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category || (selectedCategory === '' && category === 'Semua') ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category === 'Semua' ? '' : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="text-muted-foreground">
        Menampilkan {filteredBooks.length} dari {books.length} buku
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            showActions={showActions}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-serif font-semibold mb-2">Buku tidak ditemukan</h3>
          <p className="text-muted-foreground">
            Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.
          </p>
        </div>
      )}
    </div>
  );
}