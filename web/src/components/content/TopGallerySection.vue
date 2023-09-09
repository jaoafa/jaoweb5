<script lang="ts" setup>
type TopGalleryImage = {
  src: string
  alt: string
}
type TopGallerySectionProps = {
  /** 一覧に表示する画像 */
  images: TopGalleryImage[]
}

const props = withDefaults(defineProps<TopGallerySectionProps>(), {
  images: () => [],
})

const generatedImages = computed(() =>
  props.images.map((item, index) => ({
    id: index,
    src: item.src,
    alt: item.alt,
  })),
)
</script>

<template>
  <section class="relative">
    <div class="absolute z-0 h-full w-full -skew-y-6 bg-gray-800" />

    <div class="relative z-10 m-auto box-content max-w-6xl px-4 py-28 md:px-6">
      <div class="grid grid-cols-fill-72 gap-8">
        <div
          v-for="image in generatedImages"
          :key="image.id"
          class="aspect-video w-full overflow-hidden rounded-lg"
        >
          <img
            :src="`${image.src}/1920w.webp`"
            :srcset="`
              ${image.src}/856w.webp 856w
              ${image.src}/1200w.webp 1200w
              ${image.src}/1620w.webp 1620w
              ${image.src}/1920w.webp 1920w
            `"
            :alt="image.alt"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
