<template>
  <Disclosure as="nav" v-slot="{ open }" v-bind="attributes">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <slot name="logo"></slot>
          </div>
          <div class="hidden sm:-my-px sm:ml-8 sm:flex sm:space-x-8">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current
                  ? 'border-primary-500 text-stone-900'
                  : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition',
              ]"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</a
            >
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div class="flex gap-3">
              <MenuButton
                class="group relative flex rounded-md bg-white text-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img
                  v-if="user.imageUrl"
                  class="h-8 w-8 rounded-md"
                  :src="user.imageUrl"
                  alt=""
                />
                <span
                  v-else
                  class="flex h-8 w-8 items-center justify-center rounded-md bg-primary-400/25 text-center text-sm font-bold tracking-tight text-primary-600/75 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 group-hover:bg-primary-400/40 group-hover:text-primary-600/90"
                >
                  <span>{{ user.initials }}</span>
                </span>
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
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <a
                    :href="item.href"
                    :class="[
                      active ? 'bg-stone-100' : '',
                      'block px-4 py-2 text-sm text-stone-700',
                    ]"
                  >
                    {{ item.name }}
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <VueIcon
              v-if="!open"
              :data="IconDataNavigationMenu"
              :attributes="{ class: `block h-6 w-6` }"
            />
            <VueIcon
              v-else
              :data="IconDataClose"
              :attributes="{ class: `block h-6 w-6` }"
            />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-4 pt-4">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-transparent text-stone-600 hover:border-stone-300 hover:bg-stone-50 hover:text-stone-800',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
      <div class="border-t border-stone-200 pb-8 pt-6">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              v-if="user.imageUrl"
              class="h-8 w-8 rounded-md"
              :src="user.imageUrl"
              alt=""
            />
            <span
              v-else
              class="flex h-8 w-8 items-center justify-center rounded-md bg-primary-400/25 text-center text-sm font-bold tracking-tight text-primary-600/75 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 group-hover:bg-primary-400/30 group-hover:text-primary-600/80"
            >
              <span>{{ user.initials }}</span>
            </span>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-stone-800">
              {{ user.name }}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="block px-4 py-2 text-base font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-800"
          >
            {{ item.name }}
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { type TProps } from "@components/Header/Header.types";

import mergeAttributes from "@scripts/helpers/mergeAttributes";
import navigationData from "@scripts/data/navigationData";
import userData from "@scripts/data/userData";
import userNavigationData from "@scripts/data/userNavigationData";

import VueIcon from "@components/Icon/VueIcon.vue";
import {
  IconDataNavigationMenu,
  IconDataClose,
} from "@scripts/icons/streamline/regular.mjs";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

const props = defineProps<TProps>();
const attributes = mergeAttributes(
  {
    class: `bg-white shadow-sm`,
  },
  props.attributes,
);
const navigation = navigationData(props.pathname);
const user = userData(props.userRole);
const userNavigation = userNavigationData(props.pathname);
</script>
