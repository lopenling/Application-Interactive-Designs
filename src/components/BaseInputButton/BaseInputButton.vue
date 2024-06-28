<template>
  <button
    type="button"
    class="relative shrink-0 rounded-md border px-3 py-1.5 font-medium text-stone-800 ring-inset transition before:absolute before:-inset-px before:block before:rounded-[inherit] focus-visible:border-transparent focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-inset focus-visible:before:ring-primary-600 focus-visible:before:ring-offset-0 sm:text-sm sm:leading-6"
    :class="[
      props.appearance == 'white'
        ? 'border-stone-300 bg-white hover:bg-stone-100'
        : props.appearance == 'transparent'
          ? 'border-black/[15%] bg-transparent hover:bg-black/[4%]'
          : props.appearance == 'gray'
            ? 'hover:bg-mix-white hover:bg-mix-amount-40 border-stone-300 bg-stone-50 hover:bg-stone-200 focus-visible:bg-primary-50 focus-visible:text-primary-800'
            : 'hover:bg-mix-white hover:bg-mix-amount-40 border-stone-300 bg-stone-50 hover:bg-stone-200 focus-visible:bg-primary-50 focus-visible:text-primary-800',
      props.shadow && 'shadow-sm',
      props.placement == 'left' && 'rounded-r-none border-r-0',
      props.placement == 'right' && 'rounded-l-none border-l-0',
    ]"
  >
    <slot name="default" />
  </button>
</template>

<script setup lang="ts">
type TProps = {
  appearance?: "gray" | "white" | "transparent";
  shadow?: boolean;
  placement?: "left" | "right";
};
const props = defineProps<TProps>();
</script>
