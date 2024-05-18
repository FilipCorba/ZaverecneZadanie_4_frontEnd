<script setup>
import { ref, onMounted } from "vue";
import { getListOfQuizzes, activateQuizById } from "@api/quizzes";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const headers = [
  {
    align: "center",
    key: "title",
    sortable: false,
    title: "Quiz Title",
  },
  { key: "description", align: "center", title: "Description" },
  { key: "created_at", align: "center", title: "Created At" },
  { key: "subject_name", align: "center", title: "Subject" },
  { key: "number_of_questions", align: "center", title: "Number of Questions" },
  { key: "is_active", align: "center", title: "Active" },
];

// Define a reactive variable to hold the fetched quizzes
const quizzes = ref([]);

// Fetch the quizzes data from the API
const getQuizzes = async () => {
  try {
    const response = await getListOfQuizzes();
    quizzes.value = response.data; // Assign the fetched data to the reactive variable
  } catch (error) {
    console.error("Error fetching quizzes:", error);
  }
};

const handleRowClick = (item) => {
  console.log("Clicked item:", item);
  router.push({ path: "/quizzes", query: { id: item.quiz_id } });
};

const activateQuiz = async (quiz) => {
  const result = await activateQuizById(quiz.quiz_id);
  if (result) {
    console.log("Quiz activated:", result);
    const participation_id = result.participation_id;
    router.push({ path: "/active-vote", query: { id: participation_id } });
  } else {
    console.error("Error activating quiz");
  }
};

onMounted(() => {
  getQuizzes(); // Call the function to fetch quizzes when the component is mounted
});
</script>

<template>
  <v-container fluid>
    <v-layout>
      <v-main>
        <v-data-table
          elevation="0"
          :headers="headers"
          :items="quizzes"
          item-key="quiz_id"
          :search="search"
          class="custom-data-table"
        >
          <template #item="{ item }">
            <tr @click="handleRowClick(item)" class="cursor-pointer">
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.created_at }}</td>
              <td>{{ item.subject_name }}</td>
              <td>{{ item.number_of_questions }}</td>
              <td>
                <!-- Conditional rendering for active status -->
                <v-icon :color="item.is_active ? 'green' : 'red'">
                  {{ item.is_active ? 'mdi-checkbox-marked-circle' : 'mdi-checkbox-blank-circle-outline' }}
                </v-icon>
              </td>
              <td>
                <v-btn variant=" outlined" color="deep-orange-darken-2" @click.stop="activateQuiz(item)">
                  Activate Quiz
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-main>
    </v-layout>
  </v-container>
</template>


<style scoped>
.custom-data-table {
  border-collapse: separate;
  border-spacing: 70px;
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
</style>
