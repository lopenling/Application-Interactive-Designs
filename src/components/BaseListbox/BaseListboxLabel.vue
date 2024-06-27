<template>
  <ListboxLabel class="mb-1.5 block text-sm font-medium leading-6 text-stone-800">
    <slot name="default" />
  </ListboxLabel>
</template>

<script setup lang="ts">
import { ListboxLabel } from "@headlessui/vue";
</script>
