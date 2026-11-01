import { useEffect, useState } from 'react'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetch('/api/vendors.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load vendors')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setVendors(data)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  function reload() {
    setLoading(true)
    setError(null)
    setReloadKey((k) => k + 1)
  }

  return { vendors, loading, error, reload }
}