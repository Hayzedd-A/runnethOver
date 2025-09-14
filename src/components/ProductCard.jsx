import { useAuth } from "../context/AuthContext.jsx";

  export default function ProductCard({ product }) {
    const { toggleSaved, isSaved } = useAuth();
    const saved = isSaved(product.id);

    return (
      <div className="border rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow">
        <div className="aspect-square bg-gray-100">
          {/* In real app, use product.image url */}
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-gray-400">No image</div>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-sm font-semibold line-clamp-1">{product.name}</div>
              <div className="text-xs text-gray-500 line-clamp-1">{product.brand}</div>
            </div>
            <button
              onClick={() => toggleSaved(product)}
              aria-label={saved ? "Remove from saved" : "Save item"}
              className={`text-lg ${saved ? "text-pink-600" : "text-gray-400 hover:text-gray-600"}`}
              title="Save"
            >
              {saved ? "💖" : "🤍"}
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="font-bold">${product.price?.toFixed(2) ?? "0.00"}</div>
            <button
              className="px-2 py-1 text-sm rounded-md bg-brand-600 text-white hover:bg-brand-700"
              onClick={() => toggleSaved(product)}
              title="Add"
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    );
  }