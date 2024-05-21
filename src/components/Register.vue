<template>
  <v-card variant="text" class="registration-card">
    <v-card-title>Registration</v-card-title>
    <v-card-text>
      <v-text-field
        :label="$store.getters.currentTranslations.name"
        v-model="name"
        :outlined="nameError"
        :error-messages="nameError ? [nameErrorText] : []"
        variant="solo"
        @input="resetErrorMessages('name')"
      ></v-text-field>
      <v-text-field
        :label="$store.getters.currentTranslations.email"
        v-model="email"
        :outlined="emailError"
        :error-messages="emailError ? [emailErrorText] : []"
        variant="solo"
        @input="resetErrorMessages('email')"
      ></v-text-field>
      <v-text-field
        class="rounded-s"
        v-model="password"
        :outlined="passwordError"
        :error-messages="passwordError ? [passwordErrorText] : []"
        variant="solo"
        :label="$store.getters.currentTranslations.password"
        autocomplete="new-password"
        :type="passwordVisible ? 'text' : 'password'"
        :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="togglePasswordVisibility"
        @input="resetErrorMessages('password')"
      ></v-text-field>
      <v-text-field
        class="rounded-s"
        v-model="confirmPassword"
        :outlined="confirmPasswordError"
        :error-messages="
          confirmPasswordError ? ['Please confirm password'] : []
        "
        variant="solo"
        :label="$store.getters.currentTranslations.password_confirmation"
        autocomplete="new-password"
        :type="confirmPasswordVisible ? 'text' : 'password'"
        :append-inner-icon="confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="toggleConfirmPasswordVisibility"
        @input="resetErrorMessages('confirmPassword')"
      ></v-text-field>
      <v-fade-transition mode="out-in">
        <v-alert v-if="passwordMismatch" type="error" outlined dismissible>
          Password and confirm password do not match
        </v-alert>

        <v-alert v-if="registrationError" type="error" outlined dismissible>
          {{ registrationErrorText }}
        </v-alert>

        <v-btn color="deep-orange-darken-2" @click="submitRegistration"
          >{{ $store.getters.currentTranslations.login }}</v-btn
        >
      </v-fade-transition>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { registerUser, loginUser } from "@api/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex"; // Import useStore from Vuex

const store = useStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const nameError = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const confirmPasswordError = ref(false);
const passwordMismatch = ref(false);
const passwordErrorText = ref("");
const emailErrorText = ref("");
const nameErrorText = ref("");
const registrationError = ref(false);
const registrationErrorText = ref("");

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const toggleConfirmPasswordVisibility = () => {
  confirmPasswordVisible.value = !confirmPasswordVisible.value;
};

const resetErrorMessages = (field) => {
  switch (field) {
    case "name":
      nameError.value = false;
      break;
    case "email":
      emailError.value = false;
      break;
    case "password":
      passwordError.value = false;
      break;
    case "confirmPassword":
      confirmPasswordError.value = false;
      break;
    default:
      break;
  }
};

const submitRegistration = async () => {
  // Reset errors
  nameError.value = false;
  emailError.value = false;
  passwordError.value = false;
  confirmPasswordError.value = false;

  passwordMismatch.value = false;

  let hasError = false;

  if (name.value.trim().length < 3) {
    nameError.value = true;
    nameErrorText.value = store.getters.currentTranslations.name_error;
    hasError = true;
  }

  // Validation for email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    emailError.value = true;
    emailErrorText.value = store.getters.currentTranslations.email_error;
    hasError = true;
  } else if (!emailPattern.test(email.value.trim())) {
    emailError.value = true;
    emailErrorText.value = store.getters.currentTranslations.email_invalid;
    hasError = true;
  }

  // Validation for password
  if (password.value.trim() === "") {
    passwordError.value = true;
    hasError = true;
    passwordErrorText.value = store.getters.currentTranslations.password_error;
  } else if (!/[A-Z]/.test(password.value) || !/\d/.test(password.value)) {
    passwordError.value = true;
    hasError = true;
    passwordErrorText.value =
      store.getters.currentTranslations.password_invalid;
  }

  // Validation for confirm password
  if (confirmPassword.value.trim() === "") {
    confirmPasswordError.value = true;
    hasError = true;
  }

  if (hasError) {
    return;
  }

  if (password.value !== confirmPassword.value) {
    passwordMismatch.value = true;

    // Hide the message after 4 seconds
    setTimeout(() => {
      passwordMismatch.value = false;
    }, 4000);

    return;
  }

  // Proceed with registration
  const userData = {
    username: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await registerUser(userData);
    if (response == false) {
      registrationError.value = true;
      registrationErrorText.value = "Invalid username or password";
      setTimeout(() => {
        registrationError.value = false;
      }, 5000); // 5000 milliseconds = 5 seconds
      return;
    } else {
      //Registration successful
      const dataLogin= {
        username: userData.username,
        password: userData.password
      }
      const responseLogin = await loginUser(dataLogin);//username,password

      if (responseLogin == false) {
        /*loginError.value = true;
    loginErrorText.value = "Invalid username or password";
    setTimeout(() => {
      loginError.value = false;
    }, 5000); // 5000 milliseconds = 5 seconds*/
        
        return;
      } else {
        

        const token = responseLogin.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", responseLogin.user.id);
        localStorage.setItem("checkup_id", responseLogin.user.id);
        store.commit("setToken", token);
        router.push({ path: "/dashboard" });
      }
    }
  } catch (error) {
    console.error(error); // Handle any errors
  }
};
</script>

<style scoped>
.registration-card {
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 10px;
}
</style>
