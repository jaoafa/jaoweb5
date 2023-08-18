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
    name: 'ひらたけ',
    slug: 'hiratake',
    icon: '/icons/hiratake.webp',
  },
  {
    name: 'Tomachi',
    slug: 'tomachi',
    icon: '/icons/tomachi.webp',
  },
  {
    name: 'オムレツ',
    slug: 'omelet',
    icon: '/icons/omelet.webp',
  },
  {
    name: 'コホナ',
    slug: 'kohonayoshi',
    icon: '/icons/kohonayoshi.webp',
  },
  {
    name: 'えきぱ',
    slug: 'ekipa',
    icon: '/icons/ekipa.webp',
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
