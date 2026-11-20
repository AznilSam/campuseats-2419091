import { useEffect, useState } from 'react'

// Custom hook: works like useState, but the value is saved in localStorage
// so it survives a page refresh. A custom hook is just a function whose name starts with "use"
// and that calls other hooks.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or blocked: keep working in memory
    }
  }, [key, value])

  return [value, setValue]
}
