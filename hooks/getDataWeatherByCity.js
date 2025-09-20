"use client"
import { useState, useCallback,useEffect } from "react"

// helper buat cek object kosong
const isObjectEmpty = (obj) => obj && Object.keys(obj).length === 0

export default function useGetData() {
  const [data, setData] = useState([null])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  
  const getData = useCallback(
    async (apiURL, isLoadingInside = false, isForceCallAndSave = false, callBack) => {
      const city = typeof window !== "undefined" ? localStorage.getItem("city") || "Jakarta" : "Jakarta"

      async function callAndSave() {
        try {
          const res = await apiURL(city)
          if (callBack) callBack(res)

          if (Array.isArray(res)) {
            setData(res)
          } else if (isObjectEmpty(res)) {
            setData([])
          } else {
            setData(res)
          }
        } catch (err) {
          console.error("Error fetching data:", err)
          setError(err)
        }
      }

      if (isObjectEmpty(data) || isForceCallAndSave) {
        if (isLoadingInside) {
          setIsLoading(true)
          try {
            await callAndSave()
          } finally {
            setIsLoading(false)
          }
        } else {
          await callAndSave()
        }
      }
    },
    [data]
  )

  return [data, getData, isLoading, error]
}
