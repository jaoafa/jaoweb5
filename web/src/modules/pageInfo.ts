// Types
import type { DefaultLogFields, LogResult } from 'simple-git'
// Utils
import { existsSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'
import { simpleGit } from 'simple-git'

/** コミット情報 */
export type Commit = {
  /** ハッシュ値 */
  hash: string
  /** 日時 */
  date: string
  /** メッセージ */
  message: string
}

/** ページ情報 */
export type PageInfo = {
  /** ファイルのパス */
  path: string
  /** 最初のコミット */
  firstCommit?: Commit
  /** 最新のコミット */
  latestCommit?: Commit
}

/** 保存するファイルのパス */
const filePath = `${tmpdir()}/pageinfo.json`

/**
 * Markdownファイルのパスの一覧を取得する
 * @param path ディレクトリのパス
 */
const getMarkdownFiles = (path: string): string[] => {
  const items = readdirSync(path, { withFileTypes: true })
  const files = items
    // ディレクトリを除外
    .filter((item) => item.isFile())
    // Markdownファイル以外を除外
    .filter((item) => item.name.endsWith('.md'))
    // 絶対パスにする
    .map((item) => `${path}/${item.name}`)

  // ディレクトリ内を再帰的に実行
  items
    .filter((item) => item.isDirectory())
    .map((item) => `${path}/${item.name}`)
    .forEach((item) => {
      files.push(...getMarkdownFiles(item))
    })

  return files
}

/**
 * Gitのログを取得する
 * @param file ファイルのパス
 */
const getGitLog = async (
  file: string,
): Promise<LogResult<DefaultLogFields>> => {
  const git = simpleGit(resolve(__dirname, '../../../'))
  return await git.log({
    '--find-renames': '40%',
    file,
  })
}

/**
 * 最初のコミットを取得する
 * @param log Gitのログ
 */
const getFirstCommit = (log: LogResult<DefaultLogFields>) => {
  return log.all[log.all.length - 1]
}

/**
 * 最新のコミットを取得する
 * @param log Gitのログ
 */
const getLatestCommit = (log: LogResult<DefaultLogFields>) => {
  return log.latest
}

/**
 * ページの情報を取得する
 * @param file ファイルのパス
 */
const getPageInfo = async (file: string): Promise<PageInfo> => {
  const log = await getGitLog(file)
  const firstCommit = await getFirstCommit(log)
  const latestCommit = await getLatestCommit(log)

  return {
    path: file,
    firstCommit: {
      hash: firstCommit?.hash || '',
      date: firstCommit?.date || '',
      message: firstCommit?.message || '',
    },
    latestCommit: {
      hash: latestCommit?.hash || '',
      date: latestCommit?.date || '',
      message: latestCommit?.message || '',
    },
  }
}

/** ページ情報を取得し JSON ファイルを出力する */
export default defineNuxtModule({
  setup: (_, nuxt) => {
    // Nitro 初期化後にページ情報を取得
    nuxt.hook('nitro:init', async () => {
      const contentDir = (() => {
        const sources = nuxt.options.content?.sources || {}
        if (
          !Array.isArray(sources) &&
          sources?.content &&
          sources.content?.base
        ) {
          return sources.content.base as string
        } else {
          return ''
        }
      })()
      const files = getMarkdownFiles(contentDir)
      const data: PageInfo[] = await Promise.all(
        files.map((file) => getPageInfo(file)),
      )

      // 一時ファイルを保存
      writeFileSync(filePath, JSON.stringify(data))
    })

    // Nuxt 終了時に一時ファイルを削除
    nuxt.hook('close', async () => {
      if (existsSync(filePath)) {
        unlinkSync(filePath)
      }
    })
  },
})
