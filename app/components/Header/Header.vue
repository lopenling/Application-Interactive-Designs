<template>
  <header class="bg-white shadow-sm">
    <div class="container-xl flex min-h-16 gap-x-9">
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
