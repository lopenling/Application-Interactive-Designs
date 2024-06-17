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

      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 overflow-hidden bg-transparent transition-opacity sm:bg-stone-950/5"
        >
          <div
            class="absolute left-1/2 top-1/2 h-[100vw] w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-stone-100/50 from-0% to-stone-200 to-90% sm:bg-gradient-radial sm:from-stone-100/70 sm:from-40% sm:to-stone-200 sm:to-100% portrait:h-[100vh] portrait:w-[100vh]"
          />
        </div>
      </TransitionChild>

      <!-- Modal -->
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
              class="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6"
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
              <!-- Content -->
              <div class="sm:flex sm:items-start">
                <div
                  v-if="slots.illustration"
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center sm:mx-0 sm:h-10 sm:w-10"
                >
                  <slot name="illustration" />
                </div>
                <div
                  :class="[
                    'text-center sm:text-left',
                    slots.illustration && 'mt-3 sm:ml-4 sm:mt-0',
                  ]"
                >
                  <DialogTitle
                    v-if="slots.title"
                    as="h3"
                    class="text-base font-semibold leading-6 text-stone-900"
                  >
                    <slot name="title" />
                  </DialogTitle>

                  <div :class="['text-sm', slots.title && 'mt-2 ']">
                    <slot name="default" />
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div
                v-if="slots.buttons"
                class="mt-6 flex flex-wrap gap-3 sm:mt-4 sm:flex-row-reverse"
              >
                <slot name="buttons" />
              </div>

              <!-- Close button -->
              <div v-if="!props.stayOpen" class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="-translate-y-0.75 translate-x-0.75 rounded-md bg-white p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-0"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  <IconClose class="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, provide, useSlots } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import eventBus from "@scripts/general/eventBus";
import IconClose from "@components/icons/streamline/regular/IconClose.vue";

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
  enableInitialFocus?: boolean;
};

const props = defineProps<TProps>();
const slots = useSlots();
const open = ref(props.isOpen);
const renderInitialFocusWorkaround = ref(true);

const handleClose = () => {
  if (props.stayOpen) return;
  open.value = false;
};

provide("name", props.name);
provide("wideButtons", props.wideButtons);

eventBus.on("modal-open", (name) => {
  if (name !== props.name) return;
  open.value = true;
});
eventBus.on("modal-close", (name) => {
  if (name !== props.name) return;
  open.value = false;
});
</script>
