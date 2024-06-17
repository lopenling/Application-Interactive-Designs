<template>
  <div
    :class="[
      'flex size-full items-center justify-center rounded-full',
      props.appearance == 'primary' && 'bg-primary-100',
      props.appearance == 'danger' && 'bg-red-100',
      props.appearance == 'default' || !props.appearance ? 'bg-stone-100' : '',
    ]"
  >
    <component
      :is="props.iconComponent"
      :class="[
        'h-4 w-4',
        props.appearance == 'primary' && 'text-primary-600',
        props.appearance == 'danger' && 'text-red-600',
        props.appearance == 'default' || !props.appearance ? 'text-stone-600' : '',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
type TProps = {
  iconComponent: object;
  appearance?: "primary" | "danger" | "default";
};
const props = defineProps<TProps>();
</script>
