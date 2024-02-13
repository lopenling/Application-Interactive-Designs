<template>
  <button
    v-bind="$attrs"
    type="button"
    class="flex items-center gap-2 rounded-md bg-primary-600 px-2.5 py-1.5 text-left text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
  >
    <component
      :is="props.iconComponent"
      :attributes="{ class: 'h-3 w-3 flex-shrink-0 text-secondary-300/70' }"
    />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type TProps = {
  iconComponent: object;
};
const props = defineProps<TProps>();
</script>
