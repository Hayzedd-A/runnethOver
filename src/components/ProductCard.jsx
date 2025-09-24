import { useAuth } from '../context/AuthContext.jsx';

export default function ProductCard({ product }) {
  const { toggleSaved, isSaved } = useAuth();
  const saved = isSaved(product.id);

  return (
    <div className='p-4 overflow-hidden bg-white hover:shadow-sm transition-shadow'>
      <div className='aspect-square bg-gray-100'>
        {/* In real app, use product.image url */}
        {product.thumbnail ? (
          <img
            src={product.thumbnail + product.name.replace(' ', '')}
            alt={product.name}
            className='rounded-lg w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full grid place-items-center text-gray-400'>
            No image
          </div>
        )}
      </div>
      <div className='p-3'>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <div className='text-sm font-semibold line-clamp-2'>
              {product.name}
              <br />
              {product.year}
            </div>
            <div className='text-xs text-gray-500 line-clamp-1'>
              {product.brand}
            </div>
          </div>
        </div>
        <div className='mt-2 gap-2 flex items-center justify-between'>
          <div className='flex-1 font-bold'>
            ${product.price?.toFixed(2) ?? '0.00'}
          </div>
          <button
            onClick={() => toggleSaved(product)}
            aria-label={saved ? 'Remove from saved' : 'Save item'}
            className={`text-3xl ${
              saved ? 'text-pink-600' : 'text-gray-400 hover:text-gray-600'
            }`}
            title='Save'
          >
            {saved ? (
              <svg
                style={{scale: "1.5"}}
                width='20'
                height='17'
                viewBox='0 0 20 17'
                fill='rgb(249, 60, 101)'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M9.99996 15.883L17.191 8.383C18.4871 7.08786 18.8083 5.10828 17.9882 3.46975V3.46975C17.3765 2.24665 16.2142 1.39215 14.8643 1.17313C13.5144 0.954121 12.1415 1.3973 11.1745 2.36425L9.99996 3.538L8.82546 2.36425C7.85842 1.3973 6.48554 0.954121 5.13566 1.17313C3.78577 1.39215 2.62343 2.24665 2.01171 3.46975V3.46975C1.19274 5.10758 1.51356 7.08571 2.80821 8.38075L9.99996 15.883Z'
                  stroke='#F93C65'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            ) : (
              <svg
                style={{scale: "1.5"}}
                width='20'
                height='17'
                viewBox='0 0 20 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M9.99996 15.883L17.191 8.383C18.4871 7.08786 18.8083 5.10828 17.9882 3.46975V3.46975C17.3765 2.24665 16.2142 1.39215 14.8643 1.17313C13.5144 0.954121 12.1415 1.3973 11.1745 2.36425L9.99996 3.538L8.82546 2.36425C7.85842 1.3973 6.48554 0.954121 5.13566 1.17313C3.78577 1.39215 2.62343 2.24665 2.01171 3.46975V3.46975C1.19274 5.10758 1.51356 7.08571 2.80821 8.38075L9.99996 15.883Z'
                  stroke='#F93C65'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            )}
          </button>
          {/* <button
            className='w-12 h-12 text-3xl rounded-full bg-accent-500 text-white hover:bg-accent-800'
            onClick={() => toggleSaved(product)}
            title='Add'
          >
            + 
          </button> */}
        </div>
      </div>
    </div>
  );
}
