import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  required,
  minLength,
  validate,
  email as emailV,
} from '../../utils/validators.js';

export default function Signup() {
  const { signup } = useAuth();
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const rules = {
    firstName: [required],
    lastName: [required],
    email: [required, emailV],
    password: [required, minLength(6)],
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields, rules);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      setSubmitting(true);
      await signup(fields);
      navigate('/app/search', { replace: true });
    } catch (err) {
      setErrors({ form: err.message || 'Signup failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className='text-3xl font-extrabold'>Get Started</h1>

      <form onSubmit={onSubmit} className='my-8 space-y-4 max-w-md'>
        {errors.form && (
          <div className='text-sm text-red-600'>{errors.form}</div>
        )}

        <div>
          <label className='block text-sm font-medium' htmlFor='firstName'>
            First name
          </label>
          <div className='relative'>
            <input
              placeholder='First name'
              id='firstName'
              className='mt-1 w-full rounded-md border-gray-300 px-3 py-2 pr-10 focus:ring-2 bg-[#EAF0F7]'
              value={fields.firstName}
              onChange={(e) =>
                setFields({ ...fields, firstName: e.target.value })
              }
            />
            {fields.firstName && (
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setFields({ ...fields, firstName: '' })}
              >
                <svg
                  className='h-5 w-5 text-gray-400 hover:text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
          </div>
          {errors.firstName && (
            <div className='text-xs text-red-600 mt-1'>{errors.firstName}</div>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium' htmlFor='lastName'>
            Last name
          </label>
          <div className='relative'>
            <input
              id='lastName'
              placeholder='Last name'
              className='mt-1 w-full rounded-md border-gray-300 px-3 py-2 pr-10 focus:ring-2 bg-[#EAF0F7]'
              value={fields.lastName}
              onChange={(e) =>
                setFields({ ...fields, lastName: e.target.value })
              }
            />
            {fields.lastName && (
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setFields({ ...fields, lastName: '' })}
              >
                <svg
                  className='h-5 w-5 text-gray-400 hover:text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
          </div>
          {errors.lastName && (
            <div className='text-xs text-red-600 mt-1'>{errors.lastName}</div>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium' htmlFor='email'>
            Email
          </label>
          <div className='relative'>
            <input
              id='email'
              type='email'
              placeholder='Email'
              className='mt-1 w-full rounded-md border-gray-300 px-3 py-2 pr-10 focus:ring-2 bg-[#EAF0F7]'
              value={fields.email}
              onChange={(e) => setFields({ ...fields, email: e.target.value })}
            />
            {fields.email && (
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setFields({ ...fields, email: '' })}
              >
                <svg
                  className='h-5 w-5 text-gray-400 hover:text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
          </div>
          {errors.email && (
            <div className='text-xs text-red-600 mt-1'>{errors.email}</div>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium' htmlFor='password'>
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              className='mt-1 w-full rounded-md border-gray-300 px-3 py-2 pr-10 focus:ring-2 bg-[#EAF0F7]'
              value={fields.password}
              onChange={(e) =>
                setFields({ ...fields, password: e.target.value })
              }
            />
            {fields.password && (
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setFields({ ...fields, password: '' })}
              >
                <svg
                  className='h-5 w-5 text-gray-400 hover:text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
            <button
              type='button'
              className='absolute inset-y-0 right-0 pr-10 pl-3 flex items-center'
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg
                className='h-5 w-5 text-gray-400 hover:text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {showPassword ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                  />
                )}
              </svg>
            </button>
          </div>
          {errors.password && (
            <div className='text-xs text-red-600 mt-1'>{errors.password}</div>
          )}
        </div>

        <button type='submit' disabled={submitting} className='auth-btn'>
          {submitting ? 'Signing up...' : 'Signup'}
        </button>

        <div className='grid place-content-center gap-8 grid-cols-1 text-sm'>
          <div className='flex gap-2 items-center text-gray-300'>
            <hr className='flex-1 border-1 border-gray-300' />
            <span>Or continue with</span>
            <hr className='flex-1 border-1 border-gray-300' />
          </div>
          <button className='flex justify-center'>
            <svg
              width='117'
              height='60'
              viewBox='0 0 117 60'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='117' height='60' rx='10' fill='#F6F6F6' />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M72.44 30.3182C72.44 29.3255 72.3509 28.371 72.1855 27.4546H59V32.87H66.5345C66.21 34.62 65.2236 36.1028 63.7409 37.0955V40.6082H68.2655C70.9127 38.171 72.44 34.5819 72.44 30.3182Z'
                fill='#4285F4'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M59.0002 44.0002C62.7802 44.0002 65.9493 42.7465 68.2656 40.6083L63.7411 37.0956C62.4874 37.9356 60.8838 38.432 59.0002 38.432C55.3538 38.432 52.2674 35.9692 51.1665 32.6602H46.4893V36.2874C48.7929 40.8629 53.5274 44.0002 59.0002 44.0002Z'
                fill='#34A853'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M51.1664 32.6602C50.8864 31.8202 50.7273 30.9229 50.7273 30.0002C50.7273 29.0774 50.8864 28.1802 51.1664 27.3402V23.7129H46.4891C45.5409 25.6029 45 27.7411 45 30.0002C45 32.2593 45.5409 34.3974 46.4891 36.2874L51.1664 32.6602Z'
                fill='#FBBC05'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M59.0002 21.5682C61.0556 21.5682 62.9011 22.2745 64.352 23.6618L68.3674 19.6464C65.9429 17.3873 62.7738 16 59.0002 16C53.5274 16 48.7929 19.1373 46.4893 23.7127L51.1665 27.34C52.2674 24.0309 55.3538 21.5682 59.0002 21.5682Z'
                fill='#EA4335'
              />
            </svg>
          </button>
          <div className='flex gap-2 items-center text-gray-300'>
            <hr className='flex-1 border-1 border-gray-300' />
            <span>
              Already have an account?{' '}
              <Link to='/login' className='hover:underline'>
                Log in
              </Link>
            </span>
            <hr className='flex-1 border-1 border-gray-300' />
          </div>
        </div>
      </form>
    </>
  );
}
