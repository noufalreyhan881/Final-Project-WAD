import { Book } from "@/types/book";

export interface CreateBookData {
  title: string;
  author: string;
  publisher: string;
  publishYear: number;
  category: string;
  totalCopies: number;
  description?: string;
}

export interface UpdateBookData extends Partial<CreateBookData> {
  id: string;
}

class BookService {
  private baseUrl = "http://localhost:8000/api/books";

  async getAllBooks(): Promise<Book[]> {
    try {
      console.log("Fetching books from:", this.baseUrl);
      const response = await fetch(this.baseUrl);

      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      console.log("Received data:", data);
      return data.data; // Note: Laravel wraps response in data property
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  async getBook(id: string): Promise<Book> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      throw new Error("Book not found");
    }

    return response.json();
  }

  async createBook(bookData: CreateBookData): Promise<Book> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error("Failed to create book");
    }

    return response.json();
  }

  async updateBook(bookData: UpdateBookData): Promise<Book> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/${bookData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error("Failed to update book");
    }

    return response.json();
  }

  async deleteBook(id: string): Promise<void> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
  }

  private getToken(): string | null {
    return localStorage.getItem("token");
  }
}

export const bookService = new BookService();
