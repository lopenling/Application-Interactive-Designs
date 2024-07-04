<template>
  <button
    v-bind="$attrs"
    type="button"
    class="flex items-center gap-2 rounded-md bg-primary-600 px-2.5 py-1.5 text-left text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
  >
    <component
      v-if="props.iconComponent"
      :is="props.iconComponent"
      class="flex-shrink-0 text-secondary-300/70"
      :class="[props.iconSizeClass ? props.iconSizeClass : 'size-4', props.iconClass]"
      :data-stroke-width="iconStrokeWidth || 2"
      :data-expand-by="iconExpandBy"
    />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type TProps = {
  iconComponent?: object;
  iconSizeClass?: string;
  iconClass?: string;
  iconStrokeWidth?: number;
  iconExpandBy?: number;
};
const props = defineProps<TProps>();
</script>
