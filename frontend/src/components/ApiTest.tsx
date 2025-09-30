import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/api";

export function ApiTest() {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Attempting to connect to:", `${API_BASE_URL}/test`);
        const response = await fetch(`${API_BASE_URL}/test`);
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Response data:", data);
        setMessage(data.message);
      } catch (err) {
        setError(`Failed to connect to the API: ${err.message}`);
        console.error("API connection error:", err);
      }
    };

    testConnection();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-green-100 text-green-700 rounded">
      Backend Response: {message}
    </div>
  );
}
