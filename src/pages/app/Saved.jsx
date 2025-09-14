import { useAuth } from "../../context/AuthContext.jsx";
  import ProductCard from "../../components/ProductCard.jsx";

  export default function Saved() {
    const { saved } = useAuth();
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Saved items</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {saved.length === 0 && (
          <div className="text-sm text-gray-500">No saved items yet. Add items from the search page.</div>
        )}
      </div>
    );
  }