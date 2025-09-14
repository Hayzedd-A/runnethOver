import { useMemo, useState } from "react";
  import { Link } from "react-router-dom";
  import SearchBar from "../../components/SearchBar.jsx";

  const FAQS = [
    { q: "How do I upload an image?", a: "Go to Search, then drag and drop or click to select an image." },
    { q: "Is it free to use?", a: "Yes, searching is free during the waitlist period." },
    { q: "How do I save products?", a: "Use the heart or + button on any product card." },
    { q: "Can I create an account?", a: "Yes, sign up on the waitlist. You can log in to access saved items." },
  ];

  export default function Faqs() {
    const [query, setQuery] = useState("");
    const results = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return FAQS;
      return FAQS.filter(
        (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      );
    }, [query]);

    return (
      <div className="container-px py-12">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-extrabold">FAQs</h1>
          <Link className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700" to="/signup">
            Join the waitlist
          </Link>
        </div>

        <div className="mt-6 max-w-2xl">
          <SearchBar value={query} onChange={setQuery} placeholder="Search FAQs..." />
        </div>

        <ul className="mt-6 space-y-4">
          {results.map((f, idx) => (
            <li key={idx} className="border rounded-lg p-4 bg-white">
              <div className="font-semibold">{f.q}</div>
              <div className="text-sm text-gray-600 mt-1">{f.a}</div>
            </li>
          ))}
          {results.length === 0 && (
            <li className="text-sm text-gray-500">No FAQs match your search.</li>
          )}
        </ul>
      </div>
    );
  }