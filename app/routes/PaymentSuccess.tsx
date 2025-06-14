"use client"

import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <CheckCircle2 className="text-green-500" size={80} />
      <h1 className="text-3xl font-bold mt-4 mb-2 text-green-700">Payment Successful!</h1>
      <p className="text-gray-700 mb-6">Thank you for your order. Your payment has been received and your order is being processed.</p>
      <a
        href="/history"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition"
      >
        View Order History
      </a>
    </div>
  );
}