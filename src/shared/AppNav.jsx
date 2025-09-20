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
              <SearchIcon />
            </span>
          </div>
        </form>

        <div className='flex items-center gap-4'>
          <button
            aria-label='Notifications'
            className='relative w-10 h-10 grid place-items-center rounded-full hover:bg-gray-100'
          >
            <svg
              width='24'
              height='27'
              viewBox='0 0 24 27'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M20.75 14.5128V12.25H19V14.875C19 15.107 19.0923 15.3296 19.2564 15.4936L21.625 17.8622V19.25H2.375V17.8622L4.74362 15.4936C4.90773 15.3296 4.99995 15.107 5 14.875V11.375C4.99772 10.1455 5.31991 8.9372 5.93403 7.87208C6.54816 6.80696 7.43247 5.92276 8.49767 5.30876C9.56286 4.69477 10.7712 4.37272 12.0007 4.37516C13.2302 4.37759 14.4372 4.70442 15.5 5.32263V3.36525C14.6671 2.99651 13.7812 2.76146 12.875 2.66875V0.875H11.125V2.66875C8.96775 2.88832 6.96854 3.89998 5.51395 5.50811C4.05936 7.11624 3.25271 9.20661 3.25 11.375V14.5128L0.881375 16.8814C0.717269 17.0454 0.62505 17.268 0.625 17.5V20.125C0.625 20.3571 0.717187 20.5796 0.881282 20.7437C1.04538 20.9078 1.26794 21 1.5 21H7.625V21.875C7.625 23.0353 8.08594 24.1481 8.90641 24.9686C9.72688 25.7891 10.8397 26.25 12 26.25C13.1603 26.25 14.2731 25.7891 15.0936 24.9686C15.9141 24.1481 16.375 23.0353 16.375 21.875V21H22.5C22.7321 21 22.9546 20.9078 23.1187 20.7437C23.2828 20.5796 23.375 20.3571 23.375 20.125V17.5C23.375 17.268 23.2827 17.0454 23.1186 16.8814L20.75 14.5128ZM14.625 21.875C14.625 22.5712 14.3484 23.2389 13.8562 23.7312C13.3639 24.2234 12.6962 24.5 12 24.5C11.3038 24.5 10.6361 24.2234 10.1438 23.7312C9.65156 23.2389 9.375 22.5712 9.375 21.875V21H14.625V21.875Z'
                fill='#C2612D'
              />
            </svg>

            {notifications > 0 && (
              <span className='absolute top-2 right-1 bg-accent-500 text-white text-[10px] px-1 rounded-full'>
                {notifications}
              </span>
            )}
          </button>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-full bg-accent-500 text-white grid place-items-center'>
              {user?.firstName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className='text-sm font-medium'>
              {user?.firstName || 'User'}
            </div>
          </div>
          <button>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10 0.900391C15.0258 0.900391 19.0996 4.97421 19.0996 10C19.0996 15.0258 15.0258 19.0996 10 19.0996C4.97421 19.0996 0.900391 15.0258 0.900391 10C0.900391 4.97421 4.97421 0.900391 10 0.900391Z'
                stroke='#5C5C5C'
                stroke-width='0.2'
              />
              <path
                d='M10 10.7929L7.73162 8.14645C7.56425 7.95118 7.29289 7.95118 7.12553 8.14645C6.95816 8.34171 6.95816 8.65829 7.12553 8.85355L9.69695 11.8536C9.86432 12.0488 10.1357 12.0488 10.303 11.8536L12.8745 8.85355C13.0418 8.65829 13.0418 8.34171 12.8745 8.14645C12.7071 7.95118 12.4358 7.95118 12.2684 8.14645L10 10.7929Z'
                fill='#565656'
              />
              <mask
                id='mask0_279_495'
                // style='mask-type:luminance'
                maskUnits='userSpaceOnUse'
                x='7'
                y='8'
                width='6'
                height='4'
              >
                <path
                  d='M10 10.7929L7.73162 8.14645C7.56425 7.95118 7.29289 7.95118 7.12553 8.14645C6.95816 8.34171 6.95816 8.65829 7.12553 8.85355L9.69695 11.8536C9.86432 12.0488 10.1357 12.0488 10.303 11.8536L12.8745 8.85355C13.0418 8.65829 13.0418 8.34171 12.8745 8.14645C12.7071 7.95118 12.4358 7.95118 12.2684 8.14645L10 10.7929Z'
                  fill='white'
                />
              </mask>
              <g mask='url(#mask0_279_495)'></g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
