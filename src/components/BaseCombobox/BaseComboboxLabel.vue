<template>
  <ComboboxLabel class="mb-2 block text-sm font-medium leading-6 text-stone-900">
    <slot name="default" />
  </ComboboxLabel>
</template>

<script setup lang="ts">
import { ComboboxLabel } from "@headlessui/vue";
</script>
