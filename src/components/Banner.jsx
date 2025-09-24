
import React, { useState, useEffect } from 'react';

export default function Banner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className='font-Playfair lg:text-6xl md:text-4xl text-5xl text-center leading-tight'>
        The Global Fashion Search Engine
      </div>
      <div className='rounded-lg grid place-items-center text-gray-400'>
        <img
          src='/banner_img.png'
          alt='RUNNETH OVER banner'
          style={{ maxHeight: '35em' }}
          className={`transition-all duration-1000 ease-out transform scale-[1.3] md:scale-[1.5] relative top-[6em] ${
            isLoaded 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        />
      </div>
    </>
  );
}