<script lang="ts" setup>
// Types
import type { Article } from '@/types'
// Components
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
// Icons
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

type ArticleListHeaderProps = {
  /** コンテンツデータを指定します */
  content?: Article[]
  /** 著者でのフィルターの現在の選択内容を指定します */
  author: Required<Article>['author']
  /** 著者でのフィルターを使用します */
  enableAuthor?: boolean
  /** カテゴリでのフィルターの現在の選択内容を指定します */
  category: Required<Article>['category']
  /** カテゴリでのフィルタを使用します */
  enableCategory?: boolean
}
type ArticleListHeaderEmits = {
  'update:author': [ArticleListHeaderProps['author']]
  'update:category': [ArticleListHeaderProps['category']]
}

const props = withDefaults(defineProps<ArticleListHeaderProps>(), {
  content: () => [],
  author: 'all',
  enableAuthor: false,
  category: 'all',
  enableCategory: false,
})
const emits = defineEmits<ArticleListHeaderEmits>()

/** 著者リスト */
const authors = computed(() => [
  { name: '全て', slug: 'all' },
  ...[
    ...new Set(
      props.content.flatMap((article) =>
        article?.author ? article.author : [],
      ),
    ),
  ].flatMap((item) => {
    const author = useAuthor({ slug: item })
    return author.value
      ? { name: author.value.name, slug: author.value.slug }
      : []
  }),
])

/** 現在選択中の著者情報 */
const modelAuthor = computed({
  get: () =>
    authors.value.find((item) => item.slug === props.author) ||
    authors.value[0],
  set: (val) => emits('update:author', val.slug),
})

/** カテゴリリスト */
const categories = computed(() => [
  { name: '全て', slug: 'all' },
  ...[
    ...new Set(
      props.content.flatMap((article) =>
        article?.category ? article.category : [],
      ),
    ),
  ].flatMap((item) => {
    const category = useCategory({ slug: item })
    return category.value
      ? { name: category.value.name, slug: category.value.slug }
      : []
  }),
])
/** 現在選択中のカテゴリ情報 */
const modelCategory = computed({
  get: () =>
    categories.value.find((item) => item.slug === props.category) ||
    categories.value[0],
  set: (val) => emits('update:category', val.slug),
})
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Listbox v-if="props.enableCategory" v-model="modelCategory">
      <div class="relative w-48">
        <ListboxButton
          :class="[
            'relative w-full rounded-2xl py-1 pl-3 pr-10 text-xs',
            'border border-gray-200 focus:outline-none',
            'bg-gray-50 hover:bg-gray-100 focus-visible:bg-gray-100',
          ]"
        >
          <span class="flex items-center gap-2 truncate">
            <span>カテゴリ：</span>
            <span>{{ modelCategory.name }}</span>
          </span>
          <span
            :class="[
              'absolute inset-y-0 right-0',
              'pointer-events-none flex items-center pr-2',
            ]"
          >
            <ChevronUpDownIcon
              class="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <Transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-gray-900 ring-opacity-5 focus:outline-none"
          >
            <ListboxOption
              v-for="item in categories"
              v-slot="{ active, selected }"
              :key="item.slug"
              :value="item"
              as="template"
            >
              <li
                :class="`
                ${'relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-500 transition-colors'}
                ${active ? 'bg-gray-50 text-gray-800' : ''}
                ${selected ? 'text-gray-800' : ''}
              `"
              >
                <span
                  :class="`
                    ${'block truncate'}
                    ${selected ? 'font-bold' : 'font-normal'}
                  `"
                >
                  {{ item.name }}
                </span>
                <span
                  v-show="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600"
                >
                  <CheckIcon class="h-4 w-4" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>

    <Listbox v-if="props.enableAuthor" v-model="modelAuthor">
      <div class="relative w-48">
        <ListboxButton
          :class="[
            'relative w-full rounded-2xl py-1 pl-3 pr-10 text-xs',
            'border border-gray-200 focus:outline-none',
            'bg-gray-50 hover:bg-gray-100 focus-visible:bg-gray-100',
          ]"
        >
          <span class="flex items-center gap-2 truncate">
            <span>著者：</span>
            <span>{{ modelAuthor.name }}</span>
          </span>
          <span
            :class="[
              'absolute inset-y-0 right-0',
              'pointer-events-none flex items-center pr-2',
            ]"
          >
            <ChevronUpDownIcon
              class="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <Transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-gray-900 ring-opacity-5 focus:outline-none"
          >
            <ListboxOption
              v-for="item in authors"
              v-slot="{ active, selected }"
              :key="item.slug"
              :value="item"
              as="template"
            >
              <li
                :class="`
                ${'relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-500 transition-colors'}
                ${active ? 'bg-gray-50 text-gray-800' : ''}
                ${selected ? 'text-gray-800' : ''}
              `"
              >
                <span
                  :class="`
                    ${'block truncate'}
                    ${selected ? 'font-bold' : 'font-normal'}
                  `"
                >
                  {{ item.name }}
                </span>
                <span
                  v-show="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600"
                >
                  <CheckIcon class="h-4 w-4" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  </div>
</template>
