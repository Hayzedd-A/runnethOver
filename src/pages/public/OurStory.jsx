import { Link } from "react-router-dom";

  export default function OurStory() {
    return (
      <div className="container-px py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Our story</h1>
          <Link to="/signup" className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">
            Join the waitlist
          </Link>
        </div>

        <article className="prose max-w-none mt-6">
          <p>
            RUNNETH OVER started with a simple idea: shopping should be as easy as showing a photo.
            We combine computer vision with affiliate integrations to help you discover and buy
            products you love, faster.
          </p>
          <p>
            We’re building with a privacy-first mindset and a focus on delightful UX. Join our waitlist
            and help shape the future of visual shopping.
          </p>
        </article>
      </div>
    );
  }