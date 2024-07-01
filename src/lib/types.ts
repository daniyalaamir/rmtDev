export type TJobItem = {
  id: number
  badgeLetters: string
  title: string
  company: string
  date: string
  relevanceScore: number
  daysAgo: number
}

export type TJobItemExpanded = TJobItem & {
  description: string
  qualifications: string[]
  reviews: string[]
  duration: string
  salary: string
  location: string
  coverImgURL: string
  companyURL: string
}

export type PageDirection = 'next' | 'previous'

export type SortBy = "relevant" | "recent"