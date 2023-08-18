<script lang="ts" setup>
// Components
import {
  SocialShare,
  SocialShareButton,
  SocialShareInput,
  SocialSharePanel,
  SocialShareSubmit,
} from '@hiratake/social-share'
// Icons
import { siFacebook, siMastodon, siMisskey, siTwitter } from 'simple-icons'

const { page } = useContent()
const config = useRuntimeConfig()
const route = useRoute()
</script>

<template>
  <footer v-if="page">
    <div class="grid grid-cols-1 gap-2">
      <div class="text-center text-xs">SNSでこのページをシェアする</div>
      <div class="flex items-center justify-center gap-1">
        <SocialShare
          :url="`${config.public.siteUrl}${
            route.path.endsWith('/') ? route.path : `${route.path}/`
          }`"
          :text="`${page?.title || ''} - ${config.public.siteName}`"
          service="twitter"
        >
          <SocialShareButton
            :class="[
              'flex h-10 w-10 items-center justify-center p-2',
              'transition-opacity hover:opacity-70',
            ]"
            title="Twitterでシェア"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-full w-full fill-current text-current"
            >
              <path :d="siTwitter.path" />
            </svg>
          </SocialShareButton>
        </SocialShare>
        <SocialShare
          :url="`${config.public.siteUrl}${
            route.path.endsWith('/') ? route.path : `${route.path}/`
          }`"
          :text="`${page?.title || ''} - ${config.public.siteName}`"
          service="facebook"
        >
          <SocialShareButton
            :class="[
              'flex h-10 w-10 items-center justify-center p-2',
              'transition-opacity hover:opacity-70',
            ]"
            title="Facebookでシェア"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-full w-full fill-current text-current"
            >
              <path :d="siFacebook.path" />
            </svg>
          </SocialShareButton>
        </SocialShare>
        <SocialShare
          :url="`${config.public.siteUrl}${
            route.path.endsWith('/') ? route.path : `${route.path}/`
          }`"
          :text="`${page?.title || ''} - ${config.public.siteName}`"
          class="relative"
          service="mastodon"
        >
          <SocialShareButton
            :class="[
              'flex h-10 w-10 items-center justify-center p-2',
              'transition-opacity hover:opacity-70',
            ]"
            title="Mastodonでシェア"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-full w-full fill-current text-current"
            >
              <path :d="siMastodon.path" />
            </svg>
          </SocialShareButton>
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <SocialSharePanel
              :class="[
                'absolute bottom-12 left-1/2 -translate-x-1/2',
                'grid w-52 gap-1 rounded-lg bg-white p-3 shadow-lg',
              ]"
            >
              <label class="select-none text-xs" for="share-mastodon">
                サーバのドメイン：
              </label>
              <div class="flex items-center gap-2 text-sm">
                <SocialShareInput
                  id="share-mastodon"
                  placeholder="example.com"
                  :class="[
                    'shrink grow basis-full',
                    'w-full rounded bg-slate-100 px-2 py-1 outline-none',
                  ]"
                />
                <SocialShareSubmit
                  class="shrink-0 rounded border border-slate-300 px-2 py-1"
                >
                  投稿
                </SocialShareSubmit>
              </div>
            </SocialSharePanel>
          </Transition>
        </SocialShare>
        <SocialShare
          :url="`${config.public.siteUrl}${
            route.path.endsWith('/') ? route.path : `${route.path}/`
          }`"
          :text="`${page?.title || ''} - ${config.public.siteName}`"
          class="relative"
          service="misskey"
        >
          <SocialShareButton
            :class="[
              'flex h-10 w-10 items-center justify-center p-2',
              'transition-opacity hover:opacity-70',
            ]"
            title="Misskeyでシェア"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-full w-full fill-current text-current"
            >
              <path :d="siMisskey.path" />
            </svg>
          </SocialShareButton>
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <SocialSharePanel
              :class="[
                'absolute bottom-12 left-1/2 -translate-x-1/2',
                'grid w-52 gap-1 rounded-lg bg-white p-3 shadow-lg',
              ]"
            >
              <label class="select-none text-xs" for="share-misskey">
                サーバのドメイン：
              </label>
              <div class="flex items-center gap-2 text-sm">
                <SocialShareInput
                  id="share-misskey"
                  placeholder="example.com"
                  :class="[
                    'shrink grow basis-full',
                    'w-full rounded bg-slate-100 px-2 py-1 outline-none',
                  ]"
                />
                <SocialShareSubmit
                  class="shrink-0 rounded border border-slate-300 px-2 py-1"
                >
                  投稿
                </SocialShareSubmit>
              </div>
            </SocialSharePanel>
          </Transition>
        </SocialShare>
      </div>
    </div>
  </footer>
</template>
