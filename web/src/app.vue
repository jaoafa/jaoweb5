<template>
  <SeoKit />
  <Body class="bg-white text-gray-700">
    <NuxtLoadingIndicator :height="2" color="#ffb41d" />
    <AppProvider>
      <TheHeader />
      <NuxtPage />
      <TheFooter />
    </AppProvider>
  </Body>
  <TheSeo />
</template>
