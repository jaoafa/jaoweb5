<script lang="ts" setup>
import type { SimpleIcon } from 'simple-icons'
import { siDiscord, siGithub, siTwitter, siYoutube } from 'simple-icons'

type SocialLinksProps = {
  /** アイコンを並べる方向 */
  direction?: 'row' | 'column'
}
type SocialLinksEmits = {
  click: []
}

const props = withDefaults(defineProps<SocialLinksProps>(), {
  direction: 'row',
})
const emits = defineEmits<SocialLinksEmits>()

const app = useAppConfig()

/** 一覧表示するソーシャルリンク */
const socialLinks: {
  label: string
  href: string
  icon: SimpleIcon
}[] = [
  {
    label: 'Discord',
    href: app.social.discord.url,
    icon: siDiscord,
  },
  {
    label: 'GitHub',
    href: app.social.github.url,
    icon: siGithub,
  },
  {
    label: 'Twitter',
    href: app.social.twitter.url,
    icon: siTwitter,
  },
  {
    label: 'YouTube',
    href: app.social.youtube.url,
    icon: siYoutube,
  },
]
</script>

<template>
  <ul
    :class="[
      'flex items-center gap-6 px-1',
      props.direction === 'row' ? 'flex-row' : 'flex-col',
    ]"
  >
    <li v-for="item in socialLinks" :key="item.label">
      <NuxtLink
        :to="item.href"
        :title="item.label"
        :aria-label="item.label"
        class="transition-opacity hover:opacity-70"
        target="_blank"
        @click="() => emits('click')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-5 w-5 fill-current"
        >
          <path :d="item.icon.path" />
        </svg>
      </NuxtLink>
    </li>
  </ul>
</template>
