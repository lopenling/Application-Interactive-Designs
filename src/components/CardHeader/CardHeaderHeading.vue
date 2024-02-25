<template>
  <h3 class="text-base font-semibold leading-8 text-stone-900">
    <slot></slot>

    <span v-if="slots.extraHeading" class="font-normal text-stone-500">
      <slot name="extraHeading" />
    </span>
  </h3>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
const slots = useSlots();
</script>
