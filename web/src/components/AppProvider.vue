<script lang="ts" setup>
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/lexend/400.css'
import '@fontsource/lexend/900.css'

type AppProviderSlots = {
  default?: (props: object) => unknown
}

defineSlots<AppProviderSlots>()
</script>

<template>
  <slot />
</template>
