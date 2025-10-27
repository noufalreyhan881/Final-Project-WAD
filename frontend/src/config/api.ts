import axios from "axios";
// API base URL

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const BASE_URL = apiUrl;
// Default headers for API requests
if (!apiUrl) {
  throw new Error(
    "VITE_API_BASE_URL is not set. Please define it in your environment variables."
  );
}

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const api = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});
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

export default api;
