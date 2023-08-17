import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'

/** 記事 */
export type Article = MarkdownParsedContent & {
  /** 投稿日 */
  created?: string | null
  /** 更新日 */
  updated?: string | null
  /** カテゴリ */
  category?: string
  /** 著者 */
  author?: string
  /** リストページであるか */
  list?: boolean
}
