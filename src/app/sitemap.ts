import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://minhphuongltd.com'
  const lastModified = new Date()

  return [
    {
      url: `${baseUrl}/vi`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ]
}
