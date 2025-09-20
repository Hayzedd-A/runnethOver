import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';
const SearchIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M10.4942 19.7988C12.626 19.7984 14.6963 19.0848 16.3755 17.7716L21.6551 23.0509L23.3533 21.3528L18.0737 16.0735C19.3876 14.3942 20.1017 12.3235 20.1022 10.1913C20.1022 4.89401 15.7918 0.583862 10.4942 0.583862C5.19661 0.583862 0.88623 4.89401 0.88623 10.1913C0.88623 15.4886 5.19661 19.7988 10.4942 19.7988ZM10.4942 2.98573C14.4683 2.98573 17.7002 6.21744 17.7002 10.1913C17.7002 14.1652 14.4683 17.3969 10.4942 17.3969C6.52011 17.3969 3.28823 14.1652 3.28823 10.1913C3.28823 6.21744 6.52011 2.98573 10.4942 2.98573Z'
      fill='#5A5881'
    />
  </svg>
);
export default function AppNav() {
  const { user } = useAuth();
  const [q, setQ] = useState('');
  const notifications = 2;

  const onSubmit = (e) => {
    e.preventDefault();
    // This is a top-level search input; integrate with page-level search if needed
  };

  return (
    <div className='sticky top-0 z-20 bg-white '>
      <div className='container-px h-14 flex items-center justify-between'>
        <form onSubmit={onSubmit} className='flex-1 max-w-xl'>
          <label htmlFor='app-search' className='sr-only'>
            Search
          </label>
          <div className='relative'>
            <input
              id='app-search'
              type='search'
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Search products...'
              className='w-full rounded-full border-gray-300 pl-10 pr-3 py-2 text-sm focus:outline-none bg-gray-200 focus:ring-2'
            />
            <span className='absolute inset-y-0 left-3 w-4 flex items-center text-gray-400'>
              <SearchIcon/>
            </span>
          </div>
        </form>

        <div className='flex items-center gap-4'>
          <button
            aria-label='Notifications'
            className='relative w-10 h-10 grid place-items-center rounded-full hover:bg-gray-100'
          >
            🔔
            {notifications > 0 && (
              <span className='absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] px-1 rounded-full'>
                {notifications}
              </span>
            )}
          </button>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-full bg-brand-600 text-white grid place-items-center'>
              {user?.firstName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className='text-sm font-medium'>
              {user?.firstName || 'User'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
