<template>
  <div :class="[props.index && props.index > 0 && 'border-t']">
    <div class="flex items-center justify-between gap-2 px-4 text-sm text-stone-700">
      <div class="py-4">
        <slot name="default" />
      </div>

      <div class="-mr-0.5 flex gap-2">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type TProps = {
  index?: number;
};
const props = defineProps<TProps>();
</script>
