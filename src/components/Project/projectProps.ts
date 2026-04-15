export interface Project {
  date: {
    start: string
    end: string
  }
  title: string
  role: string
  description: string
  skills: string[]
  image: { src: string }[]
  site?: { url: string; label: string }[]
}
