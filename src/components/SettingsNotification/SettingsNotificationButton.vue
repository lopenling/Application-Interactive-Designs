<template>
  <button
    v-bind="$attrs"
    type="button"
    class="basis-full py-1.5 font-medium text-secondary-700 transition hover:bg-secondary-500/[12.5%] hover:text-secondary-900 sm:rounded-md sm:px-2.5"
  >
    <slot />
  </button>

  <span
    v-if="props.separator"
    class="flex shrink-0 self-stretch border-r border-secondary-500/25 sm:mx-4 sm:h-5 sm:self-center"
  ></span>
</template>

<script setup lang="ts">
type TProps = {
  separator?: boolean;
};
const props = defineProps<TProps>();
</script>
