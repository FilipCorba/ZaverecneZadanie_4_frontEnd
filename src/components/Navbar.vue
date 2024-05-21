<template>
  <layout>
    <v-app-bar color="deep-orange-darken-2">
      <template v-slot:image> </template>

      <template v-slot:prepend>
        <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>
          <span v-if="isWelcomeScreen">
            {{ $store.getters.currentTranslations.welcome }}
          </span>
          <span v-else>
            {{ $store.getters.currentTranslations.title }}
            <span v-if="pageTitle"> - {{ pageTitle }}</span>
          </span></v-app-bar-title
        >
      </template>

      <v-spacer></v-spacer>

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

      <v-btn v-if="!isAuthenticated" @click="goToLogin">{{
        $store.getters.currentTranslations.sign_in
      }}</v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'left' : undefined"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleMenuItemClick(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>

      <template v-slot:append>
        <div v-if="isAuthenticated" class="pa-2">
          <v-btn @click="logout()" block>
            {{ $store.getters.currentTranslations.logout }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"; //,watch
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();
const isWelcomeScreen = computed(() => route.name === "Welcome");
const selectedLanguage = ref(store.getters.currentLanguage);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const drawer = ref(false);

const changeLanguage = (language) => {
  selectedLanguage.value = language;
  store.commit("changeLanguage", language);
};

const goToLogin = () => {
  router.push("/login");
};

const items = computed(() => [
  { title: store.getters.currentTranslations.home },
  { title: store.getters.currentTranslations.dashboard },
  { title: store.getters.currentTranslations.all_quizzes },
  { title: store.getters.currentTranslations.generate_quiz },
  { title: store.getters.currentTranslations.walk_through },
  { title: store.getters.currentTranslations.profile },
  { title: store.getters.currentTranslations.manual },
]);

const handleMenuItemClick = (item) => {
  if (item.title === store.getters.currentTranslations.profile) {
    router.push("/profile");
  } else if (item.title === store.getters.currentTranslations.walk_through) {
    router.push("/walk-through");
  } else if (item.title === store.getters.currentTranslations.dashboard) {
    router.push("/dashboard");
  } else if (item.title === store.getters.currentTranslations.generate_quiz) {
    router.push("/question-generator");
  } else if (item.title === store.getters.currentTranslations.manual) {
    router.push("/manual");
  } else if (item.title === store.getters.currentTranslations.all_quizzes) {
    router.push("/all-quizzes");
  } else {
    router.push("/");
  }
};

const pageTitle = computed(() => {
  switch (route.name) {
    case "Dashboard":
      return store.getters.currentTranslations.dashboard;
    case "GenerateQuiz":
      return store.getters.currentTranslations.generate_quiz;
    case "WalkThrough":
      return store.getters.currentTranslations.walk_through;
    case "Profile":
      return store.getters.currentTranslations.profile;
    case "Manual":
      return store.getters.currentTranslations.manual;
    case "AllQuizzes":
      return store.getters.currentTranslations.all_quizzes;
    default:
      return null;
  }
});

const logout = () => {
  store.commit("removeToken");
  router.push("/logout");
};

onMounted(() => {
  console.log("is auth" + isAuthenticated.value);
});
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

/* Ensure the logout button is at the bottom of the sidebar */
.v-navigation-drawer .v-list:last-child {
  margin-top: auto;
}
</style>
