export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
}) {
  const Icon = () => (
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
  return (
    <div className='w-full'>
      <label className='sr-only' htmlFor='search'>
        Search
      </label>
      <div className='relative'>
        <input
          id='search'
          type='search'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='w-full border-gray-300 pl-10 pr-3 py-4 focus:outline-none focus:ring-2 bg-white'
        />
        <span className='absolute inset-y-0 left-3 flex items-center pr-2 text-gray-400'>
          <Icon />
        </span>
      </div>
    </div>
  );
}
