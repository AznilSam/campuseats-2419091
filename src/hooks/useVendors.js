import { useEffect, useState } from 'react'
import { subscribeToVendors } from '../services/vendors.js'

const MY_MATRIC = '2419091'

// My own shop first, then the others in alphabetical order by name.
function sortVendors(list) {
  return [...list].sort((a, b) => {
    const aMine = a.id.startsWith(MY_MATRIC) ? 0 : 1
    const bMine = b.id.startsWith(MY_MATRIC) ? 0 : 1
    if (aMine !== bMine) return aMine - bMine
    return a.name.localeCompare(b.name)
  })
}

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const unsubscribe = subscribeToVendors(
      (data) => { setVendors(sortVendors(data)); setLoading(false) },
      (err) => { setError(err.message); setLoading(false) },
    )
    return unsubscribe // stop listening when the component unmounts
  }, [reloadKey])

  return { vendors, loading, error, reload: () => setReloadKey((k) => k + 1) }
}