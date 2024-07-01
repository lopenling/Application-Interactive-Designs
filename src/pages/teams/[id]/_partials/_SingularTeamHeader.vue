<template>
  <div v-if="singularTeam && role == 'admin'">
    <SettingsStats>
      <SettingsStatsDatum :icon-component="IconSingleNeutral">
        {{ users!.length }} {{ users!.length == 1 ? "member" : "members" }}
      </SettingsStatsDatum>
      <SettingsStatsDatum :icon-component="IconBookEdit">
        <span v-if="state == 'empty'">0/{{ MAX_CUSTOM_DICTIONARIES }} custom</span>
        <span v-else>
          {{ allCustomDictionaryIds!.length }}/{{ MAX_CUSTOM_DICTIONARIES }} custom
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
        <BaseCombobox v-model="userInFilter" :options="sortedUsers">
          <BaseComboboxInput placeholder="Filter by user" appearance="gray" />
        </BaseCombobox>
      </div>
      <div v-if="userInFilter" class="col-span-full self-center md:col-span-6">
        <BaseActionLink @click="teamsStore.setUserInFilter(null)">clear filter</BaseActionLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { MAX_CUSTOM_DICTIONARIES } from "@scripts/data/constants";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { useUsersStore, type TUser } from "@stores/usersStore";

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";

import { type TSingularTeamModalRenameTeam } from "./_SingularTeamModalRenameTeam.vue";
import { type TSingularTeamModalDeleteTeam } from "./_SingularTeamModalDeleteTeam.vue";

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
const currentTeamId = Number(params.id);
const role = getRole(props.astro);
const state = getState(props.astro);

const teamsStore = useTeamsStore();
const usersStore = useUsersStore();
const singularTeam = computed(() => teamsStore.getTeamById(currentTeamId) as TTeam);
const allCustomDictionaryIds = computed(() =>
  teamsStore.getAllCustomDictionaryIdsInTeam(singularTeam.value!.id),
);

const userInFilter = computed({
  get: () => teamsStore.userInFilter,
  set: (value) => teamsStore.setUserInFilter(value),
});

const users = computed(() => {
  const userIds = teamsStore.getAllUserIdsInTeam(singularTeam.value.id)!;
  return usersStore.getUsersByIds(userIds) as TUser[];
});

const sortedUsers = computed(() => {
  return users.value
    .map((user) => ({
      id: user.id,
      value: teamsStore.isUserInvitePendingByUserIdInTeam(user.id, singularTeam.value!.id)
        ? user.email
        : usersStore.getUserFullNameById(user.id)!,
      isPending: teamsStore.isUserInvitePendingByUserIdInTeam(user.id, singularTeam.value!.id),
    }))
    .sort(
      (a: any, b: any) =>
        // First sort by invite status (pending invites last)
        a.isPending - b.isPending ||
        // Then sort by first name or fallback to email (a-z)
        a.value.localeCompare(b.value),
    );
});
</script>
