<template>
  <div v-if="singularTeam && role == 'admin'">
    <CardHeader>
      <CardHeaderHeading>
        Custom dictionaries

        <template #extraHeading v-if="enabledCustomDictionaries && userInFilter">
          &ndash; {{ usersStore.getUserFullNameById(userInFilter.id) }}
        </template>
      </CardHeaderHeading>

      <template #button>
        <CardHeaderButton @click="openModalSingularTeamNewCustomDictionary()">
          Import
        </CardHeaderButton>
      </template>
    </CardHeader>

    <SettingsCard class="divide-y">
      <SettingsCardRowExpandableToggle
        v-if="allCustomDictionaries && !userInFilter && state == 'filled'"
        v-for="dictionary in allCustomDictionaries"
        :key="`custom-${componentKey}-${dictionary.id}`"
        :modelValue="
          teamsStore.isCustomDictionaryEnabledByDictionaryIdInTeam(dictionary.id, singularTeam.id)!
        "
        @update:modelValue="
          teamsStore.toggleCustomDictionaryInTeam({
            dictionaryId: dictionary.id,
            teamId: singularTeam.id,
          })
        "
      >
        {{ dictionary.name }}
        <span
          v-if="
            teamsStore.isDictionaryIdInCustomDictionaryExlcudedUsers(dictionary.id, singularTeam.id)
          "
          class="font-normal text-stone-400/80"
          title="Some users are excluded"
          v-text="'*'"
        />

        <template #extraButtons>
          <SettingsCardSubtleButton
            @click="openModalSingularTeamEditCustomDictionary({ dictionaryId: dictionary.id })"
            :iconComponent="IconAdd"
          >
            Edit
          </SettingsCardSubtleButton>
        </template>
        <template #expandableArea>
          <SettingsCardSubRowToggle
            v-for="user in sortedUsers"
            :modelValue="
              !teamsStore.isUserExcludedFromCustomDictionary(
                user.id,
                dictionary.id,
                singularTeam.id,
              )!
            "
            @update:modelValue="
              ($event) => {
                teamsStore.updateUserExcludedFromCustomDictionary({
                  userId: user.id,
                  dictionaryId: dictionary.id,
                  value: $event,
                  teamId: singularTeam.id,
                });
              }
            "
            :is-grayscale="
              !teamsStore.isCustomDictionaryEnabledByDictionaryIdInTeam(
                dictionary.id,
                singularTeam.id,
              )
            "
          >
            <span v-if="user.invitePending" class="block truncate">{{ user.email }}</span>
            <span v-else>{{ usersStore.getUserFullNameById(user.id) || user.email }}</span>

            <template #extraData v-if="!user.invitePending">
              {{ user.email }}
            </template>
          </SettingsCardSubRowToggle>
        </template>
      </SettingsCardRowExpandableToggle>

      <!-- Filter applied -->

      <SettingsCardRowToggle
        v-if="userInFilter"
        v-for="dictionary in showDisabledDictionaries
          ? allCustomDictionaries
          : enabledCustomDictionaries"
        :modelValue="
          !teamsStore.isUserExcludedFromCustomDictionary(
            userInFilter!.id,
            dictionary.id,
            singularTeam.id,
          )!
        "
        @update:modelValue="
          teamsStore.updateUserExcludedFromCustomDictionary({
            userId: userInFilter.id,
            dictionaryId: dictionary.id,
            value: $event,
            teamId: singularTeam.id,
          })
        "
        appearance="secondary"
      >
        {{ dictionary.name }}
        <span
          v-if="
            !teamsStore.isCustomDictionaryEnabledByDictionaryIdInTeam(
              dictionary.id,
              singularTeam.id,
            )
          "
          class="font-normal text-stone-400/80"
        >
          &ndash; Disabled
        </span>
      </SettingsCardRowToggle>

      <!-- No rows -->

      <SettingsCardRowMessage v-if="allCustomDictionaries.length === 0 || state == 'empty'">
        No dictionaries imported yet
      </SettingsCardRowMessage>

      <SettingsCardRowMessage
        v-if="
          userInFilter &&
          !showDisabledDictionaries &&
          enabledCustomDictionaries.length === 0 &&
          allCustomDictionaries
        "
      >
        No custom dictionaries enabled
      </SettingsCardRowMessage>
    </SettingsCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam, type TUserInFilter } from "@stores/teamsStore";
