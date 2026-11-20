import { useContext } from 'react'
import { CartContext } from '../context/cart-context.js'

// Custom hook for reading the cart. It also gives a clear error if the provider is missing.
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>')
  }
  return context
}
