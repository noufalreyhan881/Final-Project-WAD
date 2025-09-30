import axios from "axios";
import { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publishYear: number;
  category: string;
  availableCopies: number;
  totalCopies: number;
  cover: string | null;
  description: string;
}

export const useGetBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<Book[]>("http://localhost:8000/books");
        setBooks(data);
        console.log(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, isLoading };
};
