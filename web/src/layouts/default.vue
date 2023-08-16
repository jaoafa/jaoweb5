<script lang="ts" setup>
type LayoutDefaultSlots = {
  default?: (props: object) => unknown
}

const { page } = useContent()
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
      <component
        :is="page?.list ? 'div' : 'article'"
        class="mx-auto box-content max-w-3xl pb-10 pt-24 md:pb-16 md:pt-36"
      >
        <slot />
      </component>
    </template>
  </main>
</template>
