import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, User, ShoppingBag } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No access token");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/customer/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data.products);
      } catch (err: any) {
        setError(err.response?.data || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-sky-300 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-white text-2xl font-light">The Club Eskimo</h1>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-gray-100 transition-colors">New release</a>
            <a href="#" className="text-white hover:text-gray-100 transition-colors">Latest release</a>
            <a href="#" className="text-white hover:text-gray-100 transition-colors">Categories</a>
          </nav>
          <div className="flex items-center space-x-4">
            <ShoppingCart className="text-white w-6 h-6" />
            <User className="text-white w-6 h-6" />
            <ShoppingBag className="text-white w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <div key={product.id} className="text-center">
              <div className="mb-6">
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              <h2 className="text-xl font-normal text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm">Rp {product.price.toLocaleString()}</p>
              <p className="text-gray-500 text-xs mt-1">{product.category?.name}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
