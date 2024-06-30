<template>
  <Combobox
    :modelValue="modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    v-model="selectedOption"
    as="div"
    by="id"
    nullable
    v-slot="{ open }"
    class="group"
  >
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

const emit = defineEmits(["update:modelValue"]);

/**
 * selectedOption
 *
 * Setup the initial selectedOption ref value as null.
 * Then try to find an option with `selected: true` in the options array.
 * If the index is found, update the `selectedOption.value` to the option at
 * that index.
 * Watch the `selectedOption` for changes and update the store when it changes.
 */

const selectedOption = ref(props.modelValue);
let selectedOptionIndex = props.options?.findIndex((item) => item?.selected === true);

if (props.options && selectedOptionIndex && selectedOptionIndex >= 0) {
  selectedOption.value = props.options[selectedOptionIndex];
}

watch(selectedOption, () => {
  if (props.storeKey) updateStore(props.storeKey, selectedOption);
});

provide("selectedOption", selectedOption);

/**
 * filteredOptions
 *
 * If the query is empty return all options. Otherwise, filter the options array
 * to only include options that include the query string.
 */

let filteredOptions = computed(() => {
  if (props.options) {
    let values: TOption[];

    if (query.value === "") {
      values = props.options;
    } else {
      values = props.options.filter((option) =>
        option?.value
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, "")),
      );
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
 * Reactively get data from store
 *
 * Update the `selectedOption` when `selectedOptionInStore` changes
 */

if (props.storeKey) {
  const multiStore = useStore($multiStore);
  if (!multiStore.value[props.storeKey]) updateStore(props.storeKey, selectedOption.value);

  const selectedOptionInStore = computed(() => multiStore.value[props.storeKey!] as TOption);

  watch(selectedOptionInStore, () => {
    if (selectedOptionInStore.value !== selectedOption.value) {
      selectedOption.value = selectedOptionInStore.value;
    }
  });
}
</script>
