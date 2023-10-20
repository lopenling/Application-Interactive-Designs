<template>
  <div class="mb-12">
    <h2
      class="mb-6 text-2xl font-bold leading-7 text-stone-900 sm:truncate sm:text-3xl sm:tracking-tight"
    >
      Glossary
    </h2>
    <div class="grid auto-cols-fr grid-cols-12 md:grid-cols-12">
      <div class="col-span-full md:col-span-6">
        <VueComboBox
          :attributes="{ name: 'filter-user' }"
          storeKey="glossaryFilterUsers"
          :options="mappedUsers"
          :input="{
            attributes: {
              placeholder: 'Filter by user',
            },
          }"
        />
      </div>
      <div
        v-if="glossaryFilterUsers"
        class="col-span-full self-center md:col-span-6"
      >
        <button
          @click="clearStore('glossaryFilterUsers')"
          type="button"
          class="mt-4 text-sm text-primary-600 hover:underline sm:ml-4 sm:mt-0"
        >
          clear filter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, clearStore } from "@stores/componentStates.mjs";

import VueComboBox from "@components/ComboBox/VueComboBox.vue";
import organizationUsersData from "@scripts/data/organizationUsersData";

const users = organizationUsersData();
const mappedUsers = users.map((user) => ({
  id: user.id,
  value: user.name,
}));

// Store setup
const multiStore = useStore($multiStore);
const glossaryFilterUsers = computed(
  () => multiStore.value.glossaryFilterUsers,
);
</script>
