import { useEffect, useState } from "react";
import API from "../services/api";
import SweetCard from "../components/SweetCard";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [query, setQuery] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
      return;
    }

    const fetchSweets = async () => {
      const res = await API.get(
        query ? `/sweets/search?name=${query}` : "/sweets"
      );
      setSweets(res.data);
    };

    fetchSweets();
  }, [query]);

  return (
    <div>
      <h2>Sweets Dashboard</h2>

      <button onClick={logout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      <br />

      <input
        placeholder="Search sweets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "200px" }}
      />

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {sweets.map((s) => (
          <SweetCard key={s.id} sweet={s} refresh={() => {}} />
        ))}
      </div>
    </div>
  );
}
