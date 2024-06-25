<template>
  <Listbox as="div" by="id" v-model="selectedOption" class="group">
    <slot name="default" />
  </Listbox>
</template>

<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { Listbox } from "@headlessui/vue";

export type TProps = {
  options?: TOption[];
};
export type TOption = null | {
  id: number;
  value: string;
  selected?: boolean;
};

const props = defineProps<TProps>();

/**
 * selectedOption
 *
 * Setup the initial selectedOption ref value as null.
 * Then try to find an option with `selected: true` in the options array.
 * If the index is found, update the `selectedOption.value` to the option at
 * that index.
 * Watch the `selectedOption` for changes and update the store when it changes.
 */

let selectedOption = ref<TOption>(null);
let selectedOptionIndex = props.options?.findIndex((item) => item?.selected === true);

if (props.options && selectedOptionIndex !== undefined && selectedOptionIndex >= 0) {
  selectedOption.value = props.options[selectedOptionIndex];
}

provide("selectedOption", selectedOption);

/**
 * sortedOptions
 *
 * Sort the options by the `value` key in alphabetical order
 */

let sortedOptions = computed(() => {
  if (props.options) {
    let values: TOption[] = props.options;

    values.sort((a, b) => {
      if (a && b) {
        return a.value.localeCompare(b.value);
      }
      return 0;
    });

    return values;
  }
});

provide("sortedOptions", sortedOptions);
</script>
