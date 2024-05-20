<template>
  <v-container v-if="queryParam" fluid style="color: #e64a19">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <!-- Quiz Title -->
        <v-row justify="center">
          <v-col cols="12">
            <h1 class="quiz-title">{{ quizName }}</h1>
          </v-col>
        </v-row>

        <v-carousel
          v-if="questions.length > 0"
          elevation="10"
          progress="deep-orange-darken-2"
          hide-delimiters
          show-arrows="hover"
          continuous="false"
          class="carousel"
        >
          <v-carousel-item v-for="(question, index) in questions" :key="index">
            <v-sheet height="100%">
              <div class="d-flex fill-height justify-center align-center">
                <div>
                  <v-card class="question-card">
                    <v-card-text class="question-content">
                      <h2>{{ question.question }}</h2>
                    </v-card-text>
                  </v-card>

                  <!-- Options Section -->
                  <v-row
                    justify="center"
                    class="options-container"
                    v-if="question.quiz_type === 'options'"
                  >
                    <v-col
                      v-for="(option, optIndex) in question.options"
                      :key="optIndex"
                      cols="12"
                    >
                      <v-card
                        class="option-card"
                        :color="
                          selectedOptions[index] &&
                          selectedOptions[index].includes(option.value)
                            ? 'deep-orange-lighten-2'
                            : null
                        "
                        ripple
                        @click="
                          selectOption(
                            index,
                            option.value,
                            question.is_multiple
                          )
                        "
                      >
                        <v-card-text class="option-content">
                          <div class="option-text">{{ option.text }}</div>
                          <div class="option-icon">
                            <template
                              v-if="
                                selectedOptions[index] &&
                                selectedOptions[index].includes(option.value)
                              "
                            >
                              <v-icon>mdi-check</v-icon>
                            </template>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>

                  <!-- Open Text Section -->
                  <v-row justify="center" class="open-text-container" v-else>
                    <v-col cols="12">
                      <v-textarea
                        v-model="selectedOptions[index]"
                        variant="outlined"
                        color="deep-orange-darken-2"
                        :label="question.question"
                        :class="{ 'deep-orange-border': true }"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

        <!-- Connect Button -->
        <v-btn
          color="deep-orange-darken-2"
          @click="connect"
          v-if="allQuestionsAnswered"
        >
          {{ $store.getters.currentTranslations.continue_btn }}
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogVisible" max-width="500" persistent>
      <v-card>
        <v-card-title color="deep-orange-darken-2" class="headline"
          >Wrong Code Entered</v-card-title
        >
        <v-card-text>
          Please enter the correct code:
          <v-text-field
            v-model="newCode"
            color="deep-orange-darken-2"
            label="Code"
            variant="outlined"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="submitNewCode">Submit</v-btn>
          <v-btn color="deep-orange-darken-2" @click="backToMenu"
            >Back to Menu</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getSurveyQuiz } from "@api/quizzes";
import { sendVote } from "@api/vote";

const store = useStore();
const router = useRouter();
const route = useRoute();
const participation_id = ref(null);
const selectedOptions = ref({});
const questions = ref([]);
const quizName = ref("");

const connect = async () => {
  const questionsData = questions.value.map((question, index) => {
    const answers = Array.isArray(selectedOptions.value[index])
      ? selectedOptions.value[index].map((value) => {
          const option = question.options.find((opt) => opt.value === value);
          return { answer_text: option ? option.text : value };
        })
      : [{ answer_text: selectedOptions.value[index] }];

    return {
      question_id: question.question_id,
      answers,
    };
  });

  const result = {
    participation_id: participation_id.value,
    questions: questionsData,
  };
  console.log("Submitting vote:", result);

  const response = await sendVote(result);
  if (response) {
    router.push({
      path: "/statistics",
      query: { participation_id: participation_id.value },
    });
  } else {
    console.error("Error submitting vote");
  }
};

const selectOption = (questionIndex, value, isMultiple) => {
  if (!selectedOptions.value[questionIndex]) {
    selectedOptions.value[questionIndex] = [];
  }
  if (isMultiple) {
    const index = selectedOptions.value[questionIndex].indexOf(value);
    if (index > -1) {
      selectedOptions.value[questionIndex].splice(index, 1);
    } else {
      selectedOptions.value[questionIndex].push(value);
    }
  } else {
    selectedOptions.value[questionIndex] = [value];
  }
};

