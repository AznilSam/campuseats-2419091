import { useEffect, useState } from 'react'
import { subscribeToVendor, subscribeToMenu } from '../services/vendors.js'

// One vendor plus its menu, both live. Two listeners, so two cleanups.
// When the category changes, only the menu listener restarts with a new query.
export function useVendor(vendorId, category = '') {
  const [vendor, setVendor] = useState(undefined) // undefined = loading, null = not found
  const [menu, setMenu] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    return subscribeToVendor(vendorId, setVendor, (err) => setError(err.message))
  }, [vendorId])

  useEffect(() => {
    return subscribeToMenu(vendorId, category, setMenu, (err) => setError(err.message))
  }, [vendorId, category])

  return { vendor, menu, loading: vendor === undefined && !error, error }
}