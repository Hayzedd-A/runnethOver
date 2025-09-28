// import { Link } from 'react-router-dom';
import { Upload, Search, Buy, Line } from '../../components/Svgs.jsx';

const steps = [
  {
    svg: <Upload />,
    title: 'Upload',
    desc: 'Take a screenshot or upload any fashion photo. Our AI instantly identifies clothing and style details.',
    img: '/how_1.png',
  },
  {
    svg: <Search />,
    title: 'AI Search',
    desc: 'We scan thousands of brands worldwide - from $10 gems to luxury icons. High street of high fashion? It\'s all here.',
    img: '/how_2.png',
  },
  {
    svg: <Buy />,
    title: 'Shop and save',
    desc: 'Compare prices and save items you love for later.',
    img: '/how_3.png',
  },
];

export default function HowItWorks() {
  return (
    <div className='container-px py-2'>
      <h1 className='container-px lg:text-8xl md:text-6xl text-4xl pb-8 font-Playfair'>
        How Runneth <br /> Over works
      </h1>
      {/* <div className="flex items-center justify-between">
        </div> */}

      <div className='container-px my-8 place-content-center grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-1 gap-6'>
        {steps.map((s) => (
          <div className='justify-center grid place-content-center'>
            <div className='flex justify-center'>
              <div key={s.title} className='text-center  bg-white w-[20em] h-[15em] p-8'>
                <div className='flex justify-center text-3xl'>{s.svg}</div>
                <div className='mt-3 font-semibold'>{s.title}</div>
                <div className='text-sm text-gray-600 mt-1'>{s.desc}</div>
              </div>
            </div>
            <div className='flex justify-center'>
              <Line />
            </div>
            <img src={s.img} alt={s.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

// const Desc = ({icon, title, desc}) => {
//   return <div>
//     <div className='text-3xl'><icon/></div>
//     <div className='mt-3 font-semibold'>{title}</div>
//     <div className='text-sm text-gray-600 mt-1'>{desc}</div>
//   </div>
// }
