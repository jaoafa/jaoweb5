export type Category = {
  /** 名前 */
  name: string
  /** カテゴリを特定するための一意の文字列 */
  slug: string
}

export type UseCategoryOptions = {
  /** カテゴリを特定するための一意の文字列 */
  slug?: Category['slug']
}

/** カテゴリ情報の配列 */
const categories: Category[] = [
  {
    name: 'お知らせ',
    slug: 'news',
  },
]

/**
 * カテゴリ情報を取得する
 * @param options オプション
 */
export const useCategory = (options: UseCategoryOptions = {}) => {
  const { slug } = options
  const category = computed<Category | undefined>(() => {
    if (slug) {
      return categories.find((item) => item.slug === slug)
    }
  })
  return category
}
