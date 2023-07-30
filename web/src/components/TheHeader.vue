<script lang="ts" setup>
const { y: scrollY } = useWindowScroll()
const config = useRuntimeConfig()
const route = useRoute()

/** トップページであるか */
const isTop = computed<boolean>(() => route.path === '/')
</script>

<template>
  <header
    :class="[
      'fixed top-0 z-40 w-full transition',
      scrollY > 0 || !isTop
        ? 'bg-white/60 text-inherit shadow-md backdrop-blur'
        : 'bg-transparent text-white',
    ]"
  >
    <div
      :class="[
        'm-auto box-content flex items-center justify-between px-4 py-3 md:py-4',
        isTop ? 'md:px-16' : 'max-w-6xl md:px-6',
      ]"
    >
      <NuxtLink
        :title="config.public.siteName"
        :aria-label="`${config.public.siteName} homepage`"
        class="w-36 transition-opacity hover:opacity-70 md:w-48"
        to="/"
      >
        <AppLogo />
      </NuxtLink>
    </div>
  </header>
</template>
