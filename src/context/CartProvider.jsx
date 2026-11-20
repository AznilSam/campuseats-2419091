import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { auth, db } from '../firebase.js'

// CartProvider owns the cart and the orders, and shares them with every component below it.
// The cart stays in localStorage. Orders are saved in Firestore.
export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(null)

  // Know who is signed in
  useEffect(() => onAuthStateChanged(auth, setUser), [])

  // Load the signed-in user's orders from Firestore
  useEffect(() => {
    if (!user) {
      setOrders([])
      return
    }
    const q = query(collection(db, 'orders'), where('userId', '==', user.uid))
    return onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }))
        list.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
        setOrders(list)
      },
      (err) => console.error('Could not load orders:', err),
    )
  }, [user])

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) => (line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line))
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) => (line.item.id === itemId ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0),
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  async function placeOrder(details) {
    if (!user) throw new Error('Please sign in first')

    const order = {
      createdAt: new Date().toISOString(),
      ...details,
      lines: cart,
      total: cart.reduce((sum, line) => sum + line.item.price * line.qty, 0),
      userId: user.uid,
    }

    // JSON round trip removes undefined values, which Firestore rejects
    const clean = JSON.parse(JSON.stringify(order))
    const ref = await addDoc(collection(db, 'orders'), clean)

    setCart([])
    return { ...clean, id: ref.id }
  }

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  const value = { cart, orders, count, total, addToCart, changeQty, removeFromCart, placeOrder }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
