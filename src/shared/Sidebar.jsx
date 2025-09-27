import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const links = [
  { to: '/app/search', label: 'Search' },
  { to: '/app/saved', label: 'Wishlist' },
  {
    to: '/app/account',
    label: 'Account',
    children: [
      { to: '/app/account', label: 'Settings' },
      { to: '/app/profile', label: 'Profile' },
      { to: '/logout', label: 'Logout' },
    ],
  },
];

export default function Sidebar({ variant = 'side' }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  if (variant === 'bottom') {
    return (
      <nav className='fixed bottom-0 inset-x-0 bg-white h-14'>
        <ul className='h-full grid grid-cols-3 z-15'>
          {links.map((l) => (
            <li key={l.to} className='h-full relative'>
              {l.children ? (
                // Dropdown for items with children
                <div className='h-full'>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === l.to ? null : l.to)}
                    className={`h-full w-full uppercase flex flex-col items-center justify-center text-xs ${
                      window.location.pathname.startsWith(l.to)
                        ? 'text-accent-500'
                        : 'text-black'
                    }`}
                  >
                    {l.label}
                  </button>

                  {/* Dropdown menu - shown on click */}
                  {openDropdown === l.to && (
                    <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white shadow-lg rounded-md min-w-[120px] border'>
                      <ul className='py-1'>
                        {l.children.map((child) => (
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              onClick={() => setOpenDropdown(null)}
                              className={({ isActive }) =>
                                `block px-4 py-2 text-sm ${
                                  isActive
                                    ? 'text-accent-500 bg-gray-100'
                                    : 'text-black'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                // Regular link for items without children
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `h-full w-full uppercase flex flex-col items-center justify-center text-xs ${
                      isActive ? 'text-accent-500' : 'text-black'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        
        {/* Overlay to close dropdown when clicking outside */}
        {/* {openDropdown && (
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setOpenDropdown(null)}
          />
        )} */}
      </nav>
    );
  }

  return (
    <aside className='z-20 w-64 bg-white hidden md:flex md:flex-col fixed h-full '>
      <Link to='/' className='h-16 flex items-center px-4 gap-2'>
        <img
          src='/logo_name.png'
          alt='RUNNETH OVER'
          className='h-8 sm:h-10 lg:h-12'
        />
      </Link>
      <nav className='p-4 flex flex-col gap-1'>
        {links.map((l) => (
          <div key={l.to} className='relative'>
            {l.children ? (
              // Parent item with children for desktop
              <div>
                <button
                  onClick={() => setOpenDropdown(openDropdown === l.to ? null : l.to)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium ${
                    window.location.pathname.startsWith(l.to)
                      ? 'bg-accent-50 text-gray-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {/* <span aria-hidden>{l.icon}</span> */}
                  {l.label}
                  <svg 
                    className={`w-4 h-4 ml-auto transition-transform ${
                      openDropdown === l.to ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Children links */}
                {openDropdown === l.to && (
                  <div className='ml-6 mt-1 space-y-1'>
                    {l.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm ${
                            isActive
                              ? 'text-accent-50 '
                              : 'text-gray-600 hover:bg-gray-50'
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Regular link for items without children
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-accent-50 text-gray-200'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {/* <span aria-hidden>{l.icon}</span> */}
                {l.label}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}