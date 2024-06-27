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
        'size-5',
        props.appearance == 'primary' && 'text-primary-500',
        props.appearance == 'danger' && 'text-red-500',
        props.appearance == 'default' || !props.appearance ? 'text-stone-500' : '',
      ]"
      :data-expand-by="iconExpandBy || 0"
    />
  </div>
</template>

<script setup lang="ts">
type TProps = {
  iconComponent: object;
  iconExpandBy?: number;
  appearance?: "primary" | "danger" | "default";
};
const props = defineProps<TProps>();
</script>
