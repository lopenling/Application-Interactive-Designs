<template>
  <div :class="['flex shrink-0', props.sizeClass ? props.sizeClass : 'size-8']">
    <img
      v-if="user.avatarUrl && !props.hideImage"
      v-bind="$attrs"
      :src="user.avatarUrl"
      :alt="usersStore.getUserFullNameById(user.id) || ''"
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
      <span v-if="props.hideImage">{{ usersStore.getUserEmailFirstLetterById(user.id) }}</span>
      <span v-else>{{ usersStore.getUserInitialsById(user.id) }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUsersStore, type TUser } from "@stores/usersStore";

defineOptions({
  inheritAttrs: false,
});

type TProps = {
  userId: TUser["id"];
  sizeClass?: string;
  groupHover?: boolean;
  hideImage?: boolean;
  subdueImage?: boolean;
};
const props = defineProps<TProps>();
const usersStore = useUsersStore();
const user = computed(() => usersStore.getUserById(props.userId) as TUser);
</script>
