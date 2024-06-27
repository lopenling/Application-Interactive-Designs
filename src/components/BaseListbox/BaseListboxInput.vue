<template>
  <div class="relative">
    <ListboxButton
      v-bind="$attrs"
      class="relative w-full cursor-default rounded-md border-0 py-1.5 pl-3 pr-10 text-left text-sm leading-6 text-stone-800 ring-1 ring-inset ring-stone-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600 data-[headlessui-state=open]:outline-none data-[headlessui-state=open]:ring-2 data-[headlessui-state=open]:ring-inset data-[headlessui-state=open]:ring-primary-600"
      :class="[
        props.appearance == 'white'
          ? 'bg-white'
          : props.appearance == 'transparent'
            ? 'bg-transparent'
            : props.appearance == 'gray'
              ? 'bg-stone-50 focus:bg-primary-50 focus:text-primary-800'
              : 'bg-stone-50 focus:bg-primary-50 focus:text-primary-800',
        props.shadow && 'shadow-sm',
      ]"
    >
      <span v-if="selectedOption?.value" class="block truncate">
        {{ selectedOption?.label }}
      </span>
      <span v-else class="block min-h-6 truncate text-stone-400">
        {{ props.placeholder || "Select an option" }}
      </span>

      <span
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 transition duration-0 group-[:has(button:focus)]:text-primary-500 group-data-[headlessui-state=open]:text-primary-500"
      >
        <IconArrowDown1 class="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </ListboxButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-1 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-1 opacity-0"
    >
      <ListboxOptions
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ListboxOption
          v-for="option in options"
          as="template"
          :key="option?.value"
          :value="option"
          v-slot="{ active, selected }"
        >
          <li
            class="relative cursor-default select-none py-2 pl-3 pr-10"
            :class="[active ? 'bg-primary-300 text-primary-900' : 'text-stone-800']"
          >
            <span class="block truncate" :class="[selected ? 'font-semibold' : 'font-normal']">
              {{ option?.label }}
            </span>

            <span
              v-if="selected"
              class="absolute inset-y-0 right-0 flex items-center pr-3.5"
              :class="[active ? 'text-primary-900' : 'text-primary-600']"
            >
              <IconCheck1 class="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { inject, type ComputedRef } from "vue";
import { ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { type TOption } from "@components/BaseListbox/BaseListbox.vue";

import IconArrowDown1 from "@components/icons/streamline/regular/IconArrowDown1.vue";
import IconCheck1 from "@components/icons/streamline/regular/IconCheck1.vue";

defineOptions({
  inheritAttrs: false,
});

type TProps = {
  appearance?: "gray" | "white" | "transparent";
  shadow?: boolean;
  placeholder?: string;
};

const props = defineProps<TProps>();
const selectedOption = <ComputedRef<TOption>>inject("selectedOption");
const options = <ComputedRef<TOption[]>>inject("options");
</script>
