import { Link } from 'react-router-dom';

export default function OurStory() {
  return (
    <div className='container-px py-2 text-center max-w-[75em]'>
      <h1 className='container-px lg:text-6xl md:text-4xl text-3xl  pb-8 font-Playfair'>
        Our story
      </h1>

      <article className='max-w-[65em] mt-6 leading-[2em] text-2xl'>
        <p>
          I saw the perfect pair of Balenciaga heels on Instagram and spent
          months trying to find them, reverse image searching, asking in
          comments, checking stores. Nothing. That's when I realized fashion was
          keeping us from what we really want. That frustration sparked a
          mission.{' '}
        </p>
        <p>
          Runneth Over was born to change the game. We connect you to a global
          fashion marketplace. From everyday favorites to luxury finds. Making
          it effortless to discover, track, and shop the styles you want.
        </p>
        <p>
          <b> Using smart AI-powered visual search</b>, real-time price
          tracking, and access to thousands of brands worldwide, Runneth Over
          acts like your personal fashion assistant. Helping you find exactly
          what you want, compare prices, and never miss a deal.
        </p>
        <p>
          <b>Our mission is simple:</b> to break down the barriers between
          desire and purchase, empowering you to shop smarter, more sustainably,
          and with confidence. Because your style deserves more than endless
          searching.
        </p>

        <h4 className='font-bold'>
          Welcome to Runneth Over, where your next favorite find is just a click
          away.
        </h4>
        <p className='lg:text-4xl md:text-3xl text-3xl  font-Playfair m-0'>
          Offie Udo-Umoh
        </p>
        <p className='font-Playfair m-0'>CEO & Founder</p>
      </article>
    </div>
  );
}
