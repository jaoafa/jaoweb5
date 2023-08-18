<script lang="ts" setup>
type TheSeoSlots = {
  default?: (props: object) => unknown
}

const { page } = useContent()
const config = useRuntimeConfig()
const route = useRoute()

/** 開発環境であるか */
const isDevelopment = process.env.NODE_ENV === 'development'
/** 構造化データ */
const schema = await useAsyncData('schema-org', () => {
  // パンくずリストを生成
  const items: string[] = (page.value?._path || '')
    // 現在のパスをスラッシュで区切って配列にする
    .split('/')
    // 配列から空の項目を削除
    .filter((item: string) => item)
    // それぞれの項目をルートからのパスに変更する
    .reduce((prev: string[], current: string) => {
      if (prev.length) {
        return [...prev, `${prev[prev.length - 1]}/${current}`]
      } else {
        return [`/${current}`]
      }
    }, [])
  return queryContent()
    .where({ _path: { $in: ['/', ...items] } })
    .only(['_path', 'title'])
    .sort({ _path: 1 })
    .find()
}).then((data) => {
  return [
    defineBreadcrumb({
      itemListElement: (data.data.value ?? []).map((item) => ({
        name: item.title,
        item: item._path.endsWith('/') ? item._path : `${item._path}/`,
      })),
    }),
  ] as ReturnType<typeof defineBreadcrumb>[]
})

if (page.value) {
  useSchemaOrg(schema)
}

defineSlots<TheSeoSlots>()
useHead({
  htmlAttrs: {
    prefix: 'og: https://ogp.me/ns#',
  },
  meta: [
    { name: 'theme-color', content: '#ffb41d' },
    { name: 'application-name', content: config.public.siteName },
    { name: 'apple-mobile-web-app-title', content: config.public.siteName },
    { name: 'msapplication-Config', content: '/browserconfig.xml' },
    { name: 'msapplication-TileColor', content: '#ffb41d' },
  ],
  link: [
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#a83d3d' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
  ],
  script: isDevelopment
    ? []
    : [
        {
          key: 'gtm',
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config.public.gtm}');`,
        },
      ],
  noscript: isDevelopment
    ? []
    : [
        {
          key: 'gtm',
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.public.gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ],
})
useServerSeoMeta({
  ogType: route.path === '/' ? 'website' : 'article',
  ogImage: `${config.public.siteUrl}/ogp.png`,
})
</script>

<template>
  <slot />
</template>
