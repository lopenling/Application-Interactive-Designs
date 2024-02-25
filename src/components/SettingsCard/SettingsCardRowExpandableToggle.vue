<template>
  <Disclosure as="div" :class="[props.index != 0 && 'border-t']" v-slot="{ open }">
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

      <div class="flex gap-2">
        <slot name="extraButtons" />
        <DisclosureButton
          as="button"
          class="rounded-md px-2.5 py-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-500"
        >
          <span v-if="props.expandIconComponent" class="flex shrink-0 items-center gap-1.5">
            <component :is="props.expandIconComponent" class="h-4 w-4" />
            <IconArrowDown1
              v-if="!open"
              class="h-3 w-3 opacity-75"
              data-expand-by="1"
              data-stroke-width="2.5"
            />
            <IconArrowUp1
              v-if="open"
              class="h-3 w-3 opacity-75"
              data-expand-by="1"
              data-stroke-width="2.5"
            />
          </span>
          <span v-else>
            <IconArrowDown1 v-if="!open" class="h-4 w-4" />
            <IconArrowUp1 v-if="open" class="h-4 w-4" />
          </span>
        </DisclosureButton>
      </div>
    </div>

    <DisclosurePanel passive>
      <div class="mb-6 mt-2 sm:mt-0">
        <slot name="expandableArea" />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { type TProps as TBaseToggleProps } from "@components/BaseToggle/BaseToggle.types";

import BaseToggle from "@components/BaseToggle/BaseToggle.vue";
import BaseToggleLabel from "@components/BaseToggle/BaseToggleLabel.vue";
import IconArrowDown1 from "@components/icons/streamline/regular/IconArrowDown1.vue";
import IconArrowUp1 from "@components/icons/streamline/regular/IconArrowUp1.vue";

type TProps = {
  isToggled: boolean;
  isGrayscale?: boolean;
  index?: number;
  appearance?: TBaseToggleProps["appearance"];
  expandIconComponent?: object;
};
const props = defineProps<TProps>();
</script>
