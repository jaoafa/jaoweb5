export type Author = {
  /** 名前 */
  name: string
  /** 著者を特定するための一意の文字列 */
  slug: string
  /** アイコン画像URL */
  icon: string
}

export type UseAuthorOptions = {
  /** 著者を特定するための一意の文字列 */
  slug?: Author['slug']
}

/** 著者情報の配列 */
const authors: Author[] = [
  {
    name: 'Hiratake',
    slug: 'hiratake',
    icon: '/icons/hiratake.webp',
  },
]

/**
 * 著者情報を取得する
 * @param options オプション
 */
export const useAuthor = (options: UseAuthorOptions = {}) => {
  const { slug } = options
  const author = computed<Author | undefined>(() => {
    if (slug) {
      return authors.find((item) => item.slug === slug)
    }
  })
  return author
}
