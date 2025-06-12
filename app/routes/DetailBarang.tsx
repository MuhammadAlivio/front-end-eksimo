"use client"

import { useState } from "react"
import { Star, Minus, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

export default function Component() {
  const [selectedSize, setSelectedSize] = useState("S")
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("Black")

  const sizes = ["S", "M", "L", "XL"]
  const availableSizes = ["S", "M", "L", "XL"]

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="p-6 md:p-8">
            <div className="aspect-square relative rounded-xl overflow-hidden">
              <img src="topi.jpg" alt="Eskimo Hat" className="object-cover" />
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Title and Rating */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">The Club Eskimo</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(120 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-blue-400">RP 500.000,00</div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Size</h3>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={!availableSizes.includes(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : availableSizes.includes(size)
                          ? "border-gray-300 text-gray-700 hover:border-gray-400"
                          : "border-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Size available:</span> S, M, L, XL
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Material:</span> Cotton Combed 30s
              </div>
            </div>


            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <button onClick={decrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button onClick={incrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 bg-blue-400 text-white border-blue-400 hover:bg-blue-500 hover:border-blue-500"
              >
                Add to cart
              </Button>
              <Button size="lg" className="flex-1 bg-red-500 hover:bg-red-600">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}