<template>
  <nav class="flex gap-x-9">
    <NuxtLink
      v-for="link in appConfig.navigationLinks"
      :to="link.to"
      class="-mx-1 -my-px flex items-center border-y-2 px-1 text-sm font-medium transition"
      :class="[
        $route.fullPath === link.to
          ? 'border-b-primary-500 text-common-900'
          : 'mouse:hover:border-b-common-150 border-transparent text-common-500 mouse:hover:text-common-700',
      ]"
    >
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
</script>
