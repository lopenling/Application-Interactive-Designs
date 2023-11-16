<template>
  <Popover
    v-bind="attributes"
    v-slot="{ open }"
    :style="[
      `--buttonDistanceFromLeftEdge:${buttonBoundingBox.left.value}px;`,
      `--panelOverflowDistance:${panelOverflowDistance}px;`,
    ]"
  >
    <PopoverButton v-bind="buttonAttributes">
      <div ref="referenceElement">
        <slot name="button"></slot>
      </div>
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <PopoverPanel v-bind="panelAttributes">
        <div
          v-bind="innerPanelAttributes"
          :style="{ maxWidth: panelWidth + 'px' }"
        >
          <slot name="panel"></slot>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
import { type TProps } from "@components/BasicPopover/BasicPopover.types";
import mergeAttributes from "@scripts/helpers/mergeAttributes";
import measureScrollbarWidth from "@scripts/general/measureScrollbarWidth";

import { ref, onMounted, watch, computed } from "vue";
import { useElementBounding, useWindowSize } from "@vueuse/core";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

const props = defineProps<TProps>();

const referenceElement = ref<HTMLElement | null>(null);
const buttonBoundingBox = useElementBounding(referenceElement);
const windowSize = useWindowSize();
const scrollbarWidth = ref(0);
const panelWidth = ref(0);

// Distance between the button center and the center of the screen.
const buttonOffsetFromCenter = computed(
  () =>
    buttonBoundingBox.left.value +
    buttonBoundingBox.width.value / 2 -
    windowSize.width.value / 2,
);

/**
 * This function checks if the provided panel width is larger than the current
 * window width (without scrollbar).
 * If panel is larger, it will return the window width (without scrollbar).
 * If panel is not larger, it will return the provided panel width.
 * If no width is provided, it will return the default width of 320.
 */
const decidePanelWidth = () => {
  let width = props.panel?.width ?? 320;

  if (width > windowSize.width.value - scrollbarWidth.value) {
    return windowSize.width.value - scrollbarWidth.value;
  }
  return width;
};

panelWidth.value = decidePanelWidth();

/**
 * By reading the `buttonOffsetFromCenter` value, we can determine on which side
 * of the screen the button is located.
 * (negative value = left side, positive value = right ride).
 *
 * If the button is on the right side of the screen, then we need offset the panel
 * to the left with negative transalte-x value (aka `panelOverflowDistance`) and
 * vice versa for the left side with positive translate-x value.
 *
 * This offset is needed so that the panel stays always readable, even when
 * positioned close the the edge of the screen.
 */
const panelOverflowDistance = computed(() => {
  if (buttonOffsetFromCenter.value >= 0) {
    // Button on the right side of the screen
    let value =
      windowSize.width.value -
      scrollbarWidth.value -
      buttonBoundingBox.right.value +
      buttonBoundingBox.width.value / 2 -
      panelWidth.value / 2;

    return Math.min(0, value);
  } else {
    // Button on the left side of the screen
    let value =
      panelWidth.value / 2 -
      buttonBoundingBox.width.value / 2 -
      buttonBoundingBox.left.value;

    return Math.max(0, value);
  }
});

// --- //

const attributes = mergeAttributes(
  {
    class: `relative inline-flex`,
    as: "div",
  },
  props.attributes,
);

const buttonAttributes = mergeAttributes(
  {
    class: `group inline-flex outline-none`,
    as: "button",
  },
  props.button?.attributes,
);

const panelAttributes = mergeAttributes(
  {
    class: `
      absolute z-10 flex w-[calc(100vw-var(--scrollbarWidth))] max-w-min left-1/2 -translate-x-1/2 ml-[--panelOverflowDistance]
      ${props.position == "top" ? "bottom-full mb-1" : "top-full mt-1"}
    `,
  },
  props.panel?.attributes,
);

const innerPanelAttributes = mergeAttributes(
  {
    class: `w-screen shrink rounded-xl bg-white p-4 shadow-lg ring-1 ring-stone-900/10`,
  },
  props.panel?.attributes,
);

// --- //

onMounted(() => {
  scrollbarWidth.value = measureScrollbarWidth();
  panelWidth.value = decidePanelWidth();
});

watch([windowSize.width, windowSize.height], () => {
  scrollbarWidth.value = measureScrollbarWidth();
  panelWidth.value = decidePanelWidth();
});
</script>
