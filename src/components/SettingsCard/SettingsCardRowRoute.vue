<template>
  <a
    :href="props.url"
    class="group flex items-center justify-between gap-2 px-4 text-stone-700 transition hover:bg-stone-50"
  >
    <div class="py-4 text-sm">
      <span
        class="underline decoration-transparent decoration-2 underline-offset-2 transition group-hover:text-primary-700 group-hover:decoration-primary-400/60"
      >
        <slot name="default" />
      </span>
    </div>

    <span
      class="rounded-md px-2.5 text-primary-500/70 transition group-hover:translate-x-1 group-hover:text-primary-600/70"
    >
      <component :is="IconArrowRight" class="h-4 w-4" />
    </span>
  </a>
</template>

<script setup lang="ts">
import IconArrowRight from "@components/icons/streamline/regular/IconArrowRight.vue";

type TProps = {
  url: string;
};
const props = defineProps<TProps>();
</script>
