import { NavLink } from 'react-router-dom';

const links = [
  { to: '/app/search', label: 'Search',  },
  { to: '/app/saved', label: 'Wishlist',  },
  { to: '/app/account', label: 'Account',  },
];

export default function Sidebar({ variant = 'side' }) {
  if (variant === 'bottom') {
    return (
      <nav className='fixed bottom-0 inset-x-0  bg-white h-14'>
        <ul className='h-full grid grid-cols-3'>
          {links.map((l) => (
            <li key={l.to} className='h-full'>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `h-full w-full uppercase flex flex-col items-center justify-center text-xs ${
                    isActive ? 'text-accent-500' : 'text-black'
                  }`
                }
              >
                {/* <span aria-hidden>{l.icon}</span> */}
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <aside className='w-64 bg-white hidden md:flex md:flex-col fixed h-full'>
      <div className='h-16 flex items-center px-4 gap-2'>
        <img
          src='/logo_name.png'
          alt='RUNNETH OVER'
          className='h-8 sm:h-10 lg:h-12'
        />
      </div>
      <nav className='p-4 grid gap-4 '>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-4 pl-16 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-accent-50 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            {/* <span aria-hidden>{l.icon}</span> */}
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
