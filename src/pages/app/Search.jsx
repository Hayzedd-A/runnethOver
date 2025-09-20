import { useState } from 'react';
import UploadDropzone from '../../components/UploadDropzone.jsx';
import * as api from '../../services/api.js';
import ProductCard from '../../components/ProductCard.jsx';

export default function Search() {
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onCancel = () => {
    setFile(null);
    setProducts([]);
    setError('');
  };

  const onSubmit = async () => {
    if (!file) {
      setError('Please upload an image before submitting.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.uploadImageAndGetProducts(file);
      setProducts(res);
    } catch (e) {
      setError(e.message || 'Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>{products.length ? "Results" : "Upload your Image"}</h1>
      </div>

      {products.length <= 0 ? (
        <>
          <div>
            {/* <div className="text-sm text-gray-600">Upload an image to find products</div> */}
            <UploadDropzone file={file} setFile={setFile} />
            {error && <div className='text-sm text-red-600 mt-2'>{error}</div>}
          </div>
          <div className='flex items-center flex-row-reverse gap-2'>
            <button
              onClick={onSubmit}
              className='px-8 py-2 text-sm rounded-md bg-accent-500 text-white hover:bg-accent-800'
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              onClick={onCancel}
              className='px-8 py-2 text-sm rounded-md border hover:bg-gray-50'
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className='mt-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {!loading && products.length === 0 && (
            <div className='text-sm text-gray-500'>
              No results yet. Try uploading an image.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
