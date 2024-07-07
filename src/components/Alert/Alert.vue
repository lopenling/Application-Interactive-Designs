<template>
  <TransitionRoot as="template" :show="open">
    <div
      class="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center p-4 pb-12 sm:pt-6"
    >
      <TransitionChild
        as="div"
        enter="transition-opacity ease-out duration-300 "
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
        class="absolute inset-0 z-0 bg-gradient-to-b from-white/100 from-50% to-transparent transition sm:from-white/50 sm:from-10%"
      />
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0 -translate-y-2 "
        enter-to="opacity-100 translate-y-0"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 "
        leave-to="opacity-0 -translate-y-2"
      >
        <div
          class="pointer-events-auto relative z-10 min-w-full max-w-lg rounded-lg border bg-stone-100 px-4 py-4 shadow-lg+ transition bg-mix-amount-60 sm:min-w-56 sm:px-5"
          :class="[
            appearance === 'success' && 'border-secondary-500/30 bg-mix-secondary-200',
            appearance === 'error' && 'border-red-500/30 bg-mix-red-200',
          ]"
        >
          <div class="flex items-start gap-0">
            <div class="flex gap-4">
              <component
                :is="appearance === 'success' ? IconValidationCheck : IconWarningCircle"
                class="h-4 w-4 shrink-0 grow-0 transition"
                :class="[
                  appearance === 'success' && 'text-secondary-400',
                  appearance === 'error' && 'scale-[1.2] text-red-400',
                ]"
                aria-hidden="true"
                :data-stroke-width="appearance === 'success' ? 3 : 2.5"
              />
              <div class="-mt-0.5">
                <p
                  class="text-pretty text-sm font-medium leading-snug transition"
                  :class="[
                    appearance === 'success' && 'text-secondary-600',
                    appearance === 'error' && 'text-red-600',
                  ]"
                >
                  {{ message }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import { TransitionRoot, TransitionChild } from "@headlessui/vue";

import IconWarningCircle from "@components/icons/streamline/micro-line/IconWarningCircle.vue";
import IconValidationCheck from "@components/icons/streamline/micro-line/IconValidationCheck.vue";

export type TAlert = {
  appearance: "success" | "error";
  message: string;
  timeAlive?: number;
};

type TProps = {
  appearance?: "success" | "error" | null;
  message?: string | null;
  timeAlive?: number | null;
};

const props = defineProps<TProps>();
const open = ref(false);
const appearance = ref<TProps["appearance"]>(null);
const message = ref<TProps["message"]>(null);
const timeAlive = ref<TProps["timeAlive"]>(null);
let timeoutId: number;

const autoClose = (message: string, timeAlive: number) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  let timeoutTime = message.length * 66;
  if (timeAlive || timeoutTime < 2500) {
    timeoutTime = 2500;
  }
  timeoutId = setTimeout(() => {
    open.value = false;
  }, timeoutTime);
};

const handleAlert = () => {
  setTimeout(() => {
    open.value = true;
  }, 200);
  autoClose(message.value!, timeAlive.value!);
};

if (props.message && props.appearance) {
  appearance.value = props.appearance;
  message.value = props.message;
  timeAlive.value = props.timeAlive;
  handleAlert();
}

eventBus.on("open-alert", (event: any) => {
  if (props.message) return;

  appearance.value = event.data.appearance;
  message.value = event.data.message;
  timeAlive.value = event.data.timeAlive;
  handleAlert();
});

eventBus.on("close-alert", (event: any) => {
  if (props.message) return;

  open.value = false;
});
</script>
