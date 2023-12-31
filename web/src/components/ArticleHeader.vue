<script lang="ts" setup>
// Icons
import {
  ArrowPathIcon,
  CalendarDaysIcon,
  TagIcon,
} from '@heroicons/vue/24/solid'

const { page } = useContent()
</script>

<template>
  <header v-if="page">
    <h1 class="text-3xl font-bold">{{ page?.title }}</h1>
    <dl
      v-if="page?.created || page?.updated || page?.category"
      class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500"
    >
      <div v-if="page?.created" class="meta-item">
        <dt>
          <CalendarDaysIcon class="meta-icon" aria-label="投稿日" />
        </dt>
        <dd>
          <time :datetime="useDateFormat(page.created, 'YYYY-MM-DD').value">
            {{ useDateFormat(page.created, 'YYYY-MM-DD').value }}
          </time>
        </dd>
      </div>
      <div v-if="page?.updated" class="meta-item">
        <dt>
          <ArrowPathIcon class="meta-icon" aria-label="更新日" />
        </dt>
        <dd>
          <time :datetime="useDateFormat(page.updated, 'YYYY-MM-DD').value">
            {{ useDateFormat(page.updated, 'YYYY-MM-DD').value }}
          </time>
        </dd>
      </div>
      <div v-if="page?.category" class="meta-item">
        <dt>
          <TagIcon class="meta-icon" aria-label="カテゴリ" />
        </dt>
        <dd>{{ useCategory({ slug: page.category }).value?.name }}</dd>
      </div>
    </dl>

    <ul v-if="page?.author" class="mt-5 flex flex-wrap gap-x-8 gap-y-4">
      <li class="flex items-center gap-3">
        <div class="aspect-square w-9 overflow-hidden rounded-full bg-gray-100">
          <img
            v-show="useAuthor({ slug: page.author }).value?.icon"
            :src="useAuthor({ slug: page.author }).value?.icon"
            alt="icon"
            class="h-full w-full object-cover"
          />
        </div>
        <div
          v-show="useAuthor({ slug: page.author }).value?.name"
          class="text-sm"
        >
          {{ useAuthor({ slug: page.author }).value?.name }}
        </div>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.meta-item {
  @apply inline-flex items-center gap-2;
}

.meta-icon {
  @apply h-3.5 w-3.5 translate-y-[0.1em];
}
</style>
