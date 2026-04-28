export interface Project {
  date: {
    start: string
    end: string
  }
  title: string
  role: string
  description: string
  skills: string[]
  image?: {
    src: string
    caption: string
    group?: string
    orientation?: 'landscape' | 'portrait'
  }[]
  site?: { url: string; label: string }[]
}
