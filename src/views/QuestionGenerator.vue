<template>
  <v-container fluid>
    <!-- Header -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <h1 class="display-2" style="color: #e64a19; margin-bottom: 10px">
            {{ $store.getters.currentTranslations.question_generator_header }}
          </h1>
        </div>
      </v-col>
    </v-row>

    <!-- Question Form -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-form @submit.prevent="addQuestion">
          <!-- Question Input -->
          <v-text-field
            v-model="newQuestion"
            :label="$store.getters.currentTranslations.question_label"
            color="deep-orange-darken-2"
            dense
            required
            style="color: black; overflow: hidden; text-overflow: ellipsis"
            :placeholder="
              $store.getters.currentTranslations.question_place_holder
            "
            variant="underlined"
          ></v-text-field>

          <!-- Add Question Button -->
          <v-btn
            color="deep-orange-darken-2"
            @click="addQuestion"
            class="mx-4 my-2"
            style="overflow: hidden; text-overflow: ellipsis"
          >
            {{ $store.getters.currentTranslations.add_question_btn }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

    <!-- Questions List -->
    <v-row v-if="questions.length > 0" justify="center">
      <v-col cols="12">
        <v-card class="questions-list-card">
          <v-list>
            <v-list-item
              v-for="(question, index) in questions"
              :key="index"
              :title="question.question"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="question-title"
                  style="overflow: hidden; text-overflow: ellipsis"
                >
                  {{ question.question }}
                </v-list-item-title>
                <v-row>
                  <v-col cols="6">
                    <v-switch
                      v-model="question.isOpenAnswer"
                      label="Open Answer"
                    ></v-switch>
                  </v-col>
                </v-row>

                <v-row
                  v-if="!question.isOpenAnswer"
                  v-for="(answer, ansIndex) in question.answers"
                  :key="ansIndex"
                >
                  <v-col cols="7">
                    <v-text-field
                      v-model="answer.value"
                      :label="answer.label"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-btn
                      :color="
                        answer.isCorrect ? 'green darken-2' : 'red darken-2'
                      "
                      @click="toggleIsCorrect(answer)"
                      class="answer-btn"
                    >
                      <span
                        class="answer-text"
                        style="overflow: hidden; text-overflow: ellipsis"
                      >
                        {{
                          answer.isCorrect
                            ? $store.getters.currentTranslations.correct
                            : $store.getters.currentTranslations.incorrect
                        }}
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="removeQuestion(index)" color="red darken-2">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>

                <v-btn
                  v-if="!question.isOpenAnswer"
                  icon
                  @click="addPossibleAnswer(index)"
                  color="green darken-2"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
        <v-btn
          color="deep-orange-darken-2"
          variant="outlined"
          class="my-4"
          @click="submitQuiz"
        >
          Submit Quiz
        </v-btn>

        <!-- Image -->
        <v-img
          :src="image_path"
          alt="Image description"
          width="300px"
          height="auto"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { postQrCode } from "@api/qr_code";

const store = useStore();
const questions = ref([]);
const newQuestion = ref("");
const questionsListRef = ref(null);
const image_path = ref("");

// Add a new question
const addQuestion = () => {
  if (newQuestion.value.trim() !== "") {
    questions.value.push({
      question: newQuestion.value.trim(),
      answers: [],
      isOpenAnswer: false,
    });
    newQuestion.value = ""; // Clear input
    scrollToBottom(); // Scroll to bottom
  }
};

// Remove a question by index
const removeQuestion = (index) => {
  questions.value.splice(index, 1);
};

// Add possible answer to a question
const addPossibleAnswer = (index) => {
  const question = questions.value[index];
  const newAnswerLabel = `Answer ${question.answers.length + 1} for question ${
    index + 1
  }`;
  question.answers.push({ label: newAnswerLabel, value: "", isCorrect: false });
  scrollToBottom(); // Scroll to bottom
};

// Scroll to the bottom of the questions list
const scrollToBottom = () => {
  if (questionsListRef.value) {
    questionsListRef.value.scrollTop = questionsListRef.value.scrollHeight;
  }
};

// Toggle the isCorrect property of an answer
const toggleIsCorrect = (answer) => {
  answer.isCorrect = !answer.isCorrect;
};

const submitQuiz = async () => {
  const result = await postQrCode("asdasdsad");
  console.log(result);
  image_path.value = result.image;
};
</script>

<style scoped>
.questions-list-card {
  max-height: 400px; /* Adjust the height as needed */
  overflow-y: auto;
}

.question-title {
  font-size: smaller;
  color: #888;
  white-space: nowrap; /* Add this line to prevent text wrapping */
}

.v-btn__content {
  white-space: nowrap; /* Prevent text wrapping within v-btn */
}

.answer-btn {
  display: flex;
  align-items: center; /* Center vertically */
}

.answer-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
