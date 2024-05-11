<template>
  <v-card variant="text" class="login-card">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="email"
        variant="solo"
        label="Email"
        outlined
        :error-messages="emailError ? [emailErrorText] : []"
        @input="resetErrorMessages('email')"
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
      <v-alert v-if="loginError" type="error" outlined dismissible>
        {{ loginErrorText }}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-orange-darken-2" @click="submitLogin">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const passwordVisible = ref(false);
const emailError = ref(false);
const emailErrorText = ref("");
const loginError = ref(false);
const loginErrorText = ref("");

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const resetErrorMessages = (field) => {
  switch (field) {
    case 'email':
      emailError.value = false;
      break;
    default:
      break;
  }
};

const submitLogin = async () => {
  // Reset errors
  emailError.value = false;
  loginError.value = false;

  // Validation for email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    emailError.value = true;
    emailErrorText.value = "Email is required";
    return;
  } else if (!emailPattern.test(email.value.trim())) {
    emailError.value = true;
    emailErrorText.value = "Invalid email format";
    return;
  }

  // Validation for password
  if (password.value.trim() === "") {
    loginError.value = true;
    loginErrorText.value = "Password is required";
    return;
  }

  // Proceed with login
  // Example: Call API to authenticate user
};
</script>

<style scoped>
.login-card {
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 20px;
}
</style>
