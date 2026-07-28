export interface Performance {
  id: string
  date: string
  venue: string
  event: string
  description: string
  tags: Array<'performance' | 'workshop' | 'community'>
  images: string[]
  link?: string
}

export interface Video {
  id: string
  title: string
  date: string
  description: string
  posterUrl: string
  videoUrl?: string
  embedId?: string
  duration: string
  type: 'self-hosted' | 'youtube' | 'vimeo'
}

export interface Press {
  id: string
  publication: string
  headline: string
  excerpt: string
  date: string
  logoUrl?: string
  externalUrl: string
  isFeatured: boolean
  fullText?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
