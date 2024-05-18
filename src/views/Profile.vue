<template>
  <div>
    <h1>Profile</h1>
    <div>
      <p>Name: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Password: *********</p>
    </div>

    <!-- Change Password Modal -->
    <v-dialog v-model="showModal" max-width="600">
      <template v-slot:activator="{ on }">
        <button @click="showChangePasswordModal" v-on="on">
          Change Password
        </button>
      </template>

      <v-card prepend-icon="mdi-account" title="Write your password">
        <v-card-text>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              :label="$store.getters.currentTranslations.old_password"
              type="password"
              v-model="oldPassword"
              variant="underlined"
              autocomplete="new-password"
              required
            ></v-text-field>
            <v-text-field
              :label="$store.getters.currentTranslations.new_password"
              type="password"
              v-model="newPassword"
              variant="underlined"
              autocomplete="new-password"
              required
            ></v-text-field>
            <v-text-field
              :label="
                $store.getters.currentTranslations.new_password_confirmation
              "
              type="password"
              variant="underlined"
              v-model="newPasswordConfirmation"
              autocomplete="new-password"
              required
            ></v-text-field>
          </v-col>
          <v-fade-transition mode="out-in">
            <v-alert v-if="loginError" type="error" outlined dismissible>
              {{ passwordErrorText }}
            </v-alert>
          </v-fade-transition>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="hideModal()"></v-btn>

          <v-btn
            color="primary"
            text="send"
            variant="tonal"
            @click="changeOldPassword()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card class="my-6" v-if="allUsers.length > 0">
      <v-card-title>All Users</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="user in allUsers" :key="user.id">
            <v-list-item-content>
              <v-row class="pa-4">
                <div>
                  <v-list-item-title>{{ user.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ user.mail }}</v-list-item-subtitle>
                </div>

                <v-list-item>{{ user.role }}</v-list-item>
                <v-btn
                  :color="user.impersonated ? 'green darken-2' : 'red darken-2'"
                  @click="impersonateUser(user)"
                  class="answer-btn"
                >
                  <span
                    class="answer-text"
                    style="overflow: hidden; text-overflow: ellipsis"
                  >
                    {{
                      user.impersonated
                        ? $store.getters.currentTranslations.impersonated
                        : $store.getters.currentTranslations.not_impersonated
                    }}
                  </span>
                </v-btn>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { changePassword } from "@api/auth";
import { getUserByID, getAllUsers } from "@api/user";
const user = ref({
  role: "",
  username: "",
  email: "",
});
const checkupUser = parseInt(localStorage.getItem("checkup_id"));
const myUser = parseInt(localStorage.getItem("user_id"));
const allUsers = ref([]);
const passwordErrorText = ref("");
const passwordError = ref(false);

const oldPassword = ref("");
const newPassword = ref("");
const newPasswordConfirmation = ref("");

// Modal state
const showModal = ref(false);

// Old password field for changing password

// Show the change password modal
const showChangePasswordModal = () => {
  showModal.value = true;
};

// Hide the change password modal
const hideModal = () => {
  showModal.value = false;
};

const sendOldPassword = () => {
  // Perform password change logic here
  // For demonstration purposes, just console log old password
  console.log("Old password:", oldPassword.value);
  // Reset old password field
  oldPassword.value = "";
  hideModal();
};

// Change password function
const changeOldPassword = async () => {
  if (newPassword.value !== newPasswordConfirmation.value) {
    passwordErrorText.value =
      store.getters.currentTranslations.password_mismatch;
    passwordError.value = true;
    setTimeout(() => {
      passwordError.value = false;
    }, 5000);
    return;
  }
  const data = {
    user_id: localStorage.getItem("user_id"),
    password: oldPassword.value,
    new_password: newPassword.value,
  };

  const result = await changePassword(data);
  if (result) {
    hideModal();
  } else {
    passwordErrorText.value =
      store.getters.currentTranslations.password_incorrect;
    passwordError.value = true;
    setTimeout(() => {
      passwordError.value = false;
    }, 5000);
  }
};

const impersonateUser = async (selectedUser) => {
  allUsers.value.forEach((user) => {
    if (user !== selectedUser) {
      user.impersonated = false;
    }
  });

  selectedUser.impersonated = !selectedUser.impersonated;

  if (selectedUser.impersonated) {
    localStorage.setItem("user_id", selectedUser.user_id);
    console.log(selectedUser.user_id);
    const response = await getUserByID(selectedUser.user_id);
    console.log(response);
    user.value.role = response.role;
    user.value.username = response.username;
    user.value.email = response.email;
  } else {
    localStorage.setItem("user_id", checkupUser);
    const response = await getUserByID(checkupUser);
    user.value.role = response.role;
    user.value.username = response.username;
    user.value.email = response.email;
  }
};

const checkMyUser = () => {
  if (checkupUser === myUser) {
    return true;
  } else {
    return false;
  }
};

onMounted(async () => {
  const userId = parseInt(localStorage.getItem("user_id"));
  const response = await getUserByID(userId);
  user.value = response;

  const allUserResponse = await getAllUsers();
  allUsers.value = allUserResponse.filter((u) => {
    return u.user_id !== checkupUser;
  });

  if (allUsers.value.length > 0) {
    checkMyUser();
    if (checkMyUser()) {
      allUsers.value.forEach((user) => {
        user.impersonated = false;
      });
    } else {
      allUsers.value.forEach((user) => {
        if (user.user_id === myUser) {
          user.impersonated = true;
        } else {
          user.impersonated = false;
        }
      });
    }
  }
});
</script>

<style scoped>
/* Style for the modal */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
