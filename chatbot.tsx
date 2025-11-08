import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// 🧠 Replace these with your actual Supabase details
const supabase = createClient(
  "https://biibpkmrulenfvamhxsm.supabase.co", // your project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpaWJwa21ydWxlbmZ2YW1oeHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MzU3MzcsImV4cCI6MjA2OTExMTczN30.dR5cIlXpe39TKo7KexoEKhR3TbPu-8x7GKcochLNoT0" 
);

const Chatbot = () => {
  const [location, setLocation] = useState("");
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchVendors = async (loc: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .ilike("location", `%${loc}%`);

    if (error) {
      console.error(error);
      setMessage("Error fetching data");
    } else if (data.length === 0) {
      setMessage("Sorry, no vendors found in this area.");
    } else {
      setVendors(data);
      setMessage(`Found ${data.length} vendor(s) in ${loc}`);
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) fetchVendors(location.trim());
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">Vendor Assist Chatbot</h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mb-6 w-full max-w-md"
      >
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your area (e.g. Mumbai)"
          className="border border-gray-300 rounded-lg p-2 flex-grow"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {message && <p className="mb-4 text-gray-600">{message}</p>}

      <ul className="space-y-2">
        {vendors.map((v: any) => (
          <li
            key={v.id}
            className="p-3 border rounded-lg bg-white shadow-sm text-left"
          >
            <strong>{v.name}</strong> — {v.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chatbot;
