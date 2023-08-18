<script lang="ts" setup></script>

<template>
  <div
    :class="[
      'not-prose',
      'mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center',
    ]"
  >
    <div class="font-accent text-9xl font-bold">404</div>
    <h1 class="text-xl font-bold md:text-2xl">
      お探しのページが見つかりませんでした
    </h1>
    <p class="text-sm text-gray-600">
      ページが見つかりませんでした。あなたがアクセスしようとしたページは、何者かに破壊されたか、座標が変更されています。URLに間違いがないかお確かめの上、元のページにお戻りいただくか、メニューより移動したいページをお選びください。
    </p>
  </div>
</template>
