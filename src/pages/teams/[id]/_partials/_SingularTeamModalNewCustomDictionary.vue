<template>
  <ModalDialog
    name="singular-team-new-custom-dictionary"
    max-width="2xl"
    :separate-buttons="true"
    enable-initial-focus="smAndUp"
  >
    <p class="max-w-prose text-pretty">
      The CSV file must be in the correct format, make sure it follows the template which you can
      <button
        type="button"
        class="-mx-px inline-flex rounded-md px-px font-semibold text-primary-600 underline underline-offset-2 transition hover:text-primary-500 focus-visible:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-0"
        :tabindex="downloadButtonTabIndex"
      >
        download here</button
      >.
    </p>
    <form
      id="newCustomDictionaryForm"
      @submit.prevent="handleFormSubmit"
      class="mb-6 mt-6 flex flex-col gap-x-4 gap-y-2.5 text-left sm:mb-4"
    >
      <div class="sm:w-1/2">
        <BaseLabel for="dictionary-name">Name</BaseLabel>
        <BaseInputText
          v-model="newCustomDictionaryName"
          appearance="white"
          type="text"
          name="dictionary-name"
          id="dictionary-name"
          inputmode="text"
          autocomplete="off"
          required
        />
      </div>
      <div>
        <BaseLabel for="dictionary-file">CSV file</BaseLabel>
        <BaseInputFile id="dictionary-file" tabindex="-1" appearance="transparent" />
      </div>
    </form>
    <p class="max-w-prose text-left text-stone-500">
      The uploaded CSV file size must be less than 100MB. A team can have up to
      {{ MAX_CUSTOM_DICTIONARIES }} custom dictionaries.
    </p>

    <template #title>Import a Custom Dictionary</template>
    <template #illustration>
      <ModalDialogIllustration :icon-component="IconBookEdit" appearance="primary" />
    </template>
    <template #buttons>
      <ModalDialogButton
        appearance="primary"
        :close-modal="false"
        @focus="downloadButtonTabIndex = 0"
        type="submit"
        form="newCustomDictionaryForm"
      >
        Upload dictionary
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { useDictionariesStore } from "@stores/dictionariesStore";
import { MAX_CUSTOM_DICTIONARIES } from "@scripts/data/constants";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import ModalDialogIllustration from "@components/ModalDialog/ModalDialogIllustration.vue";
import BaseLabel from "@components/BaseLabel/BaseLabel.vue";
import BaseInputText from "@components/BaseInputText/BaseInputText.vue";
import BaseInputFile from "@components/BaseInputFile/BaseInputFile.vue";

import IconBookEdit from "@components/icons/streamline/regular/IconBookEdit.vue";

export type TSingularTeamModalNewCustomDictionary = {
  teamId: number;
};

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const dictionariesStore = useDictionariesStore();
const newCustomDictionaryName = ref("");

const handleFormSubmit = () => {
  dictionariesStore.addNewCustomDictionary({
    dictionaryName: newCustomDictionaryName.value,
    teamId: singularTeam.value.id,
  });
  newCustomDictionaryName.value = "";
  eventBus.emit("close-modal", { name: "singular-team-new-custom-dictionary" });
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "singular-team-new-custom-dictionary") return;
  let teamId: TSingularTeamModalNewCustomDictionary["teamId"] = event.data.teamId;

  singularTeam.value = teamsStore.getTeamById(teamId)!;
});

const downloadButtonTabIndex = ref(-1);
</script>
