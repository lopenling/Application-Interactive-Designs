<template>
  <div class="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
    <component
      v-if="props.iconComponent"
      :is="props.iconComponent"
      class="h-5 w-5 flex-shrink-0 text-stone-400"
    />
    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
type TProps = {
  iconComponent?: object;
};
const props = defineProps<TProps>();
</script>
