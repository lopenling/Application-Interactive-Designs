<template>
  <SwitchGroup as="div" v-bind="attributes">
    <Switch
      v-model="isToggled"
      v-bind="switchAttributes"
      :class="[
        isToggled && props.appearance == 'secondary' && 'bg-secondary-400/80',
        isToggled && props.appearance == 'primary' && 'bg-primary-600',
        isToggled && props.switch?.attributes?.disabled && 'bg-stone-300',
        !isToggled && 'bg-stone-200',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          isToggled && props.size == 'large' && 'translate-x-5',
          isToggled && props.size == 'medium' && 'translate-x-4',
          isToggled && props.size == 'small' && 'translate-x-3',
          !isToggled && 'translate-x-0',
          props.size == 'large' && 'h-5 w-5',
          props.size == 'medium' && 'h-4 w-4',
          props.size == 'small' && 'h-3 w-3',
          'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        ]"
      ></span>
    </Switch>

    <SwitchLabel
      as="span"
      v-bind="labelAttributes"
      :passive="props.label?.passive"
    >
      <span v-if="props.label?.text">{{ props.label.text + " " }}</span>
      <span v-if="props.label?.textExtra" class="text-stone-500">
        {{ props.label.textExtra }}
      </span>
    </SwitchLabel>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { type TProps } from "@components/Toggle/Toggle.types";
import mergeAttributes from "@scripts/helpers/mergeAttributes";

import { ref } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const props = defineProps<TProps>();
const isToggled = ref(props.toggled);

const attributes = mergeAttributes(
  {
    class: `flex items-center`,
  },
  props.attributes,
);

const switchAttributes = mergeAttributes(
  {
    class: `
      ${props.size == "large" ? "h-6 w-11" : ""}
      ${props.size == "medium" ? "h-5 w-9" : ""}
      ${props.size == "small" ? "h-4 w-7" : ""}
      ${props.appearance == "primary" ? "focus-visible:ring-primary-600" : ""}
      ${
        props.appearance == "secondary"
          ? "focus-visible:ring-secondary-600"
          : ""
      }
      peer relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    `,
  },
  props.switch?.attributes,
);

const labelAttributes = mergeAttributes(
  {
    class: `
      ${
        !props.label?.passive &&
        !props.switch?.attributes?.disabled &&
        "cursor-pointer"
      }
      ${
        props.label?.toggleOpacity && "opacity-50 peer-aria-checked:opacity-100"
      }
      ml-4 text-sm font-medium text-stone-700
    `,
  },
  props.label?.attributes,
);
</script>
