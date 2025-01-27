import { useState, useEffect } from "react"
import { TJobItem, TJobItemExpanded } from "./types"
import { BASE_API_URL } from "./constants"
import { useQuery } from "@tanstack/react-query"
import { handleError } from "./utils"

type JobItemApiResponse = {
  public: boolean
  jobItem: TJobItemExpanded
}

const fetchJobItem = async (id: number | null): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`)
  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.description)
  }
  const data = await response.json()
  return data
}

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError
    }
  )
  const jobItem = data?.jobItem
  const isLoading = isInitialLoading
  return { jobItem, isLoading } as const
}

type JobItemsApiResponse = {
  public: boolean
  sorted: boolean
  jobItems: TJobItem[]
}

const fetchJobItems = async (text: string): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${text}`)
  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.description)
  }
  const data = await response.json()
  return data
}

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ['job-items', searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError
    }
  )

  const jobItems = data?.jobItems
  const isLoading = isInitialLoading
  return { jobItems, isLoading } as const
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1)
      setActiveId(id)
    }
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return activeId
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timerId)
  }, [value, delay])

  return debouncedValue
}