<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Navbar />
  <div class="px-[20px] pt-[90px]">
    <RouterView />
  </div>
</template>
