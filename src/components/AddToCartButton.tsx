"use client"

import { useCart } from "@/store/useCart"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()

  return (
    <button 
      onClick={() => addItem({ ...product, quantity: 1 })}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-1 text-lg flex items-center justify-center"
    >
      <ShoppingCart className="w-5 h-5 mr-3" />
      Sepete Ekle
    </button>
  )
}
