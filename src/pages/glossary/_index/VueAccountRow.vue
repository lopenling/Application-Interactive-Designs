<template>
  <div
    :class="[
      index % 2 === 0 ? 'rounded-md bg-stone-50' : '',
      index == 0 ? '' : '',
      'relative mx-4 flex justify-between pl-2',
    ]"
  >
    <div class="flex gap-x-4 sm:w-1/2 sm:flex-none">
      <VueToggle
        :attributes="{ class: 'py-2 flex-none' }"
        :toggled="true"
        size="small"
        appearance="secondary"
        :switch="{
          attributes: {
            disabled: !enabled,
          },
        }"
        :label="{
          attributes: { class: `[&]:font-normal` },
          toggleOpacity: true,
          text: person.name,
        }"
      />
    </div>

    <div
      class="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none"
    >
      <div class="hidden sm:block">
        <p class="flex text-xs leading-5 text-stone-500">
          <a
            :href="`mailto:${person.email}`"
            class="relative truncate hover:underline"
            >{{ person.email }}</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueToggle from "@components/Toggle/VueToggle.vue";

const { person, index, enabled } = defineProps({
  person: { type: Object },
  index: { type: Number },
  enabled: { type: Boolean },
});
</script>
