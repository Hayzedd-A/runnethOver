import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { required, validate } from '../../utils/validators.js';
import * as api from '../../services/api.js';

export default function Account() {
  const { user, updateAccount, uploadProfileImage } = useAuth();
  const [fields, setFields] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    gender: user?.gender || 'unspecified',
    email: user?.email || '',
    avatarFile: null,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const rules = {
    firstName: [required],
    lastName: [required],
    gender: [required],
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFields({ ...fields, avatarFile: file });
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields, rules);
    setErrors(errs);
    setMsg('');
    if (Object.keys(errs).length) return;
    try {
      setSaving(true);
      
      // Upload profile image first if there's a new one
      if (fields.avatarFile) {
        await uploadProfileImage(fields.avatarFile);
      }
      
      // Update other profile fields
      await updateAccount({
        firstName: fields.firstName,
        lastName: fields.lastName,
        gender: fields.gender,
      });
      
      setMsg('Profile updated successfully');
      setFields({ ...fields, avatarFile: null });
      setPreviewUrl(null);
    } catch (error) {
      setErrors({ form: error.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  const currentAvatarUrl = previewUrl || (user?.avatarUrl ? api.getProfileImageUrl(user.avatarUrl) : null);

  return (
      <div className='bg-white flex flex-col gap-16 rounded-2xl shadow-sm p-8 h-full '>
        {/* Profile Image Upload */}
        <div className='flex flex-col items-center mb-8'>
          <div className='relative h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden'>
            {currentAvatarUrl ? (
              <img 
                src={currentAvatarUrl} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            )}
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="mt-1"
              style={{ position: 'absolute', opacity: 0, width: '80px', height: '80px', cursor: 'pointer' }}
              onChange={handleFileChange}
            />
          </div>
          <span className='mt-2 text-sm text-brand-600 '>
            Upload Photo
          </span>
        </div>

        {/* Form */}
        <form className='space-y-6 grid gap-4' onSubmit={onSubmit}>
          {msg && <div className="text-sm text-green-600 text-center">{msg}</div>}
          {errors.form && <div className="text-sm text-red-600 text-center">{errors.form}</div>}
          {/* Name Fields */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium text-gray-700'
              >
                First Name
              </label>
              <input
                id="firstName"
                className="mt-1 w-full h-16 border-gray-200 border rounded-md px-3 py-2  bg-gray-50"
                value={fields.firstName}
                onChange={(e) => setFields({ ...fields, firstName: e.target.value })}
              />
            </div>
            <div>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium text-gray-700'
              >
                Last Name
              </label>
              <input
                id="lastName"
                className="mt-1 w-full h-16 border-gray-200 border rounded-md  px-3 py-2  bg-gray-50"
                value={fields.lastName}
                onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
              />
              {errors.lastName && <div className="text-xs text-red-600 mt-1">{errors.lastName}</div>}
            </div>
          </div>

          {/* Email + Gender */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Your email
              </label>
              <input
                id='email'
                value={fields.email}
                readOnly
                placeholder='Enter your email'
                className='mt-1 block h-16 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='gender'
                className='block text-sm font-medium text-gray-700'
              >
                Gender
              </label>
              <select
                id="gender"
                className="mt-1 w-full h-16 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 "
                value={fields.gender}
                onChange={(e) => setFields({ ...fields, gender: e.target.value })}
              >
                <option value="unspecified">Unspecified</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
              {errors.gender && <div className="text-xs text-red-600 mt-1">{errors.gender}</div>}
            </div>
          </div>

          {/* Save Button */}
          <div className='flex justify-center pt-4'>
            <button
              type='submit'
              className='px-6 py-3 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-800'
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
  );
}


    // return (
    //   <div className="bg-white rounded-xl p-8 space-y-6">
    //     {/* <h1 className="text-2xl font-bold">Account</h1> */}
    //     <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
    //       {msg && <div className="text-sm text-green-700">{msg}</div>}
    //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //         <div>
    //           <label className="block text-sm font-medium" htmlFor="firstName">First name</label>
    //           <input
    //             id="firstName"
    //             className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-brand-500"
    //             value={fields.firstName}
    //             onChange={(e) => setFields({ ...fields, firstName: e.target.value })}
    //           />
    //           {errors.firstName && <div className="text-xs text-red-600 mt-1">{errors.firstName}</div>}
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium" htmlFor="lastName">Last name</label>
    //           <input
    //             id="lastName"
    //             className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-brand-500"
    //             value={fields.lastName}
    //             onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
    //           />
    //           {errors.lastName && <div className="text-xs text-red-600 mt-1">{errors.lastName}</div>}
    //         </div>
    //       </div>

    //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //         <div>
    //           <label className="block text-sm font-medium" htmlFor="gender">Gender</label>
    //           <select
    //             id="gender"
    //             className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-brand-500"
    //             value={fields.gender}
    //             onChange={(e) => setFields({ ...fields, gender: e.target.value })}
    //           >
    //             <option value="unspecified">Unspecified</option>
    //             <option value="female">Female</option>
    //             <option value="male">Male</option>
    //             <option value="non-binary">Non-binary</option>
    //             <option value="prefer-not">Prefer not to say</option>
    //           </select>
    //           {errors.gender && <div className="text-xs text-red-600 mt-1">{errors.gender}</div>}
    //         </div>

    //         <div>
    //           <label className="block text-sm font-medium" htmlFor="email">Email</label>
    //           <input
    //             id="email"
    //             className="mt-1 w-full rounded-md border-gray-200 px-3 py-2 bg-gray-50"
    //             value={fields.email}
    //             readOnly
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <label className="block text-sm font-medium" htmlFor="avatar">Profile image</label>
    //         <input
    //           id="avatar"
    //           type="file"
    //           accept="image/*"
    //           className="mt-1"
    //           onChange={(e) => setFields({ ...fields, avatarFile: e.target.files?.[0] || null })}
    //         />
    //       </div>

    //       <div className="pt-2">
    //         <button
    //           type="submit"
    //           disabled={saving}
    //           className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
    //         >
    //           {saving ? "Saving..." : "Save changes"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // );