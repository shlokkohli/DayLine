"use client";

import { useEffect, useState } from "react";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/getSummary", { method: "POST" }); // calls your backend logic
        const data = await res.json();

        if (res.ok) {
          setMessage(data.message);
          setLogs(data.output?.text?.split("\n") || []);
        } else {
          setMessage(data.message || "Error fetching logs.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching logs.");
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h1>Your Logs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : logs.length > 0 ? (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}
