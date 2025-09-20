import { useState } from "react";
  import UploadDropzone from "../../components/UploadDropzone.jsx";
  import * as api from "../../services/api.js";
  import ProductCard from "../../components/ProductCard.jsx";

  export default function Search() {
    const [file, setFile] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onCancel = () => {
      setFile(null);
      setProducts([]);
      setError("");
    };

    const onSubmit = async () => {
      if (!file) {
        setError("Please upload an image before submitting.");
        return;
      }
      setError("");
      setLoading(true);
      try {
        const res = await api.uploadImageAndGetProducts(file);
        setProducts(res);
      } catch (e) {
        setError(e.message || "Failed to search products");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Upload your Image</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-3 py-2 text-sm rounded-md bg-brand-600 text-white hover:bg-brand-700"
              disabled={loading}
            >
              {loading ? "Searching..." : "Submit"}
            </button>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Upload an image to find products</div>
          <UploadDropzone file={file} setFile={setFile} />
          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
        </div>

        {/* <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Results</h2>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {!loading && products.length === 0 && (
            <div className="text-sm text-gray-500">No results yet. Try uploading an image.</div>
          )}
        </div> */}
      </div>
    );
  }