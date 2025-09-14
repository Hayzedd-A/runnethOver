import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <>
      <div className='font-Playfair text-12xl md:text-8xl text-6xl text-center leading-tight'>
        The Global Fashion <br /> search Engine
      </div>
      <div className=' rounded-lg  grid place-items-center text-gray-400'>
        <img
          src='/banner_img.png'
          alt='RUNNETH OVER banner'
          style={{ height: '60vh' }}
        />
      </div>
      {/* <div className="container-px py-20 grid lg:grid-cols-2 gap-10 items-center">
            <div>
                <p className="mt-4 text-gray-600">
                Upload an image and discover exact or similar products instantly. Save your favorites and shop smarter.
                </p>
                <div className="mt-8">
                <Link
                    to="/signup"
                    className="inline-flex items-center px-6 py-3 rounded-md bg-brand-600 text-white hover:bg-brand-700"
                >
                    Join the waitlist
                </Link>
                </div>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm">
            </div>
            </div> */}
    </>
  );
}
