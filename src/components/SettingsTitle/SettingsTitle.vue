<template>
  <div class="mb-10 mt-12 flex">
    <div :class="slots.options && 'flex flex-row items-center gap-2'">
      <slot name="default" />

      <Menu v-if="slots.options" as="div" class="relative block text-left">
        <MenuButton
          as="button"
          class="rounded-md p-2 text-stone-500 transition-colors hover:bg-stone-200/80 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-0"
        >
          <IconNavigationMenuVertical class="h-5 w-5" aria-hidden="true" data-expand-by="2" />
        </MenuButton>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute left-1/2 z-20 mt-2 w-48 origin-top-left -translate-x-1/2 divide-y divide-stone-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <slot name="options" />
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import IconNavigationMenuVertical from "@components/icons/streamline/regular/IconNavigationMenuVertical.vue";

const slots = useSlots();
</script>
