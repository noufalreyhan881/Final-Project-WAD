export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishYear: number;
  category: string;
  description: string;
  cover?: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
  addedDate: string;
}

export interface BorrowingRecord {
  id: string;
  bookId: string;
  memberId: string;
  memberName: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: "borrowed" | "returned" | "overdue";
  fine?: number;
}
