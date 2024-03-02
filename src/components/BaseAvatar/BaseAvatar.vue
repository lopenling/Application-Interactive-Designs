<template>
  <div :class="['flex shrink-0', props.sizeClass ? props.sizeClass : 'size-8']">
    <img
      v-if="props.user.avatarUrl && !hideImage"
      v-bind="$attrs"
      :src="props.user.avatarUrl"
      :alt="getUserFullNameById(props.user.id)"
      :class="[
        'rounded-md transition',
        props.sizeClass ? props.sizeClass : 'size-8',
        props.groupHover && 'group-hover:opacity-85 ',
        props.subdueImage && 'opacity-60 grayscale',
      ]"
    />
    <span
      v-else
      v-bind="$attrs"
      :class="[
        'flex items-center justify-center rounded-md bg-primary-400/25 text-center text-sm font-bold text-primary-600/75 transition',
        props.sizeClass ? props.sizeClass : 'size-8',
        props.groupHover && 'group-hover:bg-primary-400/40 group-hover:text-primary-600/90',
        props.subdueImage && 'opacity-60 grayscale',
      ]"
    >
      <span>{{ props.user.firstName.charAt(0) + props.user.lastName.charAt(0) }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { type TUser } from "@scripts/data/usersData";
import getUserFullNameById from "@scripts/helpers/getUserFullNameById";

defineOptions({
  inheritAttrs: false,
});

type TProps = {
  user: TUser;
  sizeClass?: string;
  groupHover?: boolean;
  hideImage?: boolean;
  subdueImage?: boolean;
};
const props = defineProps<TProps>();
</script>
