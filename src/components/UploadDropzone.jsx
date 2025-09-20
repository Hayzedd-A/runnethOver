import { useRef, useState } from 'react';
import { ImagePickerIcon } from '../assets/Icons';

export default function UploadDropzone({ file, setFile }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const onSelect = (f) => {
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onSelect(f);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`border-2 h-[50vh] items-center border-dashed flex place-content-center rounded-lg p-6 mt-4 transition-colors ${
        dragActive
          ? 'border-accent-500 bg-brand-50'
          : 'border-gray-300 bg-white'
      }`}
    >
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={(e) => onSelect(e.target.files?.[0])}
      />
      <div className='flex flex-col items-center gap-5 text-center'>
        {!preview ? (
          <>
            <div className='text-3xl'>
              <img src='/imagePickerIcon.png' />
            </div>
            <p>Select Your File or Drag and drop</p>
            <p className='text-gray-400 text-sm'>png, jpg, jpeg, accepted</p>
            <button
              type='button'
              onClick={() => inputRef.current?.click()}
              className='btn text-xl py-2 px-8 bg-accent-500 font-medium hover:underline text-white'
            >
              Browse
            </button>
          </>
        ) : (
          <div className='relative mt-4 w-full max-w-[480px]'>
            <img src={preview} alt='Preview' className='h-[20em] rounded-md' />
            <button className='absolute -top-2 -right-2  ' onClick={() => setPreview(null)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M9 7.58579L12 10.5858L15 7.58579L16.4142 9L13.4142 12L16.4142 15L15 16.4142L12 13.4142L9 16.4142L7.58579 15L10.5858 12L7.58579 9L9 7.58579Z'
                  fill='black'
                />
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z'
                  fill='black'
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
