<template>
  <div :class="[props.index == 0 ? '' : 'border-t']">
    <div class="flex items-center justify-between gap-2 px-4">
      <VueToggle
        :attributes="{
          class: `py-4`,
        }"
        :toggled="props.dictionary.enabled"
        size="medium"
        :appearance="props.toggleAppearance"
        :label="{
          text: props.dictionary.name,
          toggleOpacity: true,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TDictionariesData } from "@scripts/data/dictionariesData";
import VueToggle from "@components/Toggle/VueToggle.vue";

// Define partial props
type TProps = {
  dictionary: TDictionariesData[number];
  index: number;
  toggleAppearance?: "primary" | "secondary";
};
const props = defineProps<TProps>();
</script>
