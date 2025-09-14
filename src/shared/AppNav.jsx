import { useAuth } from "../context/AuthContext.jsx";
  import { useState } from "react";

  export default function AppNav() {
    const { user } = useAuth();
    const [q, setQ] = useState("");
    const notifications = 2;

    const onSubmit = (e) => {
      e.preventDefault();
      // This is a top-level search input; integrate with page-level search if needed
    };

    return (
      <div className="sticky top-0 z-20 bg-white border-b">
        <div className="container-px h-14 flex items-center justify-between">
          <form onSubmit={onSubmit} className="flex-1 max-w-xl">
            <label htmlFor="app-search" className="sr-only">Search</label>
            <div className="relative">
              <input
                id="app-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔎</span>
            </div>
          </form>

          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-gray-100"
            >
              🔔
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] px-1 rounded-full">
                  {notifications}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-600 text-white grid place-items-center">
                {user?.firstName?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="text-sm font-medium">{user?.firstName || "User"}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }