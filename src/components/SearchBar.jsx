export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
    return (
      <div className="w-full">
        <label className="sr-only" htmlFor="search">Search</label>
        <div className="relative">
          <input
            id="search"
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔎</span>
        </div>
      </div>
    );
  }