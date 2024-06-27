<template>
  <ListboxLabel as="template">
    <BaseLabel>
      <slot name="default" />
    </BaseLabel>
  </ListboxLabel>
</template>

<script setup lang="ts">
import { ListboxLabel } from "@headlessui/vue";
import BaseLabel from "@components/BaseLabel/BaseLabel.vue";
</script>
