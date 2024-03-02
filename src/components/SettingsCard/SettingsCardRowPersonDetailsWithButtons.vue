<template>
  <div
    class="flex flex-row items-start justify-between gap-2 px-4 pb-6 pt-4 text-sm text-stone-700 sm:items-center sm:py-4"
  >
    <div
      class="flex min-w-0 grow flex-col items-start gap-x-4 gap-y-2 2xs:flex-row sm:items-center"
    >
      <BaseAvatar
        :user="person"
        :group-hover="true"
        :hide-image="props.hideImage"
        :subdue-image="props.subdueImage"
        size-class="size-9"
      />

      <div class="flex w-full min-w-0 grow flex-col gap-x-4 gap-y-2 sm:flex-row sm:items-center">
        <div :class="['flex min-w-0 flex-col', slots.extraData ? 'basis-1/2' : 'basis-full']">
          <div class="text-sm font-medium text-stone-700">
            {{ getUserFullNameById(person.id) }}
          </div>
          <div class="truncate text-xs leading-5 text-stone-500/85" :title="person.email">
            {{ person.email }}
          </div>
        </div>

        <div v-if="slots.extraData" class="flex min-w-0 basis-1/2 text-sm text-stone-500/85">
          <slot name="extraData" />
        </div>
      </div>
    </div>

    <div class="flex shrink-0 flex-col justify-start gap-2 xs:flex-row sm:w-auto sm:justify-start">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TUser } from "@scripts/data/usersData";
import getUserFullNameById from "@scripts/helpers/getUserFullNameById";
import BaseAvatar from "@components/BaseAvatar/BaseAvatar.vue";
import { useSlots } from "vue";

type TProps = {
  person: TUser;
  hideImage?: boolean;
  subdueImage?: boolean;
};
const props = defineProps<TProps>();
const slots = useSlots();
</script>
