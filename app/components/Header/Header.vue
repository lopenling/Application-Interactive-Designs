<template>
  <header class="bg-white shadow-sm shadow-black/[7.5%]">
    <div class="container-xl flex h-[--header-height] gap-x-9">
      <div class="flex grow gap-x-9">
        <div class="flex items-center">
          <NuxtLink to="/">
            <Logo />
          </NuxtLink>
        </div>
        <div class="hidden sm:flex">
          <HeaderMainMenu />
        </div>
      </div>
    </div>
  </header>
</template>
