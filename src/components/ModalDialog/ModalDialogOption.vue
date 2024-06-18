<template>
  <MenuItem v-slot="{ active }">
    <component
      :is="props.href ? 'a' : 'button'"
      :href="props.href"
      class="block w-full px-4 py-2 text-left text-sm"
      :class="active ? 'bg-stone-100 text-stone-900' : 'text-stone-700'"
      @click="handleClick"
    >
      <slot name="default" />
    </component>
  </MenuItem>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { MenuItem } from "@headlessui/vue";
import eventBus from "@scripts/general/eventBus";

type TProps = {
  closeModal?: boolean;
  href?: string;
};

const props = defineProps<TProps>();
const name = inject<string>("name");

const handleClick = () => {
  if (props.closeModal && name) {
    eventBus.emit("close-modal", { name: name });
  }
};
</script>
