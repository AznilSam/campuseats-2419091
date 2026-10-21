import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'

  // Load vendors from public/api/vendors.json
  useEffect(() => {
    fetch('/api/vendors.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load vendors')
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) {
          setSelectedVendorId(data[0].id)
        }
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // Add item to cart (if it is already there, increase the quantity)
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id)
      if (existing) {
        return prevCart.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        )
      }
      return [...prevCart, { ...item, qty: 1 }]
    })
  }

  // Change item quantity
  function handleChangeQty(itemId, newQty) {
    if (newQty <= 0) {
      handleRemove(itemId)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, qty: newQty } : item
      )
    )
  }

  // Remove item from cart
  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  // Place order
  function handlePlaceOrder() {
    setCart([])
    setView('done')
  }

  // Total quantity of items in cart
  const cartCount = cart.reduce((total, item) => total + item.qty, 0)

  let content

  if (loading) {
    content = <p>Loading vendors...</p>
  } else if (error) {
    content = <p>Error: {error}</p>
  } else if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <section>
        <h2 className="section-title">Order placed!</h2>
        <p>Your order has been placed successfully.</p>
        <button onClick={() => setView('menu')}>Back to Menu</button>
      </section>
    )
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>

          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>

            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />

      <main className="container">{content}</main>

      <Footer />
    </>
  )
}

export default App