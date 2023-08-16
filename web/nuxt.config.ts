// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path'
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%pageTitle',
    },
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: 'dark-plus',
    },
    sources: {
      content: {
        driver: 'fs',
        base: resolve(__dirname, './content'),
      },
    },
  },
  css: ['@/assets/tailwind.css'],
  devtools: { enabled: true },
  eslint: {
    lintOnStart: false,
  },
  extends: ['nuxt-seo-kit'],
  modules: [
    '@nuxt/content',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@vueuse/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://jaoafa.com',
      siteName: 'jao Community Server',
      siteDescription:
        'ここで爆発します、あなたの可能性が。jao Community Server は、やべーやつらが生息し独特で最高にイカしたコミュニティです。',
      language: 'ja',
      trailingSlash: true,
      gtm: 'GTM-58VVRGD',
    },
  },
  srcDir: 'src/',
  stylelint: {
    lintOnStart: false,
  },
  typescript: {
    shim: false,
    strict: true,
  },
})
