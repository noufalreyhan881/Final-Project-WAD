// API base URL
export const API_BASE_URL = "http://localhost:8000/api";

// Default headers for API requests
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // Books
  BOOKS: "/books",
  BOOK_DETAIL: (id: number) => `/books/${id}`,

  // Users
  USER_PROFILE: "/user",
  USERS: "/admin/users",

  // Transactions
  TRANSACTIONS: "/admin/transactions",
  BORROW_BOOK: "/admin/transactions/borrow",
  RETURN_BOOK: "/admin/transactions/return",
};
