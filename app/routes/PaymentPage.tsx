import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}

interface ProductDetail {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface UserProfile {
  address: string;
  name: string;
}

export default function PaymentPage() {
  const { id, quantity } = useParams();
  const qty = quantity ? Number(quantity) : 1;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [singleProduct, setSingleProduct] = useState<ProductDetail | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("id param:", id);

  // Fetch user profile (shipping address)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/customer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Fetch single product or cart
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (id) {
          // Mode single product
          const res = await fetch(`http://localhost:8080/api/customer/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setSingleProduct(data.product || data); // sesuaikan response backend
        } else {
          // Mode cart
          const res = await fetch("http://localhost:8080/api/customer/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setCartItems(data.items);
        }
      } catch {
        setCartItems([]);
        setSingleProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, quantity]);

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
    if (id && singleProduct) {
      const res = await fetch(
        `http://localhost:8080/api/customer/checkout/product/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            shippingAddress: user?.address || "",
            paymentMethod,
            quantity: qty,
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Checkout failed");
        return;
      }
    } else {
        // Checkout cart
        await fetch(
          "http://localhost:8080/api/customer/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              shippingAddress: user?.address || "",
              paymentMethod,
            }),
          }
        );
      }
      window.location.href = "/PaymentSuccess";
    } catch (err: any) {
      alert("Checkout failed");
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
          ) : id && singleProduct ? (
            // Mode single product
            <div className="flex items-center py-4 gap-4">
              <img
                src={singleProduct.image || "/placeholder.jpg"}
                alt={singleProduct.name}
                className="w-16 h-16 object-cover rounded border"
              />
              <div className="flex-1">
                <div className="font-medium">{singleProduct.name}</div>
                <div className="text-sm text-gray-500">
                  Qty: {qty} &middot; Price:{" "}
                  {singleProduct.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </div>
              </div>
              <div className="font-semibold text-gray-900">
                {(singleProduct.price * (qty ?? 1)).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
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
          </select>
        </div>

        {/* Checkout Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded text-lg"
          onClick={handleCheckout}
          disabled={loading || (!id && cartItems.length === 0)}
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
}