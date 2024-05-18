<template>
  <v-card variant="text" class="login-card">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="username"
        variant="solo"
        label="Username"
        outlined
        :error-messages="emailError ? [emailErrorText] : []"
        @input="resetErrorMessages('username')"
      ></v-text-field>
      <v-text-field
        class="rounded-s"
        v-model="password"
        variant="solo"
        label="Password"
        outlined
        :type="passwordVisible ? 'text' : 'password'"
        :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="togglePasswordVisibility"
      ></v-text-field>
      <v-fade-transition mode="out-in">
        <v-alert v-if="loginError" type="error" outlined dismissible>
          {{ loginErrorText }}
        </v-alert>
      </v-fade-transition>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-orange-darken-2" @click="submitLogin">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { loginUser } from "@api/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const passwordVisible = ref(false);
const usernameError = ref(false);
const usernameErrorText = ref("");
const loginError = ref(false);
const loginErrorText = ref("");

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const resetErrorMessages = (field) => {
  switch (field) {
    case "username":
      usernameError.value = false;
      break;
    default:
      break;
  }
};

const submitLogin = async () => {
  // Reset errors
  usernameError.value = false;
  loginError.value = false;

  // Validation for email

  // Validation for password
  if (password.value.trim() === "") {
    loginError.value = true;
    loginErrorText.value = "Password is required";
    return;
  }

  // Proceed with login
  // Example: Call API to authenticate user

  const data = {
    username: username.value,
    password: password.value,
  };
  const response = await loginUser(data);

  if (response == false) {
    loginError.value = true;
    loginErrorText.value = "Invalid username or password";
    setTimeout(() => {
      loginError.value = false;
    }, 5000); // 5000 milliseconds = 5 seconds
    return;
  } else {
    console.log(response);

    const token = response.token;
    localStorage.setItem("token", token);
    localStorage.setItem('user_id', response.user.id);
    localStorage.setItem('checkup_id', response.user.id);
    store.commit("setToken", token);
    router.push({ path: "/dashboard" });
  }
};
</script>

<style scoped>
.login-card {
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 20px;
}
</style>
