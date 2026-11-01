import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const count = cart.reduce((sum, item) => sum + item.qty, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((item) => item.id !== itemId))
  }

  function changeQty(itemId, newQty) {
    if (newQty <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, qty: newQty } : item
      )
    )
  }

  function placeOrder(details) {
    const order = {
      id: Date.now(),
      items: cart,
      total,
      details,
      placedAt: new Date().toISOString(),
    }
    setOrders((prev) => [order, ...prev])
    setCart([])
  }

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}