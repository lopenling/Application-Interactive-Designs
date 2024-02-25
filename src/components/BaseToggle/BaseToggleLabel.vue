<template>
  <SwitchLabel
    as="span"
    :passive="props.passive"
    :class="[
      'ml-4 text-sm font-medium text-stone-700',
      props.changeOpacity && 'opacity-60 peer-aria-checked:opacity-100',
      props.passive ? 'cursor-default' : 'cursor-pointer',
    ]"
  >
    <slot name="default" />
  </SwitchLabel>
</template>

<script setup lang="ts">
import { SwitchLabel } from "@headlessui/vue";
import { type TProps } from "@components/BaseToggle/BaseToggleLabel.types";

const props = defineProps<TProps>();
</script>
