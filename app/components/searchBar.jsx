"use client"

import { useState,useEffect } from "react"

export function SearchBar({ onSearch,isLoading }) {
  const [city, setCity] = useState("")
  
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!city) return

    localStorage.setItem("city", city)

    onSearch(city)
  }

  useEffect(() => {
    if (!isLoading) {
      setCity("")
    }
  }, [isLoading])

  return (
    <header className="flex items-center justify-between gap-4">
      <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-2/3">
        <input
          type="text"
          placeholder="Search for cities..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 w-full focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Search
        </button>
      </form>
    </header>
  )
}
