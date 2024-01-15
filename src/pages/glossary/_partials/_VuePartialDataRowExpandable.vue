<template>
  <Disclosure
    as="div"
    :class="[props.index != 0 && 'border-t']"
    v-slot="{ open }"
  >
    <div class="flex items-center justify-between gap-2 px-4">
      <!---- Toggle & label ---->
      <VueToggle
        :attributes="{
          class: `py-4`,
        }"
        :toggled="props.dictionary.enabled"
        size="medium"
        appearance="primary"
        :label="{
          text: props.dictionary.name,
          toggleOpacity: true,
        }"
      />

      <!---- Expand button ---->
      <DisclosureButton
        as="button"
        class="rounded-md p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-500"
      >
        <VueIcon
          :data="open ? IconDataArrowUp1 : IconDataArrowDown1"
          :attributes="{ class: `h-4 w-4` }"
        />
      </DisclosureButton>
    </div>

    <!---- Sub rows ---->
    <DisclosurePanel passive>
      <div class="pb-6">
        <VuePartialDataSubRow
          v-for="(person, index) in props.users"
          :key="person.id"
          :index="index"
          :person="person"
          :dictionaryEnabled="props.dictionary.enabled"
        />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { type TDictionariesData } from "@scripts/data/dictionariesData";
import { type TOrganizationUsersData } from "@scripts/data/organizationUsersData";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import VueToggle from "@components/Toggle/VueToggle.vue";
import VuePartialDataSubRow from "./_VuePartialDataSubRow.vue";

import VueIcon from "@components/Icon/VueIcon.vue";
import {
  IconDataArrowDown1,
  IconDataArrowUp1,
} from "@scripts/icons/streamline/regular.mjs";

// Define partial props
type TProps = {
  dictionary: TDictionariesData[number];
  users: TOrganizationUsersData;
  index: number;
};
const props = defineProps<TProps>();
</script>
