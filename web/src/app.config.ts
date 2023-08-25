// https://nuxt.com/docs/guide/directory-structure/app-config
export default defineAppConfig({
  social: {
    discord: {
      url: 'https://discord.gg/jaoafa',
    },
    github: {
      url: 'https://github.com/jaoafa',
    },
    twitter: {
      url: 'https://twitter.com/jaoafa',
    },
    youtube: {
      url: 'https://www.youtube.com/channel/UC92wyJyhqXEMiEROeFJKNKg',
    },
  },
  navigation: [
    {
      label: 'ブログ',
      to: '/blog/',
      children: [],
    },
    {
      label: '運営方針',
      to: '/policy/',
      children: [
        {
          label: 'プライバシーポリシー',
          to: '/policy/privacy/',
        },
      ],
    },
  ],
})
