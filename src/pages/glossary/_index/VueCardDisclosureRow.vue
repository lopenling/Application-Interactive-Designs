<template>
  <Disclosure
    as="div"
    :class="[index == 0 ? '' : 'border-t']"
    v-slot="{ open }"
  >
    <div class="flex items-center justify-between gap-2 px-4">
      <VueToggle
        :attributes="{ class: `py-4` }"
        :toggled="dictionary.enabled"
        size="medium"
        appearance="primary"
        :label="{
          text: dictionary.name,
          toggleOpacity: true,
        }"
      />

      <div>
        <DisclosureButton
          class="rounded-md p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-500"
        >
          <VueIcon
            v-if="open"
            :data="IconDataArrowUp1"
            :attributes="{ class: `h-4 w-4` }"
          />
          <VueIcon
            v-else
            :data="IconDataArrowDown1"
            :attributes="{ class: `h-4 w-4` }"
          />
        </DisclosureButton>
      </div>
    </div>

    <DisclosurePanel passive>
      <div class="pb-6">
        <VueAccountRow
          v-for="(person, index) in users"
          :key="person.id"
          :index="index"
          :person="person"
          :enabled="dictionary.enabled"
        />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import VueToggle from "@components/Toggle/VueToggle.vue";
import VueIcon from "@components/Icon/VueIcon.vue";
import VueAccountRow from "./VueAccountRow.vue";

import {
  IconDataArrowDown1,
  IconDataArrowUp1,
} from "@scripts/icons/streamline/regular.mjs";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const { dictionary, users, index } = defineProps({
  dictionary: { type: Object },
  users: { type: Array },
  index: { type: Number },
});
</script>
