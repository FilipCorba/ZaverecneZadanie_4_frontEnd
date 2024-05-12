<template>
  <v-app-bar color="deep-orange-darken-2">
    <template v-slot:image> </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>{{
        $store.getters.currentTranslations.welcome
      }}</v-app-bar-title>
    </template>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <div class="flags-wrapper">
      <v-avatar
        :class="['flag', { 'selected-flag': selectedLanguage === 'sk' }]"
        @click="changeLanguage('sk')"
      >
        <img src="/SlovakFlag.png" alt="Slovak Flag" class="flag-image" />
      </v-avatar>
      <v-avatar
        :class="['flag', { 'selected-flag': selectedLanguage === 'en' }]"
        @click="changeLanguage('en')"
      >
        <img src="/EnglishFlag.webp" alt="English Flag" class="flag-image" />
      </v-avatar>
    </div>

    <v-btn @click="goToLogin">{{ $store.getters.currentTranslations.sign_in }}</v-btn>

    <v-btn id="menu-activator" icon> <v-icon>mdi-dots-vertical</v-icon> </v-btn
    ><v-menu activator="#menu-activator">
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const selectedLanguage = ref(store.getters.currentLanguage);

const changeLanguage = (language) => {
  selectedLanguage.value = language;
  store.commit("changeLanguage", language);
};

const goToLogin = () => {
  router.push('/login');
};

const items = computed(() => [
  { title: store.getters.currentTranslations.walk_through },
  { title: store.getters.currentTranslations.contact },
  { title: store.getters.currentTranslations.settings },
]);
</script>

<style scoped>
.flag {
  cursor: pointer;
  width: 50px;
  height: 50px;
}

.selected-flag {
  filter: grayscale(0%); /* Keep the color for the selected flag */
}

/* Apply grayscale filter to unselected flags */
.flag:not(.selected-flag) {
  filter: grayscale(100%);
}

/* Add styles for the flags wrapper */
.flags-wrapper {
  display: flex;
  align-items: center;
}

/* Add spacing between the flags */
.flag + .flag {
  margin-left: 10px;
}

.flag-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
