<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBox">
    <desc>Warning Circle Streamline Icon: https://streamlinehq.com</desc>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 22.8a10.799999999999999 10.799999999999999 0 1 0 0 -21.599999999999998 10.799999999999999 10.799999999999999 0 0 0 0 21.599999999999998Z"
      :stroke-width="strokeWidth"
    ></path>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 6.6v4.8"
      :stroke-width="strokeWidth"
    ></path>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 17.3904a0.6 0.6 0 0 1 0 -1.2"
      :stroke-width="strokeWidth"
    ></path>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 17.3904a0.6 0.6 0 0 0 0 -1.2"
      :stroke-width="strokeWidth"
    ></path>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  strokeWidth: Number,
  expandBy: Number,
});

let viewBox = "0 0 24 24";
let defaultStrokeWidth = 1;
let strokeWidth = props.strokeWidth || defaultStrokeWidth;

let expandBy = props.expandBy;
if (expandBy == undefined) {
  expandBy = (strokeWidth - defaultStrokeWidth) / 2;
}
viewBox = viewBox
  .split(" ")
  .map((value, index) => parseInt(value) + (index < 2 ? -expandBy : expandBy * 2))
  .join(" ");
</script>
