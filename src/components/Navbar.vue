<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

interface Link {
  id: number;
  name: string;
  route: string;
}

const menuToggle = ref<boolean>(false);
const navbarLinks: Link[] = [
  { id: 1, name: "Home", route: "/" },
  { id: 2, name: "Tracker", route: "tracker" },
  { id: 3, name: "About", route: "about" },
];

const handleMenu = (): void => {
  menuToggle.value = !menuToggle.value;
};

const closeMenu = (): void => {
  menuToggle.value = false;
};
</script>

<template>
  <div
    class="flex z-1 font-semibold fixed top-0 right-0 w-full px-[20px] text-white h-[90px] bg-[#302f30] justify-between items-center"
  >
    <RouterLink @click="closeMenu" to="/">
      <h1 class="text-nowrap">Spending Tracker</h1>
    </RouterLink>
    <div @click="handleMenu" class="cursor-pointer lg:hidden">
      <i v-if="!menuToggle" class="pi pi-bars text-3xl"></i>
      <i v-else-if="menuToggle" class="pi pi-times text-3xl"></i>
    </div>
    <div class="lg:flex hidden items-center gap-x-10">
      <h1 @click="closeMenu" v-for="nav in navbarLinks" :key="nav.id">
        <RouterLink :to="nav.route">{{ nav.name }}</RouterLink>
      </h1>
    </div>
  </div>

  <div
    :class="`${
      menuToggle ? 'translate-y-0' : 'translate-y-[-100%]'
    } w-full lg:hidden flex flex-col md:pt-[90px] md:gap-0 gap-y-[20px] text-2xl font-semibold md:justify-start justify-center items-center md:h-auto duration-[300ms] bg-[#302f30] ease-in-out transition-all fixed top-0 right-0 z-0 h-screen text-white`"
  >
    <RouterLink
      @click="closeMenu"
      v-for="nav in navbarLinks"
      :key="nav.id"
      class="md:border-b py-2 md:border-slate-100 px-[20px] text-center md:text-start w-full"
      :to="nav.route"
      >{{ nav.name }}</RouterLink
    >
  </div>
</template>
