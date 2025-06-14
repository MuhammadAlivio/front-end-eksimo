"use client"

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

interface OrderHistoryItem {
  orderId: number;
  productName: string;
  productImage: string;
  status: string;
  total: number;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/customer/orders/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch order history");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Order History</h1>
          <a
            href="/homepage"
            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-md transition-colors"
          >
            <ArrowLeft size={16} />
            Continue shopping
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-gray-500">NO.</th>
                <th className="text-left p-4 font-medium text-gray-500">PRODUCT</th>
                <th className="text-left p-4 font-medium text-gray-500">STATUS</th>
                <th className="text-left p-4 font-medium text-gray-500">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    No order history found.
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => (
                  <tr key={order.orderId + "-" + idx} className="border-b">
                    <td className="p-4 font-medium">{idx + 1}.</td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 relative rounded overflow-hidden">
                          <img
                            src={order.productImage || "/placeholder.svg"}
                            alt={order.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{order.productName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-green-500 font-medium">{order.status}</span>
                    </td>
                    <td className="p-4 font-medium">
                      {order.total?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}