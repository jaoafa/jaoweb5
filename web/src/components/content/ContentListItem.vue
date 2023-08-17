<script lang="ts" setup>
// Types
import type { Article } from '@/types'
// Icons
import {
  ArrowPathIcon,
  CalendarDaysIcon,
  TagIcon,
} from '@heroicons/vue/24/solid'

type ContentListItemProps = {
  /** URLを指定します */
  url: Article['_path']
  /** タイトルを指定します */
  title: Article['title']
  /** 投稿日を指定します */
  created: Article['created']
  /** 更新日を指定します */
  updated: Article['updated']
  /** カテゴリを指定します */
  category: Article['category']
  /** 著者を指定します */
  author: Article['author']
}

const props = withDefaults(defineProps<ContentListItemProps>(), {
  url: '',
  title: '',
  created: '',
  updated: '',
  category: '',
  author: '',
})
</script>

<template>
  <NuxtLink
    :to="props.url"
    :class="[
      'block rounded-lg border bg-white px-3 py-4 transition-colors',
      'border-gray-200 hover:border-primary-600',
    ]"
  >
    <article class="flex flex-col justify-between gap-3">
      <h2 class="line-clamp-2 h-[3.5em] font-bold leading-tight">
        {{ props.title }}
      </h2>

      <div class="flex items-center justify-between gap-2">
        <dl
          v-if="props.created || props.updated || props.category"
          class="flex flex-col gap-y-2 text-xs text-gray-500"
        >
          <div v-if="props.created" class="inline-flex items-center gap-1">
            <dt>
              <CalendarDaysIcon class="h-3.5 w-3.5" aria-label="投稿日" />
            </dt>
            <dd>
              <time
                :datatime="useDateFormat(props.created, 'YYYY-MM-DD').value"
              >
                {{ useDateFormat(props.created, 'YYYY-MM-DD').value }}
              </time>
            </dd>
          </div>
          <div v-else-if="props.updated" class="inline-flex items-center gap-1">
            <dt>
              <ArrowPathIcon class="h-3.5 w-3.5" aria-label="更新日" />
            </dt>
            <dd>
              <time
                :datatime="useDateFormat(props.updated, 'YYYY-MM-DD').value"
              >
                {{ useDateFormat(props.updated, 'YYYY-MM-DD').value }}
              </time>
            </dd>
          </div>
          <div v-if="props.category" class="inline-flex items-center gap-1">
            <dt>
              <TagIcon class="h-3.5 w-3.5" aria-label="カテゴリ" />
            </dt>
            <dd>{{ useCategory({ slug: props.category }).value?.name }}</dd>
          </div>
        </dl>

        <ul v-if="props.author" class="flex gap-2">
          <li
            class="aspect-square w-7 overflow-hidden rounded-full bg-gray-100"
          >
            <img
              v-show="useAuthor({ slug: props.author }).value?.icon"
              :src="useAuthor({ slug: props.author }).value?.icon"
              :alt="useAuthor({ slug: props.author }).value?.name"
              class="h-full w-full object-cover"
            />
          </li>
        </ul>
      </div>
    </article>
  </NuxtLink>
</template>
