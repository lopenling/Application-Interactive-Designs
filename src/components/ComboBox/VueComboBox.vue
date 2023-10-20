<template>
  <Combobox
    as="div"
    v-model="selectedOption"
    nullable
    v-slot="{ open }"
    v-bind="attributes"
  >
    <ComboboxLabel v-if="label" v-bind="labelAttributes">
      {{ props.label?.text }}
    </ComboboxLabel>

    <div class="relative">
      <ComboboxInput
        v-bind="inputAttributes"
        @change="query = $event.target.value"
        @focus="handleFocus"
        :displayValue="(option: any) => option?.value"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 text-stone-400 transition focus:outline-none group-[:has(input:focus)]:text-primary-500"
      >
        <VueIcon
          :data="IconDataArrowDown1"
          :attributes="{ class: `mr-1 mt-0.5 h-4 w-4` }"
        />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredOptions && filteredOptions.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="option in filteredOptions"
          :key="option?.id"
          :value="option"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-primary-300 text-primary-900' : 'text-stone-800',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ option?.value }}
            </span>

            <span
              v-if="selected"
              :class="[
                ' absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-primary-900' : 'text-primary-600',
              ]"
            >
              <VueIcon
                :data="IconDataCheck1"
                :attributes="{ class: `h-4 w-4` }"
              />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { type TProps, type TOption } from "@components/ComboBox/ComboBox.types";
import mergeAttributes from "@scripts/helpers/mergeAttributes";

import VueIcon from "@components/Icon/VueIcon.vue";
import {
  IconDataArrowDown1,
  IconDataCheck1,
} from "@scripts/icons/streamline/regular.mjs";

import { computed, ref, watch, onMounted } from "vue";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

const query = ref("");
const props = defineProps<TProps>();
const attributes = mergeAttributes(
  {
    class: `group`,
  },
  props.attributes,
);

const labelAttributes = mergeAttributes(
  {
    class: `
      ${props.label && "mb-2"}
      block text-sm font-medium leading-6 text-stone-900
    `,
  },
  props.label?.attributes,
);

const inputAttributes = mergeAttributes(
  {
    class: `
      ${
        props.input?.appearance == "white"
          ? "bg-white"
          : props.input?.appearance == "transparent"
          ? "bg-transparent"
          : props.input?.appearance == "gray"
          ? "bg-stone-50 focus:bg-primary-50 focus:text-primary-800"
          : "bg-stone-50 focus:bg-primary-50 focus:text-primary-800"
      }
      ${props.input?.shadow && "shadow-sm"}
      w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-stone-800 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6
    `,
  },
  props.input?.attributes,
);

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
let selectedOptionIndex = props.options?.findIndex(
  (item) => item?.selected === true,
);
if (props.options && selectedOptionIndex && selectedOptionIndex >= 0) {
  selectedOption.value = props.options[selectedOptionIndex];
}
watch(selectedOption, (newSelectedOption) => {
  if (newSelectedOption) {
    query.value = newSelectedOption.value;
  }
});

/**
 * filteredOptions
 *
 * If the query is empty, return all options.
 * Otherwise, filter the options array to only include options that include the
 * query string.
 */
const filteredOptions = computed(() =>
  query.value === ""
    ? props.options
    : props.options?.filter((option) => {
        return option?.value.toLowerCase().includes(query.value.toLowerCase());
      }),
);

/**
 * handleFocus
 *
 * If the query is not empty and there is no selected option, clear the query.
 * If the query is not empty and there is a selected option, but selected option
 * if different than the query, set the query to the selected option.
 */
const handleFocus = () => {
  if (query.value != "") {
    if (!selectedOption.value?.value) {
      query.value = "";
    } else if (selectedOption.value.value != query.value) {
      query.value = selectedOption.value.value;
    }
  }
};

/**
 * Setting up the store
 */
if (props.storeKey) {
  const multiStore = useStore($multiStore);
  let subStore = computed(() => multiStore.value[props.storeKey!]);

  // Setting initial value to the store
  updateStore(props.storeKey, selectedOption.value);

  // Update the store when `selectedOption` changes
  watch(selectedOption, (newSelectedOption) => {
    updateStore(props.storeKey, newSelectedOption);
  });

  // Update the `selectedOption` and `query` when subStore changes
  watch(subStore, (newStoreValue) => {
    if (!subStore) {
      selectedOption.value = null;
      query.value = "";
    } else {
      selectedOption.value = newStoreValue as TOption;
    }
  });
}
</script>
