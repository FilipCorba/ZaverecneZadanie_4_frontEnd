<template>
  <v-container fluid>
    <v-layout>
      <v-main>
        <!-- Filter controls -->
        <v-row>
          <v-select
            v-model="selectedDate"
            :items="createdDates"
            label="Created Date"
            @change="filterQuizzes"
            variant="outlined"
            color="deep-orange-darken-2"
          ></v-select>
          <v-select
            v-model="selectedSubject"
            :items="subjects"
            label="Subject"
            @change="filterQuizzes"
            variant="outlined"
            color="deep-orange-darken-2"
          ></v-select>
        </v-row>
        <!-- Data table -->
        <v-data-table
          elevation="0"
          :headers="filteredHeaders"
          :items="filteredQuizzes"
          item-key="quiz_id"
          class="custom-data-table"
          :sort-by="[{ key: 'created_at', order: 'desc' }]"
        >
          <!-- Row template -->
          <template #item="{ item }">
            <tr @click="handleRowClick(item)" class="cursor-pointer">
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td v-if="!isDateFiltered">{{ item.created_at }}</td>
              <td v-if="!isSubjectFiltered">{{ item.name }}</td>
              <td>{{ item.number_of_questions }}</td>
              <td>
                <!-- Conditional rendering for active status -->
                <v-icon :color="item.is_active ? 'green' : 'red'">
                  {{
                    item.is_active
                      ? "mdi-checkbox-marked-circle"
                      : "mdi-checkbox-blank-circle-outline"
                  }}
                </v-icon>
              </td>
              <td>
                <v-btn
                  variant="outlined"
                  color="deep-orange-darken-2"
                  @click.stop="activateQuiz(item)"
                >
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

<script setup>
import { ref, onMounted, computed } from "vue";
import { getListOfAllQuizzes, activateQuizById } from "@api/quizzes";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

// Define reactive variables
const quizzes = ref([]);
const createdDates = ref([]);
const subjects = ref([]);
const selectedDate = ref(null);
const selectedSubject = ref(null);

// Fetch quizzes and initialize filters
onMounted(async () => {
  await getQuizzes();
  initializeFilters();
});

// Fetch the quizzes data from the API
const getQuizzes = async () => {
  try {
    const response = await getListOfAllQuizzes();
    quizzes.value = response.data; // Assign the fetched data to the reactive variable
    initializeFilters();
  } catch (error) {
    console.error("Error fetching quizzes:", error);
  }
};

// Initialize filter options
const initializeFilters = () => {
  createdDates.value = [
    store.getters.currentTranslations.none_option,
    ...new Set(quizzes.value.map((quiz) => quiz.created_at)),
  ];
  subjects.value = [
    store.getters.currentTranslations.none_option,
    ...new Set(quizzes.value.map((quiz) => quiz.name)),
  ];
};

// Filter quizzes by selected date and subject
const filterQuizzes = () => {
  filteredQuizzes.value = quizzes.value.filter((quiz) => {
    return (
      (!selectedDate.value ||
        selectedDate.value === store.getters.currentTranslations.none_option ||
        quiz.created_at === selectedDate.value) &&
      (!selectedSubject.value ||
        selectedSubject.value ===
          store.getters.currentTranslations.none_option ||
        quiz.name === selectedSubject.value)
    );
  });
};

// Define computed properties for filtered quizzes and headers
const filteredQuizzes = computed(() => {
  return quizzes.value.filter((quiz) => {
    return (
      (!selectedDate.value ||
        selectedDate.value === store.getters.currentTranslations.none_option ||
        quiz.created_at === selectedDate.value) &&
      (!selectedSubject.value ||
        selectedSubject.value ===
          store.getters.currentTranslations.none_option ||
        quiz.name === selectedSubject.value)
    );
  });
});

const headers = computed(() => [
  {
    align: "center",
    key: "title",
    sortable: false,
    title: store.getters.currentTranslations.survey_title,
  },
  {
    key: "description",
    align: "center",
    title: store.getters.currentTranslations.survey_description,
  },
  {
    key: "created_at",
    align: "center",
    title: store.getters.currentTranslations.survey_created_at,
  },
  {
    key: "name",
    align: "center",
    title: store.getters.currentTranslations.survey_subject,
  },
  {
    key: "number_of_questions",
    align: "center",
    title: store.getters.currentTranslations.survey_number_of_questions,
  },
  {
    key: "is_active",
    align: "center",
    title: store.getters.currentTranslations.survey_status_active,
  },
  {
    key: "actions",
    align: "center",
    title: store.getters.currentTranslations.survey_actions,
  },
]);

const isDateFiltered = computed(() => {
  return (
    selectedDate.value &&
    selectedDate.value !== store.getters.currentTranslations.none_option
  );
});

const isSubjectFiltered = computed(() => {
  return (
    selectedSubject.value &&
    selectedSubject.value !== store.getters.currentTranslations.none_option
  );
});

const filteredHeaders = computed(() => {
  const currentHeaders = headers.value;
  return currentHeaders.filter((header) => {
    if (header.key === "created_at" && isDateFiltered.value) {
      return false;
    }
    if (header.key === "name" && isSubjectFiltered.value) {
      return false;
    }
    return true;
  });
});

// Handle row click event
const handleRowClick = (item) => {
  console.log("Clicked item:", item);
  router.push({ path: "/quizzes", query: { id: item.quiz_id } });
};

// Activate quiz
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
</script>

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
