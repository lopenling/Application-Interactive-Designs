<template>
  <ListboxLabel class="mb-2 block text-sm font-medium leading-6 text-stone-900">
    <slot name="default" />
  </ListboxLabel>
</template>

<script setup lang="ts">
import { ListboxLabel } from "@headlessui/vue";
</script>
