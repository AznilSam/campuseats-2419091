import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return <p className="muted">You have not placed any orders yet.</p>
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      {orders.map((order) => (
        <article key={order.id} className="card">
          <h3>Order for {order.details.name}</h3>
          <p className="muted">
            {new Date(order.placedAt).toLocaleString()} · Mahallah {order.details.mahallah} · Pickup {order.details.pickupTime}
          </p>
          <ul>
            {order.items.map((line) => (
              <li key={line.id}>
                {line.qty} × {line.name} (RM {(line.price * line.qty).toFixed(2)})
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
        </article>
      ))}
    </section>
  )
}

export default OrdersPage