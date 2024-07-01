<template>
  <Menu as="div" class="relative">
    <div class="flex gap-3">
      <MenuButton
        class="group relative flex rounded-md bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <span class="absolute -inset-1.5"></span>
        <span class="sr-only">Open user menu</span>
        <BaseAvatar
          :user-id="signedInUser.id"
          :group-hover="true"
          :hide-image="state == 'empty'"
          size-class="size-8"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
          <a
            :href="item.href"
            :class="[
              item.current ? 'border-primary-500 font-medium text-stone-900' : 'border-transparent',
              active ? 'bg-stone-100' : '',
              'block border-l-2 px-4 py-2 text-sm text-stone-700 ',
            ]"
          >
            {{ item.name }}
          </a>
        </MenuItem>

        <div class="my-2 border-b border-gray-100"></div>

        <MenuItem v-for="item in userNavigationExtra" :key="item.name" v-slot="{ active }">
          <a
            :href="item.href"
            :class="[
              active ? 'bg-stone-100' : '',
              'block border-l-2 border-transparent px-4 py-2 text-sm text-stone-700',
            ]"
          >
            {{ item.name }}
          </a>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { type AstroGlobal } from "astro";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";

import signedInUserData from "@scripts/data/signedInUserData";
import userNavigationData from "@scripts/data/userNavigationData";
import userNavigationExtraData from "@scripts/data/userNavigationExtraData";

import BaseAvatar from "@components/BaseAvatar/BaseAvatar.vue";

type TProps = { astro: AstroGlobal };

const props = defineProps<TProps>();
const role = getRole(props.astro);
const state = getState(props.astro);
const signedInUser = signedInUserData(role);

const userNavigation = userNavigationData(props.astro);
const userNavigationExtra = userNavigationExtraData(props.astro);
</script>
