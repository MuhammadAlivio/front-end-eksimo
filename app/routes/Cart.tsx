"use client"

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "../components/ui/button"

export default function Component() {
  const [shippingMode, setShippingMode] = useState("store-pickup")

  // Sample cart data - empty for now as shown in image
  const cartItems: any = []

  const subtotal = 0
  const shippingCost = shippingMode === "store-pickup" ? 0 : 25000
  const total = subtotal + shippingCost

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">My Cart</h1>
          <Button variant="outline" className="bg-blue-200 border-blue-200 text-gray-700 hover:bg-blue-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue shopping
          </Button>
        </div>

        {/* Cart Table */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">PRODUCT</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide text-center">PRICE</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide text-center">QTY</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide text-right">TOTAL</div>
          </div>

          {/* Cart Items */}
          <div className="p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm mt-2">Add some items to get started</p>
              </div>
            ) : (
              cartItems.map((item: any, index: any) => (
                <div key={index} className="grid grid-cols-4 gap-4 py-4 border-b border-gray-100 last:border-b-0">
                  {/* Product details would go here */}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Shipping and Checkout Section */}
        <div className="bg-gray-200 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Shipping Options */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose shipping mode:</h3>

              <div className="space-y-3">
                {/* Store Pickup */}
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="shipping"
                      value="store-pickup"
                      checked={shippingMode === "store-pickup"}
                      onChange={(e) => setShippingMode(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        shippingMode === "store-pickup" ? "bg-red-500 border-red-500" : "border-gray-400"
                      }`}
                    >
                      {shippingMode === "store-pickup" && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <span className="ml-3 text-gray-900 font-medium">
                    Store pickup <span className="text-gray-600">(FREE)</span>
                  </span>
                </label>

                {/* Home Delivery */}
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="shipping"
                      value="home-delivery"
                      checked={shippingMode === "home-delivery"}
                      onChange={(e) => setShippingMode(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        shippingMode === "home-delivery" ? "bg-red-500 border-red-500" : "border-gray-400"
                      }`}
                    >
                      {shippingMode === "home-delivery" && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <span className="ml-3 text-gray-900 font-medium">
                    Delivery at home <span className="text-gray-600">(2 - 4 day)</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">SUBTOTAL</span>
                <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">SHIPPING</span>
                <span className="font-medium text-gray-900">
                  {shippingMode === "store-pickup" ? "FREE" : formatPrice(shippingCost)}
                </span>
              </div>

              <hr className="border-gray-300" />

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">TOTAL</span>
                <span className="font-bold text-gray-900 text-lg">{formatPrice(total)}</span>
              </div>

              <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 mt-6" size="lg">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
