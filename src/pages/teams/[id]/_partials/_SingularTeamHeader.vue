<template>
  <div v-if="singularTeam && role == 'admin'">
    <SettingsStats>
      <SettingsStatsDatum :icon-component="IconSingleNeutral">
        {{ combinedTeamUsers.length }}
        {{ combinedTeamUsers.length == 1 ? "member" : "members" }}
      </SettingsStatsDatum>
      <SettingsStatsDatum :icon-component="IconBookEdit">
        <span v-if="state == 'empty'">0/{{ MAX_CUSTOM_DICTIONARIES }} custom</span>
        <span v-else>
          {{ combinedCustomDictionaryIds.length }}/{{ MAX_CUSTOM_DICTIONARIES }} custom
        </span>
      </SettingsStatsDatum>
    </SettingsStats>

    <SettingsTitle>
      <SettingsTitleText>Team {{ singularTeam.name }}</SettingsTitleText>
      <template #options>
        <div class="py-1">
          <SettingsTitleOption
            @click="openModalSingularTeamRenameTeam({ teamId: singularTeam.id })"
          >
            Rename team
          </SettingsTitleOption>
        </div>
        <div class="py-1">
          <SettingsTitleOption
            @click="openModalSingularTeamDeleteTeam({ teamId: singularTeam.id })"
          >
            Delete team
          </SettingsTitleOption>
        </div>
      </template>
    </SettingsTitle>

    <div class="-mt-4 mb-12 grid auto-cols-fr grid-cols-12 gap-4">
      <div class="col-span-full md:col-span-6">
        <BaseCombobox storeKey="selectedUserInFilter" :options="remappedTeamUsers">
          <BaseComboboxInput placeholder="Filter by user" appearance="gray" />
        </BaseCombobox>
      </div>
      <div v-if="selectedUserInFilterInStore" class="col-span-full self-center md:col-span-6">
        <BaseActionLink @click="clearStore('selectedUserInFilter')">clear filter</BaseActionLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore, clearStore } from "@stores/componentStates.mjs";
import eventBus from "@scripts/general/eventBus";

import { type AstroGlobal } from "astro";
import { type TUser } from "@scripts/data/usersData";
import { type TTeam } from "@scripts/data/teamsData";
import { type TOption } from "@components/BaseCombobox/BaseCombobox.types";
import { type TSingularTeamModalRenameTeam } from "./_SingularTeamModalRenameTeam.vue";
import { type TSingularTeamModalDeleteTeam } from "./_SingularTeamModalDeleteTeam.vue";

import { MAX_CUSTOM_DICTIONARIES } from "@scripts/data/constants";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import usersData from "@scripts/data/usersData";
import teamsData from "@scripts/data/teamsData";

import SettingsStats from "@components/SettingsStats/SettingsStats.vue";
import SettingsStatsDatum from "@components/SettingsStats/SettingsStatsDatum.vue";
import SettingsTitle from "@components/SettingsTitle/SettingsTitle.vue";
import SettingsTitleText from "@components/SettingsTitle/SettingsTitleText.vue";
import SettingsTitleOption from "@components/SettingsTitle/SettingsTitleOption.vue";
import BaseCombobox from "@components/BaseCombobox/BaseCombobox.vue";
import BaseComboboxInput from "@components/BaseCombobox/BaseComboboxInput.vue";
import BaseActionLink from "@components/BaseActionLink/BaseActionLink.vue";

import IconSingleNeutral from "@components/icons/streamline/regular/IconSingleNeutral.vue";
import IconBookEdit from "@components/icons/streamline/regular/IconBookEdit.vue";

const openModalSingularTeamRenameTeam = (data: TSingularTeamModalRenameTeam) => {
  eventBus.emit("open-modal", { name: "singular-team-rename-team", data: data });
};
const openModalSingularTeamDeleteTeam = (data: TSingularTeamModalDeleteTeam) => {
  eventBus.emit("open-modal", { name: "singular-team-delete-team", data: data });
};

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const params = props.astro.params;

const role = getRole(props.astro);
const state = getState(props.astro);
const users = usersData();
const teams = teamsData();

/**
 * Store
 *
 * Setup the multi-store.
 * Setup the sub-store inside multi-store by assigning a `storeKey` and initial value.
 * Reactively get data from stores
 */

const multiStore = useStore($multiStore);
if (!multiStore.value["users"]) updateStore("users", users);
if (!multiStore.value["teams"]) updateStore("teams", teams);
if (!multiStore.value["selectedUserInFilter"]) updateStore("selectedUserInFilter", null);

const usersInStore = computed(() => multiStore.value["users"] as TUser[]);
const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);
const singularTeam = computed(
  () => teamsInStore.value.find((team) => team.id === Number(params.id)) as TTeam,
);
const combinedCustomDictionaryIds = computed(() => [
  ...singularTeam.value.enabledCustomDictionaryIds,
  ...singularTeam.value.disabledCustomDictionaryIds,
]);
const combinedTeamUserIds = computed(() => [
  ...singularTeam.value.adminUserIds,
  ...singularTeam.value.memberUserIds,
]);
const combinedTeamUsers = computed(() =>
  usersInStore.value.filter((user) => combinedTeamUserIds.value.includes(user.id)),
);
const selectedUserInFilterInStore = computed(
  () => multiStore.value["selectedUserInFilter"] as TOption,
);

/**
 * Reactively remap users to the format that `BaseCombobox` component expects.
 */

const remappedTeamUsers = computed(() => {
  return combinedTeamUsers.value.map((user) => ({
    id: user.id,
    value: user.firstName + " " + user.lastName,
  }));
});
</script>
