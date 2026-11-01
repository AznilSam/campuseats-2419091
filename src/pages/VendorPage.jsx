import { Link, useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error } = useVendors()

  if (loading) return <p>Loading vendors...</p>
  if (error) return <p>Error: {error}</p>

  const vendor = vendors.find((v) => String(v.id) === id)

  if (!vendor) {
    return (
      <section>
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">There is no vendor with the id "{id}".</p>
        <Link to="/">Back to vendors</Link>
      </section>
    )
  }

  return (
    <section>
      <p><Link to="/">← All vendors</Link></p>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <MenuList items={vendor.menu} />
    </section>
  )
}

export default VendorPage