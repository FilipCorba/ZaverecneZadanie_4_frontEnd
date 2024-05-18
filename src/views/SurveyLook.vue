<template>
  <v-container v-if="queryParam" fluid style="color: #e64a19">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-carousel
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
                        @click="selectOption(index, option.value)"
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
                        label="Three rows"
                        row-height="25"
                        rows="3"
                        variant="outlined"
                        auto-grow
                        shaped
                        v-model="selectedOptions[index]"
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
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getSurveyQuiz } from "@api/quizzes";

const store = useStore();
const router = useRouter();
const route = useRoute();

const selectedOptions = ref({});
const questions = ref([]);

const connect = () => {
  console.log("Connect button clicked", selectedOptions.value);
};

const selectOption = (questionIndex, value) => {
  if (!selectedOptions.value[questionIndex]) {
    selectedOptions.value[questionIndex] = [];
  }
  const index = selectedOptions.value[questionIndex].indexOf(value);
  if (index > -1) {
    selectedOptions.value[questionIndex].splice(index, 1);
  } else {
    selectedOptions.value[questionIndex].push(value);
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

  if (result.length > 0) {
    questions.value = result.map((survey) => ({
      question: survey.question,
      quiz_type: survey.quiz_type,
      options: survey.options.map((opt, index) => ({
        text: opt,
        value: `option${index + 1}`,
      })),
    }));
    selectedOptions.value = {};
  }
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

onMounted(() => {
  checkQueryParam();
  getSurvey();
});
</script>

<style scoped>
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
