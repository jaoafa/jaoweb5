<script lang="ts" setup>
const { page } = useContent()
const config = useRuntimeConfig()
const route = useRoute()

/** シェア先サービス */
const services = ['twitter', 'facebook', 'mastodon', 'misskey'] as const
</script>

<template>
  <footer v-if="page">
    <div class="grid grid-cols-1 gap-2">
      <div class="text-center text-xs">SNSでこのページをシェアする</div>
      <div class="flex items-center justify-center gap-1">
        <SocialShareItem
          v-for="item in services"
          :key="item"
          :service="item"
          :url="`${config.public.siteUrl}${
            route.path.endsWith('/') ? route.path : `${route.path}/`
          }`"
          :text="`${page?.title || ''} - ${config.public.siteName}`"
        />
      </div>
    </div>
  </footer>
</template>
