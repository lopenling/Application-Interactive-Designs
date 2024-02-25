<template>
  <div :class="[props.index != 0 && 'border-t']">
    <div class="flex items-center justify-between gap-2 px-4">
      <BaseToggle
        @update:modelValue="$emit('update:modelValue', $event)"
        :is-toggled="props.isToggled"
        :is-grayscale="props.isGrayscale"
        :appearance="props.appearance"
        class="py-4"
      >
        <BaseToggleLabel :change-opacity="true"><slot name="default" /></BaseToggleLabel>
      </BaseToggle>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TProps as TBaseToggleProps } from "@components/BaseToggle/BaseToggle.types";
import BaseToggle from "@components/BaseToggle/BaseToggle.vue";
import BaseToggleLabel from "@components/BaseToggle/BaseToggleLabel.vue";

type TProps = {
  isToggled: boolean;
  isGrayscale?: boolean;
  index?: number;
  appearance?: TBaseToggleProps["appearance"];
};
const props = defineProps<TProps>();
</script>
