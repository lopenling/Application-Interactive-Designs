<template>
  <div
    :class="[
      'relative mx-4 flex flex-col flex-wrap gap-y-0.5 px-2 py-2.5 pl-[52px] odd:rounded-md odd:bg-stone-50 sm:flex-row sm:pl-2',
    ]"
  >
    <div :class="['-ml-[44px] w-full sm:ml-0', slots.extraData && 'sm:w-1/2']">
      <BaseToggle
        @update:modelValue="$emit('update:modelValue', $event)"
        :is-toggled="props.isToggled"
        :is-grayscale="props.isGrayscale"
        size="small"
        appearance="secondary"
      >
        <BaseToggleLabel :change-opacity="true" class="font-normal">
          <slot name="default" />
        </BaseToggleLabel>
      </BaseToggle>
    </div>

    <div v-if="slots.extraData" class="flex w-full min-w-0 items-center sm:w-1/2">
      <div class="truncate text-xs leading-5 text-stone-500/85">
        <slot name="extraData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import BaseToggle from "@components/BaseToggle/BaseToggle.vue";
import BaseToggleLabel from "@components/BaseToggle/BaseToggleLabel.vue";

type TProps = {
  isToggled: boolean;
  isGrayscale?: boolean;
};
const props = defineProps<TProps>();
const slots = useSlots();
</script>
