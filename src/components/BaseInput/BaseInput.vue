<template>
  <input
    type="text"
    class="w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-stone-800 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 autofill:shadow-[inset_0_0_0px_999px_hsl(47deg_100%_96%)] focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
    :class="[
      props.appearance == 'white'
        ? 'bg-white'
        : props.appearance == 'transparent'
          ? 'bg-transparent'
          : props.appearance == 'gray'
            ? 'bg-stone-50 focus:bg-primary-50 focus:text-primary-800'
            : 'bg-stone-50 focus:bg-primary-50 focus:text-primary-800',
      props.shadow && 'shadow-sm',
    ]"
  />
</template>

<script setup lang="ts">
type TProps = {
  appearance?: "gray" | "white" | "transparent";
  shadow?: boolean;
};
const props = defineProps<TProps>();
</script>
