<template>
  <Listbox
    :modelValue="modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    as="div"
    by="value"
    class="group"
  >
    <slot name="default" />
  </Listbox>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import { Listbox } from "@headlessui/vue";

export type TProps = {
  modelValue: any;
  options: TOption[];
};
export type TOption = null | {
  value: string;
  label: string;
};

const props = defineProps<TProps>();
const selectedOption = computed(() => props.modelValue);
const options = computed(() => props.options);

const emit = defineEmits(["update:modelValue"]);

provide("selectedOption", selectedOption);
provide("options", options);
</script>
