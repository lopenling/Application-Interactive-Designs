<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="handleClose">
      <!-- 
        HeadlessUI initial focus workaround.
        The first interactive element inside the dialog will be focused when the dialog opens.
        Since there is no easy way to disable this behavior, a workaround is to render a visually 
        hidden dummy button as the first interactive element. However, we don't want to ruin the 
        keyboard navigation experience and will remove the dummy button once it loses focus.
      -->
      <button
        v-if="!props.enableInitialFocus && renderInitialFocusWorkaround"
        @blur="renderInitialFocusWorkaround = false"
        type="button"
        aria-hidden="true"
        class="fixed left-0 top-0 -z-50 h-0 w-0 overflow-hidden opacity-0 outline-none"
      ></button>

      <ModalDialogBackdrop />

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative w-full transform rounded-lg bg-white p-4 pt-6 text-left shadow-xl transition-all 2xs:p-6 2xs:pt-8 sm:my-8 sm:p-8 sm:pb-6"
              :class="[
                props.maxWidth == 'xs' && 'sm:max-w-xs',
                props.maxWidth == 'sm' && 'sm:max-w-sm',
                props.maxWidth == 'md' && 'sm:max-w-md',
                props.maxWidth == 'lg' && 'sm:max-w-lg',
                props.maxWidth == 'xl' && 'sm:max-w-xl',
                props.maxWidth == '2xl' && 'sm:max-w-2xl',
                props.maxWidth == '3xl' && 'sm:max-w-3xl',
                props.maxWidth == '4xl' && 'sm:max-w-4xl',
                props.maxWidth == '5xl' && 'sm:max-w-5xl',
                props.maxWidth == '6xl' && 'sm:max-w-6xl',
                props.maxWidth == '7xl' && 'sm:max-w-7xl',
                props.maxWidth == 'full' && 'sm:max-w-full',
                !props.maxWidth && 'sm:max-w-lg',
              ]"
            >
              <div class="sm:flex sm:items-start">
                <!-- Illustration -->
                <div
                  v-if="slots.illustration"
                  :class="!slots.default && slots.illustration && 'sm:h-px sm:overflow-visible'"
                >
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <slot name="illustration" />
                  </div>
                </div>

                <!-- Content -->
                <div
                  class="min-w-0 grow sm:text-left"
                  :class="slots.illustration && 'mt-3 text-center sm:ml-4 sm:mt-0'"
                >
                  <DialogTitle
                    v-if="slots.title"
                    as="h3"
                    class="text-base font-semibold leading-5 text-stone-800 sm:text-lg sm:font-medium sm:leading-6"
                    :class="slots.illustration && 'sm:mt-2'"
                  >
                    <div
                      v-if="iconButtonsOverflowWidth > 0"
                      class="float-right ml-2.5 h-2.5 sm:block"
                      :class="slots.illustration ? 'hidden' : 'block'"
                      :style="`width: ${iconButtonsOverflowWidth}px;`"
                    />
                    <slot name="title" />
                  </DialogTitle>

                  <div v-if="slots.default" class="text-sm" :class="slots.title && 'mt-3'">
                    <slot name="default" :iconButtonsOverflowWidth="iconButtonsOverflowWidth" />
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div
                v-if="slots.buttons"
                class="flex flex-wrap gap-x-3 gap-y-4 sm:flex-row-reverse"
                :class="
                  props.separateButtons
                    ? 'mt-8 border-t pt-4 2xs:mt-10 2xs:pt-6 sm:mt-9 sm:pt-3'
                    : 'mt-9 sm:mt-6'
                "
              >
                <slot name="buttons" />
              </div>

              <!-- Icon buttons -->
              <div class="absolute right-0 top-0 pr-4 pt-4 2xs:pr-6 2xs:pt-6 sm:pr-8 sm:pt-8">
                <div
                  class="relative -mr-2 -mt-2 flex flex-row gap-1 sm:-mr-2 sm:-mt-2 sm:-translate-y-2.5 sm:translate-x-2.5"
                >
                  <!-- Options dropdown -->
                  <Menu v-if="slots.options" as="div" class="block text-left">
                    <MenuButton
                      as="button"
                      class="rounded-md bg-white p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-0"
                    >
                      <IconNavigationMenuVertical
                        class="h-5 w-5"
                        aria-hidden="true"
                        data-expand-by="2"
                      />
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
                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-stone-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <slot name="options" />

                        <div v-if="!props.stayOpen" class="py-1 sm:hidden">
                          <ModalDialogOption :close-modal="true">Close dialog</ModalDialogOption>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>

                  <!-- Close icon -->
                  <button
                    v-if="!props.stayOpen"
                    type="button"
                    class="rounded-md bg-white p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-0"
                    :class="slots.options ? 'hidden sm:flex' : 'flex'"
                    @click="open = false"
                  >
                    <span class="sr-only">Close</span>
                    <IconClose class="h-5 w-5" aria-hidden="true" data-expand-by="2" />
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";

import { ref, computed, provide, useSlots } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import eventBus from "@scripts/general/eventBus";
import ModalDialogBackdrop from "@components/ModalDialog/ModalDialogBackdrop.vue";
import ModalDialogOption from "@components/ModalDialog/ModalDialogOption.vue";
import IconClose from "@components/icons/streamline/regular/IconClose.vue";
import IconNavigationMenuVertical from "@components/icons/streamline/regular/IconNavigationMenuVertical.vue";

type TProps = {
  name: string;
  isOpen?: boolean;
  stayOpen?: boolean;
  maxWidth?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
  wideButtons?: boolean;
  separateButtons?: boolean;
  enableInitialFocus?: boolean;
};

const props = defineProps<TProps>();
const slots = useSlots();
const open = ref(props.isOpen);
const renderInitialFocusWorkaround = ref(true);

const iconButtonsOverflowWidth = computed(() => {
  const iconButtonWidth = 36; // in pixels
  const iconButtonsGap = 4; // in pixels
  let width = 0;
  if (!props.stayOpen) width += iconButtonWidth;
  if (slots.options) width += iconButtonWidth;
  if (slots.options && !props.stayOpen) width += iconButtonsGap;
  if (width > 0) width -= iconButtonWidth / 2;
  return width;
});

const handleClose = () => {
  if (props.stayOpen) return;
  open.value = false;
};

provide("name", props.name);
provide("wideButtons", props.wideButtons);

eventBus.on("open-modal", (event: any) => {
  if (event.name !== props.name) return;
  renderInitialFocusWorkaround.value = true;
  open.value = true;
});

eventBus.on("close-modal", (event: any) => {
  if (event.name !== props.name) return;
  open.value = false;
});
</script>
