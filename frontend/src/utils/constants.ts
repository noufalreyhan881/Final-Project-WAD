export const API_BASE_URL = "http://localhost:8000/api";

export const USER_ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
} as const;

export const BOOK_CATEGORIES = [
  "Teknologi",
  "Filosofi",
  "Sejarah",
  "Sastra",
  "Sains",
  "Bisnis",
  "Pendidikan",
  "Kesehatan",
  "Agama",
  "Seni",
] as const;

export const TRANSACTION_STATUS = {
  BORROWED: "borrowed",
  RETURNED: "returned",
  OVERDUE: "overdue",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BOOKS: "/books",
  MEMBER_DASHBOARD: "/dashboard",
  ADMIN_DASHBOARD: "/admin",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;
