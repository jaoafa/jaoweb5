<script lang="ts" setup>
// Types
import type { Article } from '@/types'
// Icons
import { FaceFrownIcon } from '@heroicons/vue/24/outline'

type ContentListProps = {
  /** 記事を取得するクエリを指定します */
  query: string[]
  /** 著者でのフィルタを使用します */
  filterAuthor?: boolean
  /** カテゴリでのフィルタを使用します */
  filterCategory?: boolean
  /** 最大表示件数を指定します */
  limit?: number
}

const props = withDefaults(defineProps<ContentListProps>(), {
  filterAuthor: false,
  filterCategory: false,
  limit: undefined,
})

/** コンテンツ一覧 */
const articles = await useAsyncData(
  `content-list-${(() => props.query.join('-'))()}`,
  () => {
    const [query, ...pathParts] = props.query
    if (props.limit) {
      return queryContent<Article>(query, ...pathParts)
        .where({ _dir: { $eq: pathParts[pathParts.length - 1] || query } })
        .sort({ created: -1 })
        .limit(props.limit)
        .find()
    } else {
      return queryContent<Article>(query, ...pathParts)
        .where({ _dir: { $eq: pathParts[pathParts.length - 1] || query } })
        .sort({ created: -1 })
        .find()
    }
  },
).then((data) => {
  return data.data.value || []
})

/** 著者フィルタで選択中の値 */
const selectedAuthorFilter = ref<string>('all')
/** カテゴリフィルタで選択中の値 */
const selectedCategoryFilter = ref<string>('all')
/** フィルタリングしたコンテンツ一覧 */
const filteredArticles = computed(
  () =>
    articles
      .filter((article) => article._path)
      .filter((article) => {
        // 著者で絞り込み
        const isAuthor: boolean =
          selectedAuthorFilter.value === 'all' ||
          article.author === selectedAuthorFilter.value
        // カテゴリで絞り込み
        const isCategory: boolean =
          selectedCategoryFilter.value === 'all' ||
          article.category === selectedCategoryFilter.value

        return isAuthor && isCategory
      }) || [],
)
</script>

<template>
  <div class="not-prose my-10 grid gap-6 md:my-12">
    <ContentListHeader
      v-if="props.filterAuthor || props.filterCategory"
      v-model:author="selectedAuthorFilter"
      v-model:category="selectedCategoryFilter"
      :content="articles"
      :enable-author="props.filterAuthor"
      :enable-category="props.filterCategory"
    />

    <template v-if="filteredArticles.length">
      <ul class="grid grid-cols-fill-56 gap-6">
        <template v-for="item in filteredArticles" :key="item._path">
          <li>
            <ContentListItem
              :url="item._path"
              :title="item.title"
              :created="item.created"
              :updated="item.updated"
              :category="item.category"
              :author="item.author"
            />
          </li>
        </template>
      </ul>
    </template>
    <template v-else>
      <div
        :class="[
          'flex items-center justify-center gap-2',
          'rounded border border-gray-100 px-2 py-6 text-sm',
        ]"
      >
        <FaceFrownIcon class="h-5 w-5 translate-y-[0.5pt]" aria-hidden="true" />
        <p>該当する項目がありません。</p>
      </div>
    </template>
  </div>
</template>
