<script lang="ts" setup>
const config = useRuntimeConfig()
const app = useAppConfig()
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

      <div>
        <ul class="grid grid-cols-fill-40 gap-x-8 gap-y-6">
          <li
            v-for="item in app.navigation"
            :key="item.to"
            class="flex flex-col items-start gap-3"
          >
            <NuxtLink
              :to="item.to"
              :class="[
                'relative pb-1',
                'after:absolute after:bottom-0 after:left-0',
                'after:block after:h-0.5 after:w-full',
                'after:origin-right after:bg-primary-600',
                'after:scale-x-0 after:scale-y-100 after:transition-transform',
                'hover:after:origin-left hover:after:scale-x-100',
              ]"
            >
              <span class="text-sm font-bold">{{ item.label }}</span>
            </NuxtLink>

            <ul
              v-if="item.children.length"
              class="flex flex-col items-start gap-2"
            >
              <li v-for="child in item.children" :key="child.to">
                <NuxtLink
                  :to="child.to"
                  class="block transition-opacity hover:opacity-70"
                >
                  <span class="text-xs">{{ child.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
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
