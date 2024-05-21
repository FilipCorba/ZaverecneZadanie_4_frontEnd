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
        <v-btn variant="outlined" @click="showChangePasswordModal" v-on="on">
          Change Password
        </v-btn>
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
            <v-alert v-if="passwordError" type="error" outlined dismissible>
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
        <v-data-table
          elevation="0"
          :headers="headers"
          :items="allUsers"
          item-key="user_id"
          class="custom-data-table"
        >
          <template #item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.mail }}</td>
              <td>{{ item.role }}</td>
              <td>
                <v-btn
                  :color="item.impersonated ? 'green darken-2' : 'red darken-2'"
                  @click="impersonateUser(item)"
                  class="answer-btn"
                >
                  <span
                    class="answer-text"
                    style="overflow: hidden; text-overflow: ellipsis"
                  >
                    {{
                      item.impersonated
                        ? $store.getters.currentTranslations.impersonated
                        : $store.getters.currentTranslations.not_impersonated
                    }}
                  </span>
                </v-btn>
              </td>
              <td>
                <v-btn
                  :color="
                    item.role === 'admin' ? 'green darken-2' : 'red darken-2'
                  "
                  @click="toggleUserRole(item)"
                  class="answer-btn"
                >
                  <span
                    class="answer-text"
                    style="overflow: hidden; text-overflow: ellipsis"
                  >
                    {{
                      item.role === "admin"
                        ? $store.getters.currentTranslations.admin
                        : $store.getters.currentTranslations.user
                    }}
                  </span>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { changePassword } from "@api/auth";
import { getUserByID, getAllUsers, updateUserRole } from "@api/user";

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

// Show the change password modal
const showChangePasswordModal = () => {
  showModal.value = true;
};

// Hide the change password modal
const hideModal = () => {
  showModal.value = false;
};

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
    const response = await getUserByID(selectedUser.user_id);
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
  return checkupUser === myUser;
};

const toggleUserRole = async (selectedUser) => {
  const newRole = selectedUser.role === "admin" ? "user" : "admin";

  const result = await updateUserRole(selectedUser.user_id);
  if (result) {
    selectedUser.role = newRole;
  } else {
    console.error("Error toggling user role");
  }
};

const getUsers = async () => {
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
};

onMounted(async () => {
  getUsers();
});

// Table headers
const headers = ref([
  {
    text: "Name",
    align: "start",
    sortable: false,
    value: "name",
  },
  {
    text: "Email",
    align: "start",
    sortable: false,
    value: "mail",
  },
  {
    text: "Role",
    align: "start",
    sortable: false,
    value: "role",
  },
  {
    text: "Impersonate",
    align: "start",
    sortable: false,
    value: "impersonate",
  },
  {
    text: "Change Role",
    align: "start",
    sortable: false,
    value: "change_role",
  },
]);
</script>

<style scoped>
.custom-data-table {
  border-collapse: separate;
  border-spacing: 0;
  background-color: transparent;
}

.v-data-table-header th {
  border: none !important;
  box-shadow: none !important;
}

/* Set border color for all rows */
.v-data-table tbody tr {
  border-bottom: 2px solid #e64919; /* Set the border color to e64919 */
}

/* Adjust border-radius for first and last cells */
.v-data-table tbody tr td:first-child {
  border-left: 2px solid #e64919; /* Set the border color to e64919 */
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.v-data-table tbody tr td:last-child {
  border-right: 2px solid #e64919; /* Set the border color to e64919 */
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

/* Adjust padding and height of cells */
.v-data-table tbody tr td {
  padding: 20px;
  height: 60px !important;
}
.switch-align {
  display: flex;
  align-items: center;
}
</style>
