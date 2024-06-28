<template>
  <div class="flex flex-row">
    <BaseInputText
      v-bind="$attrs"
      v-model="selectedFilename"
      @click="triggerFileInputClick"
      :appearance="props.appearance"
      :shadow="props.shadow"
      class="rounded-r-none"
      type="text"
      readonly
    />
    <BaseInputButton
      @click="triggerFileInputClick"
      :appearance="props.appearance"
      :shadow="props.shadow"
      placement="right"
    >
      {{ props.buttonText || "Choose a file" }}
    </BaseInputButton>
    <input type="file" @change="handleSelectedFile" ref="fileInput" class="absolute hidden" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInputText from "@components/BaseInputText/BaseInputText.vue";
import BaseInputButton from "@components/BaseInputButton/BaseInputButton.vue";

defineOptions({
  inheritAttrs: false,
});

type TProps = {
  modelValue?: String;
  buttonText?: String;
  appearance?: "gray" | "white" | "transparent";
  shadow?: boolean;
};

const props = defineProps<TProps>();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFilename = ref("");

const triggerFileInputClick = () => {
  if (fileInput.value) fileInput.value.click();
};
const handleSelectedFile = (event: any) => {
  const file = event.target.files[0];
  if (file) selectedFilename.value = file.name;
};
</script>
