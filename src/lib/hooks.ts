import { useState, useEffect } from "react"
import { TJobItem } from "./types"

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const jobitemsSliced = jobItems.slice(0, 7)

  useEffect(() => {
    if (!searchText) return
    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`)
      const data = await response.json()
      setIsLoading(false)
      setJobItems(data.jobItems)
    }
    fetchData()
  }, [searchText])

  return [ jobitemsSliced, isLoading ] as const
}
