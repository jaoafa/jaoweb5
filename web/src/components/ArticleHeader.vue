<script lang="ts" setup>
const { page } = useContent()
</script>

<template>
  <header v-if="page">
    <h1 class="text-3xl font-bold">{{ page?.title }}</h1>
  </header>
</template>
