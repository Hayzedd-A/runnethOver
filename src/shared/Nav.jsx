import { Link, NavLink } from "react-router-dom";

  export default function Nav() {
    const linkCls = ({ isActive }) =>
      `px-3 py-2 rounded-md font-medium ${
        isActive ? "border-buttom-4 border-accent-500" : "text-gray-700 hover:text-gray-900"
      }`;

    return (
      <header className="">
        <div className="container-px h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 h-4">
            {/* <div className="w-8 h-8 rounded bg-brand-600" aria-hidden /> */}
            <img src="/logo_name.png" alt="RUNNETH OVER" style={{height: "4em"}} />
          </Link>

          <nav className="hidden sm:flex items-center text-2xl gap-1">
            {/* <NavLink to="/" className={linkCls}>Home</NavLink> */}
            <NavLink to="/how-it-works" className={linkCls}>How It Works</NavLink>
            <NavLink to="/our-story" className={linkCls}>Our Story</NavLink>
            <NavLink to="/faqs" className={linkCls}>FAQs</NavLink>
          </nav>

          {/* <div className="flex items-center gap-2">
            <Link className="text-sm px-3 py-2 rounded-md hover:bg-gray-100" to="/login">Log in</Link>
            <Link className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700" to="/signup">Join the waitlist</Link>
          </div> */}
        </div>
      </header>
    );
  }