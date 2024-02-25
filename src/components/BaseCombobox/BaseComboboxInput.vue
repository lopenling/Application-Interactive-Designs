<template>
  <div class="relative">
    <ComboboxInput
      v-bind="$attrs"
      @change="query = $event.target.value"
      @focus="handleFocus"
      :displayValue="(option: any) => option?.value"
      :class="[
        props.appearance == 'white'
          ? 'bg-white'
          : props.appearance == 'transparent'
          ? 'bg-transparent'
          : props.appearance == 'gray'
          ? 'bg-stone-50 focus:bg-primary-50 focus:text-primary-800'
          : 'bg-stone-50 focus:bg-primary-50 focus:text-primary-800',
        props.shadow && 'shadow-sm',
        'w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-stone-800 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6',
      ]"
    />
    <ComboboxButton
      class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3.5 text-stone-400 transition focus:outline-none group-[:has(input:focus)]:text-primary-500"
    >
      <IconArrowDown1 class="h-3.5 w-3.5" />
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
            'relative cursor-default select-none py-2 pl-3 pr-10',
            active ? 'bg-primary-300 text-primary-900' : 'text-stone-800',
          ]"
        >
          <span :class="['block truncate', selected && 'font-semibold']">
            {{ option?.value }}
          </span>

          <span
            v-if="selected"
            :class="[
              ' absolute inset-y-0 right-0 flex items-center pr-3.5',
              active ? 'text-primary-900' : 'text-primary-600',
            ]"
          >
            <IconCheck1 class="h-3.5 w-3.5" />
          </span>
        </li>
      </ComboboxOption>
    </ComboboxOptions>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/vue";
import type { Ref, ComputedRef } from "vue";
import type { TProps } from "@components/BaseCombobox/BaseComboboxInput.types";
import type { TOption } from "@components/BaseCombobox/BaseCombobox.types";

import IconArrowDown1 from "@components/icons/streamline/regular/IconArrowDown1.vue";
import IconCheck1 from "@components/icons/streamline/regular/IconCheck1.vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<TProps>();
const query = <Ref<string>>inject("query");
const selectedOption = <Ref<TOption>>inject("selectedOption");
const filteredOptions = <ComputedRef<TOption[]>>inject("filteredOptions");

/**
 * handleFocus
 *
 * If the query is not empty and there is no selected option, clear the query.
 * If the query is not empty and there is a selected option, but selected option
 * if different than the query, set the query to the selected option.
 */

const handleFocus = () => {
  if (query && query.value != "") {
    if (!selectedOption.value?.value) {
      query.value = "";
    } else if (selectedOption.value.value != query.value) {
      query.value = selectedOption.value.value;
    }
  }
};
</script>
