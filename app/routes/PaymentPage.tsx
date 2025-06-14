"use client"

import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}

interface UserProfile {
  address: string;
  name: string;
}

export default function PaymentPage({ itemId }: { itemId?: number }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch user profile (untuk shipping address)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/customer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Fetch cart items (atau single item jika checkout per item)
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (itemId) {
          // Checkout per item
          const res = await axios.get(`http://localhost:8080/api/customer/cart/item/${itemId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems([res.data]);
        } else {
          // Checkout semua cart
          const res = await axios.get("http://localhost:8080/api/customer/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems(res.data.items);
        }
      } catch {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [itemId]);

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/customer/checkout",
        {
          shippingAddress: user?.address || "",
          paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.href = "/PaymentSuccess";
    } catch (err: any) {
      alert(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Payment & Checkout</h1>

        {/* Product List */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Product to Checkout</h2>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-gray-400">No items to checkout.</div>
          ) : (
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex items-center py-4 gap-4">
                  <img
                    src={item.productImageUrl || "/placeholder.jpg"}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.productName}</div>
                    <div className="text-sm text-gray-500">
                      Qty: {item.quantity} &middot; Price:{" "}
                      {item.pricePerUnit.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {item.subtotal.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shipping Address */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          <div className="bg-gray-100 rounded p-3 text-gray-700">
            {user?.address || <span className="text-gray-400">No address found</span>}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <select
            className="border rounded p-2 w-full"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select payment method</option>
            <option value="COD">Cash on Delivery</option>
            <option value="TRANSFER">Bank Transfer</option>
            {/* Tambahkan opsi lain jika ada */}
          </select>
        </div>

        {/* Checkout Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded text-lg"
          onClick={handleCheckout}
          disabled={loading || cartItems.length === 0}
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
}