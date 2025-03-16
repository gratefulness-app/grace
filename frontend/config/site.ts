import { SiteConfig } from "@/lib/types/site";
import type { Metadata } from "next";

export const siteConfig: SiteConfig = {
  name: "Grace App",
  author: "Gratefulness App Team",
  description: "Send your thanks to someone while contributing to the betterment of the world. An open source card sending and receiving app. ",
  keywords: [
    "Next.js",
    "React",
    "TailwindCSS",
    "shadcn/ui",
    "Next15",
    "Grace App",
    "Open Source",
    "Card Creation",
    "Card Sharing",
  ],
  url: {
    base: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    author: "https://github.com/gratefulness-app",
  },
  links: {
    github: "https://github.com/gratefulness-app/grace",
  },
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL}/transact_landing.jpg`,
}

export const MetadataConfig: Metadata = {
  metadataBase: new URL(siteConfig.url.base),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url.base,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.author,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};