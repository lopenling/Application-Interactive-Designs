<template>
  <HeadElements />
  <Header />
  <div class="flex grow">
    <main
      class="flex grow items-center transition-transform duration-300 ease-out"
      :class="store.isSidebarVisible && 'xl:mr-[--sidebar-width]'"
      ref="main"
    >
      <slot />
    </main>

    <aside class="relative">
      <div
        class="sidebar group/sidebar mouse:before:dummy-scrollbar-gutter absolute inset-y-0 right-0 max-w-[85vw] mouse:before:fixed mouse:before:hidden mouse:before:opacity-[--is-body-scrollable] mouse:hover:before:block"
        :class="(store.isSidebarVisible || store.isSidebarInTransition) && 'w-[--sidebar-width]'"
        ref="sidebar"
      >
        <div
          class="size-full overflow-x-clip mouse:group-hover/sidebar:overflow-x-visible"
          :class="(store.isSidebarVisible || store.isSidebarInTransition) && 'pl-shadow-md-x'"
        >
          <div
            class="size-full mouse:translate-x-[calc(var(--body-scrollbar-width)_*_var(--is-sidebar-content-scrollable))]"
          >
            <transition
              enter-active-class="transition ease-out duration-300"
              enter-from-class="opacity-0 translate-x-4"
              enter-to-class="opacity-100 translate-x-0 "
              leave-active-class="transition ease-out duration-300"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 translate-x-4"
              @before-enter="
                store.isSidebarInTransition = true;
                $refs.main.style.removeProperty('transition-duration');
                $refs.main.classList.remove('xl:mr-[--sidebar-width]');
                $refs.sidebar.classList.add('w-[--sidebar-width]');
              "
              @enter="$refs.main.classList.add('xl:-translate-x-[--sidebar-half-width]')"
              @after-enter="
                store.isSidebarInTransition = false;
                $refs.main.style.transitionDuration = '0s';
                $refs.main.classList.add('xl:mr-[--sidebar-width]');
                $refs.main.classList.remove('xl:-translate-x-[--sidebar-half-width]');
              "
              @before-leave="
                store.isSidebarInTransition = true;
                $refs.main.style.removeProperty('transition-duration');
                $refs.main.classList.add('xl:mr-[--sidebar-width]');
                $refs.sidebar.classList.add('w-[--sidebar-width]');
              "
              @leave="$refs.main.classList.add('xl:translate-x-[--sidebar-half-width]')"
              @after-leave="
                store.isSidebarInTransition = false;
                $refs.main.style.transitionDuration = '0s';
                $refs.main.classList.remove(
                  'xl:mr-[--sidebar-width]',
                  'xl:translate-x-[--sidebar-half-width]',
                );
                $refs.sidebar.classList.remove('w-[--sidebar-width]');
              "
            >
              <div
                v-if="store.isSidebarVisible"
                class="sticky top-0 h-full max-h-[--visual-viewport-height,100vh] border-l-2 border-white bg-gradient-to-r from-stone-25 via-stone-50 via-25% to-stone-50 shadow-md"
                :class="[
                  'before:pointer-events-none before:absolute before:left-[-2px] before:right-0 before:top-0 before:h-[1px] before:bg-stone-50',
                  'after:pointer-events-none after:absolute after:left-[-2px] after:right-0 after:top-0 after:h-[3px] after:bg-gradient-to-b after:from-black/[7.5%] after:to-transparent',
                ]"
              >
                <div class="flex h-full flex-col">
                  <div
                    class="grow overflow-y-auto overscroll-contain pb-[--header-height]"
                    ref="sidebarContentRef"
                  >
                    <slot name="sidebar-content" />
                  </div>
                  <div
                    class="mouse:before:dummy-scrollbar-gutter sticky bottom-0 mouse:pr-[--sidebar-content-scrollbar-width] mouse:before:opacity-[var(--is-sidebar-content-scrollable,0)]"
                  >
                    <slot name="sidebar-footer" />
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    style: `
      --sidebar-width: 300px;
      --sidebar-half-width: calc(var(--sidebar-width) / 2);
      --body-scrollbar-width: calc(var(--scrollbar-width) * var(--is-body-scrollable));
      --sidebar-content-scrollbar-width: calc(var(--scrollbar-width) * var(--is-sidebar-content-scrollable));
    `,
  },
  bodyAttrs: {
    class: [
      "mouse:[&:has(.sidebar:hover)]:overflow-hidden",
      "mouse:[&:has(.sidebar:hover)]:pr-[--body-scrollbar-width]",
    ],
  },
});

const store = useGlossaryStore();
const isScrollInProgress = ref(false);
const isResizeInProgress = ref(false);
const sidebarContentRef = ref(null);

onMounted(() => {
  isBodyScrollableCssVar();
  isElementScrollableCssVar(sidebarContentRef.value, "sidebar-content");
  visualViewportHeightCssVar();

  let resizeTimeout: ReturnType<typeof setTimeout>;
  let scrollTimeout: ReturnType<typeof setTimeout>;

  const areElementsScrollable = () => {
    isBodyScrollableCssVar();
    isElementScrollableCssVar(sidebarContentRef.value, "sidebar-content");
  };

  const throttledAreElementsScrollable = rafThrottle(() => areElementsScrollable());
  const throttledVisualViewportHeightCssVar = throttle(
    () => visualViewportHeightCssVar({ remove: true }),
    100, // Less than timeouts
  );

  const handleResize = () => {
    clearTimeout(resizeTimeout);
    isResizeInProgress.value = true;

    throttledAreElementsScrollable();
    throttledVisualViewportHeightCssVar();

    resizeTimeout = setTimeout(() => {
      if (!isScrollInProgress.value) {
        visualViewportHeightCssVar();
        isResizeInProgress.value = false;
      }
    }, 200);
  };

  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    isScrollInProgress.value = true;

    scrollTimeout = setTimeout(() => {
      isScrollInProgress.value = false;

      // Check if resize is in progress and extend its timeout
      if (isResizeInProgress.value) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          visualViewportHeightCssVar();
          isResizeInProgress.value = false;
        }, 200);
      }
    }, 200);
  };

  if (window.visualViewport) {
    window.addEventListener("scroll", handleScroll);
    window.visualViewport.addEventListener("resize", handleResize);
  }
});
</script>
