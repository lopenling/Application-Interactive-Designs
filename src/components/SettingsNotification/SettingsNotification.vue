<template>
  <div
    class="flex flex-col rounded-md border border-secondary-500/15 bg-secondary-200/60 transition-opacity sm:flex-row"
  >
    <div class="grow">
      <slot name="default" />
    </div>

    <div class="group -mt-0.5 flex items-center text-sm sm:mx-4 sm:mr-4 sm:mt-0">
      <slot name="buttons" />
    </div>
  </div>
</template>
