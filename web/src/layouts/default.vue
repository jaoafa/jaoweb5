<script lang="ts" setup>
type LayoutDefaultSlots = {
  default?: (props: object) => unknown
}

const route = useRoute()

/** トップページであるか */
const isTop = computed<boolean>(() => route.path === '/')

defineSlots<LayoutDefaultSlots>()
</script>

<template>
  <main>
    <template v-if="isTop">
      <slot />
    </template>

    <template v-else>
      <slot />
    </template>
  </main>
</template>
