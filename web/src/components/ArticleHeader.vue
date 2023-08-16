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
      class="mt-4 flex gap-5 text-xs text-gray-500"
    >
      <div v-if="page?.created" class="inline-flex items-center gap-2">
        <dt>
          <CalendarDaysIcon
            class="h-3.5 w-3.5 translate-y-[0.1em]"
            aria-label="投稿日"
          />
        </dt>
        <dd>
          <time :datetime="useDateFormat(page.created, 'YYYY-MM-DD').value">
            {{ useDateFormat(page.created, 'YYYY-MM-DD').value }}
          </time>
        </dd>
      </div>
      <div v-if="page?.updated" class="inline-flex items-center gap-2">
        <dt>
          <ArrowPathIcon
            class="h-3.5 w-3.5 translate-y-[0.1em]"
            aria-label="更新日"
          />
        </dt>
        <dd>
          <time :datetime="useDateFormat(page.updated, 'YYYY-MM-DD').value">
            {{ useDateFormat(page.updated, 'YYYY-MM-DD').value }}
          </time>
        </dd>
      </div>
      <div v-if="page?.category" class="inline-flex items-center gap-2">
        <dt>
          <TagIcon
            class="h-3.5 w-3.5 translate-y-[0.1em]"
            aria-label="カテゴリ"
          />
        </dt>
        <dd>{{ page.category }}</dd>
      </div>
    </dl>
  </header>
</template>