import { useUsersStore, type TUser } from "@stores/usersStore";
import { useDictionariesStore } from "@stores/dictionariesStore";

import { type AstroGlobal } from "astro";
import { type TSingularTeamModalEditCustomDictionary } from "./_SingularTeamModalEditCustomDictionary.vue";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";

import CardHeader from "@components/CardHeader/CardHeader.vue";
import CardHeaderHeading from "@components/CardHeader/CardHeaderHeading.vue";
import CardHeaderButton from "@components/CardHeader/CardHeaderButton.vue";
import SettingsCard from "@components/SettingsCard/SettingsCard.vue";
import SettingsCardRowToggle from "@components/SettingsCard/SettingsCardRowToggle.vue";
import SettingsCardRowExpandableToggle from "@components/SettingsCard/SettingsCardRowExpandableToggle.vue";
import SettingsCardSubRowToggle from "@components/SettingsCard/SettingsCardSubRowToggle.vue";
import SettingsCardRowMessage from "@components/SettingsCard/SettingsCardRowMessage.vue";
import SettingsCardSubtleButton from "@components/SettingsCard/SettingsCardSubtleButton.vue";

import IconAdd from "@components/icons/streamline/regular/IconAdd.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const params = props.astro.params;
const currentTeamId = Number(params.id);
const role = getRole(props.astro);
const state = getState(props.astro);

const teamsStore = useTeamsStore();
const usersStore = useUsersStore();
const dictionariesStore = useDictionariesStore();
const singularTeam = computed(() => teamsStore.getTeamById(currentTeamId) as TTeam);
const userInFilter = computed(() => teamsStore.userInFilter as TUserInFilter);
const showDisabledDictionaries = computed(() => teamsStore.showDisabledDictionaries);

const users = computed(() => {
  const userIds = teamsStore.getAllUserIdsInTeam(singularTeam.value.id)!;
  return usersStore.getUsersByIds(userIds) as TUser[];
});

const sortedUsers = computed(() => {
  return users.value
    .map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      invitePending: teamsStore.isUserInvitePendingByUserIdInTeam(user.id, singularTeam.value!.id),
    }))
    .sort(
      (a: any, b: any) =>
        // First sort by invite status (pending invites last)
        a.invitePending - b.invitePending ||
        // Then sort by first name (a-z)
        a.firstName.localeCompare(b.firstName),
    );
});

const allCustomDictionaries = computed(() => {
  const allCustomDictionaryIds = teamsStore.getAllCustomDictionaryIdsInTeam(singularTeam.value.id);
  return dictionariesStore.getCustomDictionariesByIds(allCustomDictionaryIds!);
});

const enabledCustomDictionaries = computed(() => {
  const enabledCustomDictionaryIds = singularTeam.value.enabledCustomDictionaryIds;
  return dictionariesStore.getCustomDictionariesByIds(enabledCustomDictionaryIds);
});

const openModalSingularTeamNewCustomDictionary = () => {
  eventBus.emit("open-modal", { name: "singular-team-new-custom-dictionary" });
};
const openModalSingularTeamEditCustomDictionary = (
  data: TSingularTeamModalEditCustomDictionary,
) => {
  eventBus.emit("open-modal", { name: "singular-team-edit-custom-dictionary", data: data });
};

// Force components to re-render onmount to fix rendering bug. Hopefully not
// needed in prodction and is only Astro + Vue combo problem?
const componentKey = ref(0);
onMounted(() => {
  componentKey.value++;
});
</script>
