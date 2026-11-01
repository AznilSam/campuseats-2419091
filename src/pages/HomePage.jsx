import { useVendors } from '../hooks/useVendors.js'
import VendorCard from '../components/VendorCard.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <p>Loading vendors...</p>

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button type="button" className="btn" onClick={reload}>Try again</button>
      </div>
    )
  }

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  )
}

export default HomePage