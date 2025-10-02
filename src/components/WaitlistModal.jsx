import { useState } from 'react';
import {
  required,
  validate,
  email as emailV,
} from '../utils/validators.js';

export default function WaitlistModal({ onClose }) {
  const [fields, setFields] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const rules = {
    firstname: [required],
    lastname: [required],
    email: [required, emailV],
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields, rules);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      setSubmitting(true);
      const response = await fetch('https://hook.us2.make.com/rblpfurfkphry70anti8kcg04mtbxeya', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      });
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      setSubmitted(true);
    } catch (err) {
      setErrors({ form: err.message || 'Submission failed' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p>You've been added to the waitlist.</p>
          <button onClick={onClose} className="mt-4 auth-btn">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#000000d1] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-3xl font-extrabold">Join the Waitlist</h1>
        <form onSubmit={onSubmit} className="my-8 space-y-4">
          {errors.form && (
            <div className="text-sm text-red-600">{errors.form}</div>
          )}
          <div>
            <label className="block text-sm font-medium" htmlFor="firstname">
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 bg-[#EAF0F7]"
              value={fields.firstname}
              onChange={(e) => setFields({ ...fields, firstname: e.target.value })}
            />
            {errors.firstname && (
              <div className="text-xs text-red-600 mt-1">{errors.firstname}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="lastname">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 bg-[#EAF0F7]"
              value={fields.lastname}
              onChange={(e) => setFields({ ...fields, lastname: e.target.value })}
            />
            {errors.lastname && (
              <div className="text-xs text-red-600 mt-1">{errors.lastname}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 bg-[#EAF0F7]"
              value={fields.email}
              onChange={(e) => setFields({ ...fields, email: e.target.value })}
            />
            {errors.email && (
              <div className="text-xs text-red-600 mt-1">{errors.email}</div>
            )}
          </div>
          <button type="submit" disabled={submitting} className="auth-btn w-full">
            {submitting ? 'Submitting...' : 'Join Waitlist'}
          </button>
        </form>
      </div>
    </div>
  );
}
