import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, User } from 'lucide-react';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  showActions?: boolean;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

export function BookCard({ book, showActions = false, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-3">
          <BookOpen className="h-12 w-12 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg font-serif line-clamp-2">
          {book.title}
        </CardTitle>
        <CardDescription className="space-y-1">
          <div className="flex items-center text-sm">
            <User className="h-3 w-3 mr-1" />
            {book.author}
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-3 w-3 mr-1" />
            {book.publishYear}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <Badge variant="secondary">{book.category}</Badge>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {book.description}
          </p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              Tersedia: {book.availableCopies}/{book.totalCopies}
            </span>
            <Badge variant={book.availableCopies > 0 ? 'default' : 'destructive'}>
              {book.availableCopies > 0 ? 'Tersedia' : 'Habis'}
            </Badge>
          </div>
          
          {showActions ? (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit?.(book)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete?.(book)}>
                Hapus
              </Button>
            </div>
          ) : (
            <Button asChild className="w-full" size="sm">
              <Link to={`/books/${book.id}`}>
                Lihat Detail
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}