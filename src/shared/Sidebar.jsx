import { NavLink } from "react-router-dom";

  const links = [
    { to: "/app/search", label: "Search", icon: "🔎" },
    { to: "/app/saved", label: "Saved", icon: "💖" },
    { to: "/app/account", label: "Account", icon: "👤" },
  ];

  export default function Sidebar({ variant = "side" }) {
    if (variant === "bottom") {
      return (
        <nav className="fixed bottom-0 inset-x-0 border-t bg-white h-14">
          <ul className="h-full grid grid-cols-3">
            {links.map((l) => (
              <li key={l.to} className="h-full">
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `h-full w-full flex flex-col items-center justify-center text-xs ${isActive ? "text-brand-700" : "text-gray-600"}`
                  }
                >
                  <span aria-hidden>{l.icon}</span>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      );
    }

    return (
      <aside className="w-64 border-r bg-white hidden md:flex md:flex-col">
        <div className="h-16 border-b flex items-center px-4 gap-2">
          <div className="w-8 h-8 rounded bg-brand-600" aria-hidden />
          <div className="font-bold text-lg">RUNNETH OVER</div>
        </div>
        <nav className="p-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "bg-brand-50 text-brand-700" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <span aria-hidden>{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    );
  }