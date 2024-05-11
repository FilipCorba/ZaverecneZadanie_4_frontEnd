<template>
  <v-container fluid>
    <v-row>
      <!-- Left half with image and text -->
      <v-col cols="12" sm="6">
        <div class="welcome-content pa-3">
          <h1 class="welcome-text">
            {{ $store.getters.currentTranslations.phrase }}
          </h1>
        </div>
      </v-col>
      <!-- Right half with login and registration -->
      <v-col cols="12" sm="6">
        <div class="login-registration">
          <!-- Conditionally render login or registration component -->
          <v-fade-transition mode="out-in">
            <component
              :is="isLogin ? Login : Register"
              :key="isLogin"
            ></component>
          </v-fade-transition>

          <v-row 
            align="center" 
            justify="center"
          >
            <p class="text-disabled">
              {{
                isLogin
                  ? $store.getters.currentTranslations.dont_have_account
                  : $store.getters.currentTranslations.already_have_account
              }}
            </p>
            <v-btn
              size="x-small"
              color="deep-orange-darken-2"
              variant="solo"
              @click="toggleForm"
            >
              {{
                isLogin
                  ? $store.getters.currentTranslations.register
                  : $store.getters.currentTranslations.login
              }}
            </v-btn>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Login from "@components/Login.vue";
import Register from "@components/Register.vue";

const router = useRouter();
const store = useStore();
const isLogin = ref(true); // Indicates if the login form is active

const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

const connectionCode = ref("");

const connect = () => {
  router.push({ path: "/question-generator" });
};
</script>

<style scoped>
.welcome-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* Make the left part take full height */
}

.welcome-image {
  max-width: 100%;
}

.welcome-text {
  color: #e64a19;
  margin-top: 20px;
}

.login-registration {
  padding: 20px;
}

.login-registration h2 {
  color: #e64a19;
  margin-bottom: 10px;
}
</style>
