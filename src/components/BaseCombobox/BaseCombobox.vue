<template>
  <Combobox as="div" by="id" v-model="selectedOption" nullable v-slot="{ open }" class="group">
    <slot name="default" />
  </Combobox>
</template>

<script setup lang="ts">
import { computed, ref, watch, provide } from "vue";
import { Combobox } from "@headlessui/vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

import { type TProps, type TOption } from "@components/BaseCombobox/BaseCombobox.types";

const props = defineProps<TProps>();
const query = ref("");

provide("storeKey", props.storeKey);
provide("query", query);

/**
 * selectedOption
 *
 * Setup the initial selectedOption ref value as null.
 * Then try to find an option with `selected: true` in the options array.
 * If the index is found, update the `selectedOption.value` to the option at
 * that index.
 * Watch the `selectedOption` for changes and update the `query` accordingly to
 * match the value. This way everything stays in sync, no matter if mouse or
 * keyboard is used to select the option.
 */

let selectedOption = ref<TOption>(null);
let selectedOptionIndex = props.options?.findIndex((item) => item?.selected === true);

if (props.options && selectedOptionIndex && selectedOptionIndex >= 0) {
  selectedOption.value = props.options[selectedOptionIndex];
}
watch(selectedOption, (newSelectedOption) => {
  if (newSelectedOption) {
    query.value = newSelectedOption.value;
  }
});

provide("selectedOption", selectedOption);

/**
 * filteredOptions
 *
 * If the query is empty or matches the currently selected item content then return all options.
 * Otherwise, filter the options array to only include options that include the
 * query string.
 */

const filteredOptions = computed(() => {
  if (props.options) {
    let values: TOption[];

    if (
      query.value === "" ||
      selectedOption.value?.value.toLowerCase() === query.value.toLowerCase()
    ) {
      values = props.options;
    } else {
      values = props.options.filter((option) => {
        return option?.value
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""));
      });
    }
    return values;
  }
});

provide("filteredOptions", filteredOptions);

/**
 * Store
 *
 * Setup the multi-store, but only if `storeKey` is provided.
 * Setup the sub-store inside multi-store by assigning a `storeKey` and initial value.
 * Reactively get selected option from store using the `storeKey`.
 *
 * Update the store when `selectedOption` changes.
 * Update the `selectedOption` and `query` when selectedOptionInStore changes
 */
if (props.storeKey) {
  const multiStore = useStore($multiStore);
  if (!multiStore.value[props.storeKey]) updateStore(props.storeKey, selectedOption.value);

  const selectedOptionInStore = computed(() => {
    return multiStore.value[props.storeKey!] as TOption;
  });

  watch(selectedOption, (newSelectedOption) => {
    updateStore(props.storeKey, newSelectedOption);
  });

  watch(selectedOptionInStore, (newStoreValue) => {
    if (!selectedOptionInStore) {
      selectedOption.value = null;
      query.value = "";
    } else {
      selectedOption.value = newStoreValue;
    }
  });
}
</script>
