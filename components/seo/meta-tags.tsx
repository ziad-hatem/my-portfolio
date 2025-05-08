import Head from "next/head"

interface MetaTagsProps {
  title: string
  description: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  canonicalUrl?: string
}

export default function MetaTags({
  title,
  description,
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
}: MetaTagsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://your-portfolio-domain.com"
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical Link */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
    </Head>
  )
}
