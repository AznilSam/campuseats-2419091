import { Link, useParams, useSearchParams } from 'react-router'
import { useVendor } from '../hooks/useVendor.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const cat = searchParams.get('cat') ?? ''
  const { vendor, menu, loading, error } = useVendor(id, cat)

  function pickCategory(value) {
    if (value) {
      setSearchParams({ cat: value })
    } else {
      setSearchParams({}) // "All" removes ?cat= from the URL
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />
  if (!vendor) return <p>Vendor not found. <Link to="/">Back to vendors</Link></p>

  // Each cart line must know its vendor, so orders can be split per vendor.
  const items = menu.map((item) => ({ ...item, vendorName: vendor.name }))
  const categories = vendor.categories ?? []

  return (
    <section>
      <p><Link to="/">← All vendors</Link></p>
      <h2 className="section-title">Menu: {vendor.name}</h2>

      <div className="filter-bar">
        <button
          type="button"
          className={cat === '' ? 'chip active' : 'chip'}
          aria-pressed={cat === ''}
          onClick={() => pickCategory('')}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={cat === c ? 'chip active' : 'chip'}
            aria-pressed={cat === c}
            onClick={() => pickCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="muted">No items in this category.</p>
      ) : (
        <MenuList items={items} />
      )}
    </section>
  )
}

export default VendorPage