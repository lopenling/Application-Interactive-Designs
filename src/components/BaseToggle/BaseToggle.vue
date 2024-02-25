<template>
  <SwitchGroup as="div" class="flex items-center">
    <Switch
      v-model="isToggled"
      @update:modelValue="$emit('update:modelValue', $event)"
      :class="[
        'peer relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',

        isToggled && props.appearance == 'primary' && 'bg-primary-600',
        isToggled && props.appearance == 'secondary' && 'bg-secondary-400/80',
        isToggled && !props.appearance && 'bg-primary-600',
        !isToggled && 'bg-stone-200',

        props.size == 'large' ? 'h-6 w-11' : '',
        props.size == 'medium' ? 'h-5 w-9' : '',
        props.size == 'small' ? 'h-4 w-7' : '',
        !props.size && 'h-5 w-9',

        props.appearance == 'primary' ? 'focus-visible:ring-primary-600' : '',
        props.appearance == 'secondary' ? 'focus-visible:ring-secondary-600' : '',
        !props.appearance && 'focus-visible:ring-primary-600',

        props.isGrayscale && 'grayscale',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          isToggled && props.size == 'large' && 'translate-x-5',
          isToggled && props.size == 'medium' && 'translate-x-4',
          isToggled && props.size == 'small' && 'translate-x-3',
          isToggled && !props.size && 'translate-x-4',
          !isToggled && 'translate-x-0',
          props.size == 'large' && 'h-5 w-5',
          props.size == 'medium' && 'h-4 w-4',
          props.size == 'small' && 'h-3 w-3',
          !props.size && 'h-4 w-4',
          'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        ]"
      ></span>
    </Switch>

    <slot name="default" />
  </SwitchGroup>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Switch, SwitchGroup } from "@headlessui/vue";
import { type TProps } from "@components/BaseToggle/BaseToggle.types";

const props = defineProps<TProps>();
const isToggled = ref(props.isToggled);
</script>
