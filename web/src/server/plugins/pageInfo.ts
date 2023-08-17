// Types
import type { Article } from '@/types'
import type { PageInfo } from '@/modules/pageInfo'
// Utils
import { existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'

export default defineNitroPlugin((nitroApp) => {
  // @ts-expect-error: https://github.com/nuxt/content/issues/2177
  nitroApp.hooks.hook('content:file:afterParse', (result: Article) => {
    if (
      !result._id.endsWith('.md') ||
      !result.body ||
      result.body.type !== 'root'
    ) {
      return
    }

    const filePath = `${tmpdir()}/pageinfo.json`
    if (!existsSync(filePath)) {
      return
    }

    const data = readFileSync(filePath, 'utf-8')
    const pageInfo: PageInfo = JSON.parse(data).find(
      (pageInfo: PageInfo) => pageInfo.path === result._file,
    )

    if (!pageInfo) {
      // ページ情報が見つからない場合
      return
    }

    // 投稿日
    if (result?.created === undefined && pageInfo.firstCommit?.date) {
      result.created = pageInfo.firstCommit.date
    }
    // 更新日
    if (result?.updated === undefined && pageInfo.latestCommit?.date) {
      result.updated = pageInfo.latestCommit.date
    }
  })
})
