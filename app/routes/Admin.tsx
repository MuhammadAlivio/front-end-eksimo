import { useState, useEffect } from "react";
import { ShoppingBag, ShoppingCart, User, Plus, Minus } from "lucide-react";
import { Button } from "../components/ui/button";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

interface OrderAdmin {
  orderId: number;
  customerName: string;
  username: string;
  status: string;
  totalPrice: number;
  totalAmount: number;
  orderDate: string;
}

function formatPrice(price: number) {
  return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderAdmin[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/admin/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.products);
      } catch (err: any) {
        console.error("Failed to fetch products:", err);
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/admin/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchProducts();
    fetchOrders();
  }, []);

  // Pindahkan handleDeleteProduct ke sini!
  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:8080/api/admin/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      alert("Product deleted successfully");
    } catch (err: any) {
      alert(
        "Failed to delete product: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-400 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-400 font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin</h1>
              <p className="text-sm opacity-90">The Club Eskimo</p>
            </div>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:opacity-80 transition-opacity">
              New release
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Latest release
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Categories
            </a>
          </nav>
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <ShoppingBag className="w-6 h-6 cursor-pointer hover:opacity-80" />
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:opacity-80" />
            <User className="w-6 h-6 cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Products Header */}
          <div className="bg-blue-300 text-white p-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="font-medium">Product Name</div>
              <div className="font-medium text-center">Price</div>
              <div className="font-medium text-center">Stock</div>
              <div className="font-medium text-center">Actions</div>
            </div>
          </div>
          {/* Button add product */}
          <div className="flex items-center justify-between bg-blue-300 text-white p-4">
            <div className="font-medium text-lg">Product List</div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => (window.location.href = "/product")}
            >
              + Add Product
            </button>
          </div>
          {/* Products List */}
          <div className="divide-y divide-gray-200">
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <div className="grid grid-cols-4 gap-4 items-center">
                  {/* Product Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                  </div>
                  {/* Price */}
                  <div className="text-center font-medium text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                  {/* Stock Info */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-semibold text-lg">
                      {product.stock}
                    </span>
                    {product.stock > 10 ? (
                      <span className="mt-1 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 font-semibold">
                        In Stock
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="mt-1 px-2 py-0.5 text-xs rounded bg-yellow-100 text-yellow-700 font-semibold">
                        Low Stock
                      </span>
                    ) : (
                      <span className="mt-1 px-2 py-0.5 text-xs rounded bg-red-100 text-red-700 font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  {/* Actions */}
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        (window.location.href = `/product/${product.id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
          <div className="bg-blue-300 text-white p-4">
            <div className="grid grid-cols-6 gap-4">
              <div className="font-medium">Order ID</div>
              <div className="font-medium">Customer Name</div>
              <div className="font-medium">Username</div>
              <div className="font-medium">Status</div>
              <div className="font-medium">Total Price</div>
              <div className="font-medium">Order Date</div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.orderId} className="p-4">
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div>{order.orderId}</div>
                  <div>{order.customerName}</div>
                  <div>{order.username}</div>
                  <div>{order.status}</div>
                  <div>{formatPrice(order.totalPrice)}</div>
                  <div>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleString()
                      : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
