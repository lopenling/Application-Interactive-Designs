<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBox">
    <desc>Check 1 Streamline Icon: https://streamlinehq.com</desc>
    <path
      d="M23.25 0.749 8.158 22.308a2.2 2.2 0 0 1 -3.569 0.059L0.75 17.249"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
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
let defaultStrokeWidth = 1.5;
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
