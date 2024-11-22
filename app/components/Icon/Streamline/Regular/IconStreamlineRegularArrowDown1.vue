<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBox">
    <desc>Arrow Down 1 Streamline Icon: https://streamlinehq.com</desc>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M23.25 7.311 12.53 18.03c-0.0696 0.0697 -0.1522 0.1249 -0.2431 0.1626 -0.091 0.0378 -0.1885 0.0572 -0.2869 0.0572 -0.0984 0 -0.1959 -0.0194 -0.2869 -0.0572 -0.0909 -0.0377 -0.1735 -0.0929 -0.2431 -0.1626L0.75 7.311"
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
