// ApiTest.tsx

import { useEffect, useState } from "react";
// Import the default 'api' instance instead
import api from "@/config/api";

export function ApiTest() {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Use the 'api' instance. You only need the endpoint, not the full URL.
        const response = await api.get("/test");

        // With Axios, the data is directly on the `data` property
        setMessage(response.data.message);
      } catch (err) {
        // Axios provides better error objects
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
