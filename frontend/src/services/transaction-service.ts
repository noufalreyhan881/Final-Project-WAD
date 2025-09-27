export interface Transaction {
  id: string;
  userId: string;
  bookId: string;
  type: 'borrow' | 'return';
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
  notes?: string;
  
  // Related data
  user?: {
    id: string;
    name: string;
    email: string;
    membershipNumber?: string;
  };
  book?: {
    id: string;
    title: string;
    author: string;
    isbn?: string;
  };
}

export interface CreateBorrowData {
  userId: string;
  bookId: string;
  dueDate: string;
  notes?: string;
}

export interface CreateReturnData {
  borrowId: string;
  returnDate: string;
  notes?: string;
}

class TransactionService {
  private baseUrl = 'http://localhost:8000/api/transactions';

  async getAllTransactions(): Promise<Transaction[]> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(this.baseUrl, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    return response.json();
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user transactions');
    }

    return response.json();
  }

  async getTransaction(id: string): Promise<Transaction> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Transaction not found');
    }

    return response.json();
  }

  async recordBorrow(borrowData: CreateBorrowData): Promise<Transaction> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/borrow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(borrowData),
    });

    if (!response.ok) {
      throw new Error('Failed to record borrow');
    }

    return response.json();
  }

  async recordReturn(returnData: CreateReturnData): Promise<Transaction> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/return`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(returnData),
    });

    if (!response.ok) {
      throw new Error('Failed to record return');
    }

    return response.json();
  }

  async getOverdueTransactions(): Promise<Transaction[]> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/overdue`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch overdue transactions');
    }

    return response.json();
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export const transactionService = new TransactionService();