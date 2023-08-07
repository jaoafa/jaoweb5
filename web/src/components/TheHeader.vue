<script lang="ts" setup>
const { y: scrollY } = useWindowScroll()
const config = useRuntimeConfig()
const route = useRoute()

const [open, toggle] = useToggle(false)

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

      <button
        :class="[
          'relative aspect-square w-9 overflow-hidden rounded-full md:w-12',
          'hover:text-white',
          'before:absolute before:inset-0 before:m-auto',
          'before:rounded-full before:bg-gray-900',
          'before:scale-0 before:transition-transform before:ease-out',
          'hover:before:scale-100',
          '[&>span]:absolute [&>span]:inset-x-0 [&>span]:m-auto',
          '[&>span]:h-0.5 [&>span]:bg-current',
          '[&>span]:duration-300 [&>span]:ease-in-out',
          open ? 'text-white before:scale-100' : '',
        ]"
        aria-label="toggle navigation"
        @click="() => toggle()"
      >
        <span :class="`${open ? 'top-1/2 w-0' : 'top-[35%] w-1/2'}`" />
        <span :class="`top-1/2 w-1/2 ${open ? 'rotate-45' : ''}`" />
        <span :class="`top-1/2 w-1/2 ${open ? '-rotate-45' : ''}`" />
        <span :class="`${open ? 'top-1/2 w-0' : 'top-[65%] w-1/2'}`" />
      </button>
    </div>
  </header>
</template>
