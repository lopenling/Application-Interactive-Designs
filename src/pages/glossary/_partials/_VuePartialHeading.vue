<template>
  <div class="mb-10">
    <h2
      class="mb-6 text-2xl font-bold leading-8 text-stone-900 sm:truncate sm:text-3xl sm:tracking-tight"
    >
      Glossary
    </h2>

    <div
      v-if="props.role === 'admin'"
      class="mb-12 grid auto-cols-fr grid-cols-12 md:grid-cols-12"
    >
      <!---- Input ---->
      <div class="col-span-full md:col-span-6">
        <VueComboBox
          :attributes="{ name: 'filter-user' }"
          storeKey="glossaryFilterUser"
          :options="mappedUsers"
          :input="{
            attributes: {
              placeholder: 'Filter by user',
            },
          }"
        />
      </div>

      <!---- Clear button ---->
      <div
        v-if="glossaryFilterUser"
        class="col-span-full self-center md:col-span-6"
      >
        <button
          @click="clearStore('glossaryFilterUser')"
          type="button"
          class="mt-4 text-sm text-primary-600 hover:underline sm:ml-4 sm:mt-0"
        >
          clear filter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TRole } from "@lib/types";

import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, clearStore } from "@stores/componentStates.mjs";

import VueComboBox from "@components/ComboBox/VueComboBox.vue";
import organizationUsersData from "@scripts/data/organizationUsersData";

// Define partial props
type TProps = { role?: TRole };
const props = defineProps<TProps>();

// Get users data
const users = organizationUsersData();
const mappedUsers = users.map((user) => ({
  id: user.id,
  value: user.name,
}));

// Setup the store
const multiStore = useStore($multiStore);
const glossaryFilterUser = computed(
  () => multiStore.value["glossaryFilterUser"],
);
</script>
