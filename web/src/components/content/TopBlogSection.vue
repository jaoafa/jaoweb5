<script lang="ts" setup>
import { ArrowRightCircleIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <section class="pb-20 pt-24 md:pt-40">
    <div class="m-auto box-content max-w-6xl px-4 md:px-6">
      <div class="font-accent flex items-center justify-between">
        <h2 class="text-5xl font-black md:text-6xl">Blog</h2>
        <NuxtLink
          to="/blog/"
          :class="[
            'flex items-center gap-4',
            'relative overflow-hidden rounded-3xl bg-gray-100 px-6 py-2',
            'before:absolute before:inset-0 before:z-0',
            'before:m-auto before:aspect-square before:w-full',
            'before:pointer-events-none before:rounded-full before:bg-primary-600',
            'before:scale-0 before:transition-transform',
            'hover:before:scale-100',
          ]"
        >
          <span class="z-10">view more</span>
          <ArrowRightCircleIcon class="z-10 h-5 w-5" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
