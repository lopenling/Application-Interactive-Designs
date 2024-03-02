<template>
  <div class="flex items-center justify-between gap-2 px-4 text-sm text-stone-700">
    <div class="py-4">
      <slot name="default" />
    </div>

    <div class="flex gap-2">
      <slot name="buttons" />
    </div>
  </div>
</template>
