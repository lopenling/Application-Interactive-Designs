<template>
  <ModalDialog name="singular-team-edit-custom-dictionary" max-width="xl" :separate-buttons="true">
    <form
      id="editCustomDictionaryForm"
      @submit.prevent="handleFormSubmit"
      class="mb-6 mt-6 flex flex-col gap-x-4 gap-y-2.5 text-left sm:mb-4"
    >
      <div class="sm:w-1/2">
        <BaseLabel for="dictionary-name">Name</BaseLabel>
        <BaseInputText
          v-model="dictionaryName"
          appearance="white"
          type="text"
          name="dictionary-name"
          id="dictionary-name"
          inputmode="text"
          pattern="[a-zA-Z0-9_\-\(\)][a-zA-Z0-9_\-\(\) ]{1,49}"
          autocomplete="off"
          title="2-50 letters, no special characters except _ - ( )"
          required
        />
      </div>
    </form>

    <template #title>Edit Custom Dictionary</template>
    <template #illustration>
      <ModalDialogIllustration :icon-component="IconBookEdit" appearance="primary" />
    </template>
    <template #buttons>
      <ModalDialogButton
        appearance="primary"
        :close-modal="false"
        type="submit"
        form="editCustomDictionaryForm"
      >
        Apply changes
      </ModalDialogButton>
    </template>
    <template #options>
      <div class="py-1">
        <ModalDialogOption>Delete dictionary</ModalDialogOption>
      </div>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useDictionariesStore, type TCustomDictionary } from "@stores/dictionariesStore";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import ModalDialogOption from "@components/ModalDialog/ModalDialogOption.vue";
import ModalDialogIllustration from "@components/ModalDialog/ModalDialogIllustration.vue";
import BaseLabel from "@components/BaseLabel/BaseLabel.vue";
import BaseInputText from "@components/BaseInputText/BaseInputText.vue";

import IconBookEdit from "@components/icons/streamline/regular/IconBookEdit.vue";

export type TSingularTeamModalEditCustomDictionary = {
  dictionaryId: number;
};

const dictionariesStore = useDictionariesStore();
const singularCustomDictionary = ref({} as TCustomDictionary);
const dictionaryName = ref("");

const handleFormSubmit = () => {
  dictionariesStore.renameCustomDictionary({
    dictionaryId: singularCustomDictionary.value.id,
    dictionaryName: dictionaryName.value,
  });
  eventBus.emit("close-modal", { name: "singular-team-edit-custom-dictionary" });
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "singular-team-edit-custom-dictionary") return;
  let dictionaryId: TSingularTeamModalEditCustomDictionary["dictionaryId"] =
    event.data.dictionaryId;

  singularCustomDictionary.value = dictionariesStore.getCustomDictionaryById(dictionaryId)!;
  dictionaryName.value = singularCustomDictionary.value.name;
});
</script>
