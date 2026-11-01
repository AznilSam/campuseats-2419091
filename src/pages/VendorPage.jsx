import { Link, useParams, useSearchParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'

function VendorPage() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
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

  const categories = [...new Set(vendor.menu.map((item) => item.category))]

  const cat = searchParams.get('cat')
  const activeCat = categories.includes(cat) ? cat : ''

  const visibleItems = activeCat
    ? vendor.menu.filter((item) => item.category === activeCat)
    : vendor.menu

  function chooseCategory(category) {
    if (category === '') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: category })
    }
  }

  return (
    <section>
      <p><Link to="/">← All vendors</Link></p>
      <h2 className="section-title">Menu: {vendor.name}</h2>

      <div className="filters">
        <button
          type="button"
          className={activeCat === '' ? 'chip active' : 'chip'}
          onClick={() => chooseCategory('')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCat === category ? 'chip active' : 'chip'}
            onClick={() => chooseCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <MenuList items={visibleItems} />
    </section>
  )
}

export default VendorPage