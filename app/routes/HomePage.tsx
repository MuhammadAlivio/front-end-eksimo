import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, User, ShoppingBag, LogOut } from "lucide-react";

const categories = [
  { id: 1, name: "Baju" },
  { id: 2, name: "Outer" },
  { id: 3, name: "Accessories" },
];

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const fetchProducts = async (categoryId?: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: No access token");
      return;
    }
    try {
      let url = "http://localhost:8080/api/customer/products";
      if (categoryId) {
        url = `http://localhost:8080/api/customer/products/category/${categoryId}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products || response.data); // sesuaikan response backend
      setError("");
    } catch (err: any) {
      setError(err.response?.data || "Failed to fetch products");
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId || undefined);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {}
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-sky-300 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-white text-2xl font-light">The Club Eskimo</h1>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-gray-100 transition-colors">
              New release
            </a>
            <a href="#" className="text-white hover:text-gray-100 transition-colors">
              Latest release
            </a>
            <a href="#" className="text-white hover:text-gray-100 transition-colors">
              Best Seller
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/cart">
              <ShoppingCart className="text-white w-6 h-6 cursor-pointer" />
            </a>
            <a href="/history">
              <ShoppingBag className="text-white w-6 h-6" />
            </a>
            <button title="Logout" onClick={handleLogout} className="bg-transparent border-none p-0 m-0" style={{ lineHeight: 0 }}>
              <LogOut className="text-white w-6 h-6 cursor-pointer" />
            </button>
          </div>
        </div>
      </header>

      {/* Filter by Category */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${selectedCategory === null ? "bg-sky-400 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => handleCategoryFilter(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded ${selectedCategory === cat.id ? "bg-sky-400 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => handleCategoryFilter(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="text-center">
              <div className="mb-6">
                <a href={`/detailBarang/${product.id}`}>
                  <img src={product.image || "/placeholder.jpg"} alt={product.name} className="w-full h-auto rounded-lg shadow-sm cursor-pointer" />
                </a>
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