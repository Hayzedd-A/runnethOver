import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const linkCls = ({ isActive }) =>
    `px-3 py-2 font-medium hover:border-2-accent-50 ${
      isActive
        ? 'border-bottom-4 border-accent-500'
        : 'text-gray-700 hover:text-gray-900'
    }`;

  return (
    <header className=''>
      <div className='container-px h-16 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-2 h-4'>
          {/* <div className="w-8 h-8 rounded bg-brand-600" aria-hidden /> */}
          <img
            src='/logo_name.png'
            alt='RUNNETH OVER'
            className='h-10 lg:h-12'
          />
        </Link>

        <nav className='hidden sm:flex items-center text-2xl gap-1'>
          {/* <NavLink to="/" className={linkCls}>Home</NavLink> */}
          <NavLink to='/how-it-works' className={linkCls}>
            How It Works
          </NavLink>
          <NavLink to='/our-story' className={linkCls}>
            Our Story
          </NavLink>
          <NavLink to='/faqs' className={linkCls}>
            FAQs
          </NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          className='btn sm:hidden flex flex-col justify-center items-center gap-1 p-2 scale-125'
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg
            width='23'
            height='23'
            viewBox='0 0 23 23'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='11.5' cy='11.5' r='11.5' fill='#C2612D' />
            <path
              d='M6 15V13.6667H18V15H6ZM6 11.6667V10.3333H18V11.6667H6ZM6 8.33333V7H18V8.33333H6Z'
              fill='white'
            />
          </svg>
        </button>

        {/* <div className="flex items-center gap-2">
            <Link className="text-sm px-3 py-2 rounded-md hover:bg-gray-100" to="/login">Log in</Link>
            <Link className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700" to="/signup">Join the waitlist</Link>
          </div> */}
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-40'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <nav
        className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='p-4 flex justify-end'>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className='text-gray-500 hover:text-gray-700'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <ul className='flex flex-col space-y-4 p-4 text-2xl'>
          <li>
            <NavLink
              to='/how-it-works'
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md font-medium ${
                  isActive
                    ? 'border-bottom-4 border-accent-500 text-accent-500'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/our-story'
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md font-medium ${
                  isActive
                    ? 'border-bottom-4 border-accent-500 text-accent-500'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Story
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/faqs'
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md font-medium ${
                  isActive
                    ? 'border-bottom-4 border-accent-500 text-accent-500'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQs
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
