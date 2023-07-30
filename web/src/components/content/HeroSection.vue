<script lang="ts" setup>
import { siDiscord } from 'simple-icons'

const config = useRuntimeConfig()
const app = useAppConfig()

/** 表示する画像のパス */
const images: [string, string, string] = [
  '/images/main01',
  '/images/main02',
  '/images/main03',
]
/** 現在表示している画像 */
const currentImage = ref<0 | 1 | 2>(0)
/** 表示時間の経過割合 */
const currentRatio = ref<number>(0)

useIntervalFn(() => {
  if (currentRatio.value >= 1) {
    currentImage.value =
      currentImage.value === 2
        ? 0
        : ((currentImage.value + 1) as typeof currentImage.value)
    currentRatio.value = 0
  } else {
    currentRatio.value = currentRatio.value + 0.01
  }
}, 100)
</script>

<template>
  <section class="grid h-[100svh] overflow-hidden">
    <div class="z-10 col-start-1 row-start-1 m-auto w-full px-4 md:px-16">
      <div class="flex flex-col items-center gap-8 md:gap-16">
        <div class="flex flex-col items-center gap-4 text-center text-white">
          <span class="text-base font-bold md:text-3xl">
            <slot />
          </span>
          <span class="font-accent text-5xl font-black md:text-7xl lg:text-8xl">
            {{ config.public.siteName }}
          </span>
        </div>

        <NuxtLink
          :class="[
            'relative flex items-center gap-2 overflow-hidden rounded-3xl border-2 border-white bg-black/30 px-4 py-2 text-white',
            'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:m-auto before:aspect-square before:w-full before:scale-0 before:rounded-full before:bg-[#5865f2] before:transition-transform',
            'hover:before:scale-100',
          ]"
          :to="app.social.discord.url"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="relative z-10 h-6 w-6 fill-current"
          >
            <path :d="siDiscord.path" />
          </svg>
          <span class="relative z-10 leading-none">Discord に参加</span>
        </NuxtLink>
      </div>
    </div>

    <div
      class="z-10 col-start-1 row-start-1 mb-16 ml-16 mr-auto mt-auto hidden text-white md:block"
    >
      <SocialLinks direction="column" />
    </div>

    <div class="relative z-0 col-start-1 row-start-1 h-full w-full">
      <picture
        v-for="n in 3"
        :key="n"
        :class="['absolute inset-0 h-full w-full']"
      >
        <source
          :srcset="`${images[n - 1]}/856w.webp 856w`"
          media="(max-width:856px)"
          sizes="100vw"
        />
        <source
          :srcset="`${images[n - 1]}/1200w.webp 1200w`"
          media="(max-width:1200px)"
          sizes="100vw"
        />
        <source
          :srcset="`${images[n - 1]}/1620w.webp 1620w`"
          media="(max-width:1620px)"
          sizes="100vw"
        />
        <img
          :src="`${images[n - 1]}/1920w.webp`"
          :class="[
            'h-full w-full object-cover',
            currentImage === n - 1
              ? 'opacity-100 transition-transform'
              : 'opacity-0 transition-opacity',
          ]"
          :style="{
            transform: `scale(${
              currentImage === n - 1 ? 1 + currentRatio / 2 : 1
            })`,
          }"
          alt=""
          sizes="100vw"
        />
      </picture>
    </div>

    <div class="z-10 col-start-1 row-start-1 mx-auto mb-16 mt-auto md:mr-16">
      <div class="flex w-72 gap-2 md:w-96">
        <div
          v-for="n in 3"
          :key="n"
          :class="[
            'h-2 w-1/3 cursor-pointer overflow-hidden rounded-lg bg-gray-300/70',
            currentImage === n - 1 ? 'bg-gray-300/80' : 'bg-gray-300/30',
          ]"
          @click="
            () => {
              currentImage = (n - 1) as 0 | 1 | 2
              currentRatio = 0
            }
          "
        >
          <span
            :class="[
              'block h-full rounded-lg bg-primary-600 transition-transform',
              currentImage === n - 1 ? 'origin-left' : 'origin-right',
            ]"
            :style="{
              transform: `scale(${
                currentImage === n - 1 ? currentRatio : 0
              }, 1)`,
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
