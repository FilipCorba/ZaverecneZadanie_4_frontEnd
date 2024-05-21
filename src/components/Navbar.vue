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
          </span>
        </v-app-bar-title>
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
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getUserByID } from "@api/user"; // Adjust the import path according to your project structure

const store = useStore();
const router = useRouter();
const route = useRoute();
const isWelcomeScreen = computed(() => route.name === "Welcome");
const selectedLanguage = ref(store.getters.currentLanguage);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const drawer = ref(false);
const userRole = ref(null);

const fetchUserRole = async () => {
  const userID = localStorage.getItem("user_id");
  try {
    const response = await getUserByID(userID);
    userRole.value = response.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
  }
};

const changeLanguage = (language) => {
  selectedLanguage.value = language;
  store.commit("changeLanguage", language);
};

const goToLogin = () => {
  router.push("/login");
};

const items = computed(() => {
  const baseItems = [
    { title: store.getters.currentTranslations.home },
    { title: store.getters.currentTranslations.dashboard },
    { title: store.getters.currentTranslations.generate_quiz },
    { title: store.getters.currentTranslations.profile },
    { title: store.getters.currentTranslations.manual },
  ];
  if (userRole.value === "admin") {
    baseItems.splice(2, 0, {
      title: store.getters.currentTranslations.all_quizzes,
    });
  }
  return baseItems;
});

const handleMenuItemClick = (item) => {
  if (item.title === store.getters.currentTranslations.profile) {
    router.push("/profile");
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
  
  if (isAuthenticated.value) {
    fetchUserRole();
  }
});

watch(route, async () => {
  if (isAuthenticated.value) {
    await fetchUserRole();
  }
});
</script>

<style scoped>
.flag {
  cursor: pointer;
  width: 50px;
  height: 50px;
}

.selected-flag {
  filter: grayscale(0%);
}

.flag:not(.selected-flag) {
  filter: grayscale(100%);
}

.flags-wrapper {
  display: flex;
  align-items: center;
}

.flag + .flag {
  margin-left: 10px;
}

.flag-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.v-navigation-drawer .v-list:last-child {
  margin-top: auto;
}
</style>
