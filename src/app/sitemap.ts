import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://minhphuongltd.com'
  const locales = ['vi', 'en']
  const lastModified = new Date()

  const routes = locales.flatMap((locale) => [
    // Trang chủ
    {
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Section sản phẩm
    {
      url: `${baseUrl}/${locale}#products`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Section về chúng tôi
    {
      url: `${baseUrl}/${locale}#about`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Section chứng nhận
    {
      url: `${baseUrl}/${locale}#certifications`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Section liên hệ
    {
      url: `${baseUrl}/${locale}#contact`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ])

  return routes
}
