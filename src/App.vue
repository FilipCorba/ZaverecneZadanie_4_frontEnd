<template>
  <v-container fluid>
    <v-layout>
      <Navbar />
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-container>
</template>

<script setup>
import Navbar from "@components/Navbar.vue"; // Adjust the path as needed
</script>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Navbar,
  },
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
<script></script>
