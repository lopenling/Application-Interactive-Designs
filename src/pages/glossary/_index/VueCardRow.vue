<template>
  <div :class="[index == 0 ? '' : 'border-t']">
    <div class="flex items-center justify-between gap-2 px-4">
      <VueToggle
        :attributes="{ class: `py-4` }"
        :toggled="dictionary.enabled"
        size="medium"
        appearance="secondary"
        :switch="{
          attributes: {
            disabled: !dictionary.enabled,
          },
        }"
        :label="{
          text: dictionary.name,
          textExtra: labelExtra(dictionary),
          toggleOpacity: true,
        }"
      />
    </div>
  </div>
</template>

<script setup>
import VueToggle from "@components/Toggle/VueToggle.vue";

const { dictionary, users, index } = defineProps({
  dictionary: { type: Object },
  index: { type: Number },
});

function labelExtra(dictionary) {
  if (!dictionary.enabled) {
    return " — Unavailable";
  }
}
</script>