// Read query parameter from the URL
const queryParam = ref(route.query.code);

// Redirect if queryParam is not present
const checkQueryParam = () => {
  if (!queryParam.value) {
    router.push({ path: "/welcome" });
  } else {
    console.log("Query parameter found:", queryParam.value);
  }
};

const getSurvey = async () => {
  console.log("Getting survey quiz with query code " + queryParam.value);
  const result = await getSurveyQuiz(queryParam.value);
  console.log(result);

  if (!result) {
    dialogVisible.value = true;
    return;
  }

  console.log("Survey data:", result.participation_id);

  if (result.survey.length > 0) {
    participation_id.value = result.participation_id;
    quizName.value = result.quiz_name; // Set the quiz name
    questions.value = result.survey.map((survey) => ({
      question_id: survey.question_id,
      question: survey.question,
      quiz_type: survey.quiz_type,
      is_multiple: survey.is_multiple,
      options: survey.options.map((opt, index) => ({
        text: opt,
        value: `option${index + 1}`,
      })),
    }));
    selectedOptions.value = {};
  }
};

watch(
  () => route.query.code,
  (newCode) => {
    fetchSurveyQuiz(newCode);
  }
);

const dialogVisible = ref(false);
const newCode = ref("");

const submitNewCode = () => {
  dialogVisible.value = false;
  router.push({ path: "/survey", query: { code: newCode.value } });
};
const backToMenu = () => {
  dialogVisible.value = false;
  router.push({ path: "/menu" });
};

const allQuestionsAnswered = computed(() => {
  return (
    questions.value.length > 0 &&
    Object.keys(selectedOptions.value).length === questions.value.length &&
    Object.values(selectedOptions.value).every(
      (options) =>
        options.length > 0 ||
        (typeof options === "string" && options.trim().length > 0)
    )
  );
});
const fetchSurveyQuiz = async (code) => {
  console.log("Getting survey quiz with query code " + code);
  const result = await getSurveyQuiz(code);
  console.log(result);

  if (!result) {
    dialogVisible.value = true;
    return;
  }

  if (result.survey.length > 0) {
    participation_id.value = result.participation_id;
    quizName.value = result.quiz_name;
    questions.value = result.survey.map((survey) => ({
      question_id: survey.question_id,
      question: survey.question,
      quiz_type: survey.quiz_type,
      is_multiple: survey.is_multiple,
      options: survey.options.map((opt, index) => ({
        text: opt,
        value: `option${index + 1}`,
      })),
    }));
    selectedOptions.value = {};
  }
};
onMounted(async () => {
  checkQueryParam();
  await getSurvey();
  // Preselect the first question
  if (questions.value.length > 0) {
    selectOption(
      0,
      questions.value[0].options[0].value,
      questions.value[0].is_multiple
    );
  }
});
</script>

<style scoped>
.quiz-title {
  text-align: center;
  color: #e64a19;
  margin-bottom: 20px;
}

.question-card {
  border: 2px solid #e64a19;
  border-radius: 10px;
  background-color: rgba(128, 128, 128, 0.1);
  margin-bottom: 20px;
}

.options-container {
  max-height: 400px; /* Adjust the max height as needed */
  overflow-y: auto; /* Make the options scrollable */
  width: 100%; /* Ensure the container does not exceed the width of its parent */
}

.option-card {
  margin-bottom: 10px;
}

.option-content {
  display: flex;
  justify-content: space-between;
}

.option-text {
  flex: 1;
}

.option-icon {
  margin-left: 10px;
}

.carousel {
  border-radius: 3%;
  margin: 0 auto;
  width: 100%; /* Ensure the carousel does not exceed the width of its parent */
}

.v-carousel-item {
  display: flex;
  justify-content: center; /* Center align the items */
}

.v-sheet {
  width: 100%; /* Ensure the sheet does not exceed the width of its parent */
}

.v-col {
  width: 80%;
}

.deep-orange-border .v-input__control {
  border-color: #e64a19;
}
</style>
