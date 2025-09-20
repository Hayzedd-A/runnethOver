import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Pictures = {
  signup: '/login_image.png',
  login: '/signup_image.png',
};
function AuthContainer() {
  const [sideImage, setSideImage] = useState('');
  const location = useLocation();
  useEffect(() => {
    const pathname = location.pathname.substring(1);
    setSideImage(Pictures[pathname]);
  }, [location.pathname]);
  return (
    <div className='bg-white min-h-screen grid md:grid-cols-2'>
      <div className='p-8'>
        <header className=''>
          <div className='container-px h-16 flex items-center justify-between'>
            <Link to='/' className='flex items-center gap-2 h-4'>
              {/* <div className="w-8 h-8 rounded bg-brand-600" aria-hidden /> */}
              <img
                src='/logo_name.png'
                alt='RUNNETH OVER'
                className='h-8 sm:h-10 lg:h-12'
              />
            </Link>
          </div>
        </header>
        <div className='relative left-[-50%] translate-x-[50%] h-[93%] md:p-12 flex flex-col justify-center'>
          <Outlet />
        </div>
      </div>
      <div className='hidden md:block rounded-bl-3xl rounded-tl-3xl overflow-auto'>
        <div
          className='w-full h-full bg-cover bg-center'
          style={{
            backgroundImage: sideImage ? `url('${sideImage}')` : 'none',
          }}
        />
      </div>
    </div>
  );
}

export default AuthContainer;
