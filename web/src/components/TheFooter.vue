<script lang="ts" setup>
const config = useRuntimeConfig()
const year = useDateFormat(useNow(), 'YYYY')
</script>

<template>
  <footer class="mx-auto box-content max-w-6xl px-4 py-12 md:px-6">
    <nav class="grid gap-10 pb-10 md:grid-cols-[auto_1fr] md:gap-32">
      <div class="flex flex-col items-start gap-4 md:gap-8">
        <NuxtLink
          :class="[
            'flex w-60 flex-col gap-4 text-inherit transition-opacity',
            'hover:opacity-70',
          ]"
          :title="config.public.siteName"
          :aria-label="`${config.public.siteName} homepage`"
          to="/"
        >
          <AppLogo />
          <p class="px-0.5 text-xs">ここで爆発します、あなたの可能性が。</p>
        </NuxtLink>

        <SocialLinks />
      </div>
    </nav>

    <div class="border-t border-current pt-10 text-gray-400">
      <p class="flex gap-2 text-xs">
        <span>&copy;</span>
        <span>2016-{{ year }}</span>
        <span>{{ config.public.siteName }}</span>
      </p>
    </div>
  </footer>
</template>
