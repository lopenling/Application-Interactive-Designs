<template>
  <div
    :class="[
      props.index % 2 === 0 ? 'rounded-md bg-stone-50' : '',
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
            ...(!props.dictionaryEnabled && { disabled: 'disabled' }),
          },
        }"
        :label="{
          attributes: { class: `[&]:font-normal` },
          toggleOpacity: true,
          text: props.person.name,
        }"
      />
    </div>

    <div
      class="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none"
    >
      <div class="hidden sm:block">
        <p class="flex text-xs leading-5 text-stone-500">
          <a
            :href="`mailto:${props.person.email}`"
            class="relative truncate hover:underline"
          >
            {{ props.person.email }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TOrganizationUsersData } from "@scripts/data/organizationUsersData";
import VueToggle from "@components/Toggle/VueToggle.vue";

// Define partial props
type TProps = {
  person: TOrganizationUsersData[number];
  index: number;
  dictionaryEnabled: boolean;
};
const props = defineProps<TProps>();
</script>
