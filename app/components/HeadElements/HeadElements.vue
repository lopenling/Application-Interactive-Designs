<template>
  <Head>
    <Meta charset="utf-8" />
    <Meta
      name="viewport"
      content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
    />
    <Link rel="manifest" href="/manifest.webmanifest" />
    <Link rel="icon" href="/icons/favicon.ico" sizes="32x32" />
    <Link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
    <Link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
  </Head>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appConfig.siteTitle}` : appConfig.siteTitle;
  },
});
</script>
