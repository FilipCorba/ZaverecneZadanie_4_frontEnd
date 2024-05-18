<template>
  <div>
    <h1 :style="{ fontSize: titleFontSize }">{{ quiz.quiz_title }}</h1>
    <p>Description: {{ quiz.quiz_description }}</p>
    <p>Created At: {{ quiz.quiz_created_at }}</p>
    <p>Subject: {{ quiz.subject }}</p>

    <!-- Display Questions and Answers -->
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <v-card class="questions-list-card">
          <v-list>
            <v-list-item
              v-for="(question, index) in quiz.questions"
              :key="index"
              :title="question.question_text"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="question-title"
                  style="overflow: hidden; text-overflow: ellipsis"
                >
                  {{ question.question_text }}
                </v-list-item-title>
                <v-row>
                  <v-col cols="6">
                    <v-switch
                      v-model="question.open_question"
                      label="Open Answer"
                    ></v-switch>
                  </v-col>
                </v-row>

                <v-row
                  v-if="!question.open_question"
                  v-for="(option, i) in question.options"
                  :key="i"
                >
                  <v-col cols="7">
                    <v-text-field
                      v-model="option.option_text"
                      :label="'Option ' + (i + 1)"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>

                  <!-- Buttons for Correct/Incorrect -->
                  <v-col cols="12" sm="6" md="3">
                    <v-btn
                      :color="
                        option.is_correct ? 'green darken-2' : 'red darken-2'
                      "
                      @click="toggleIsCorrect(option)"
                      class="answer-btn"
                    >
                      <span class="answer-text">{{
                        option.is_correct ? "Correct" : "Incorrect"
                      }}</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="removeQuestion(index)" color="red darken-2">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" sm="12">
        <v-card
          class="voting-list-card"
          color="deep-orange-darken-2"
          variant="outlined"
        >
          <!-- Display voting items with end_time -->
          <v-subheader v-if="votingList.withEndTime.length">
            Voting List with End Time
          </v-subheader>
          <v-list-item-group>
            <v-list-item
              v-for="(participation, index) in votingList.withEndTime"
              :key="'withEnd_' + index"
            >
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  class="mx-auto"
                  color="deep-orange-darken-2"
                  variant="tonal"
                  max-width="600"
                  elevation="8"
                  v-bind="props"
                >
                  <v-expand-transition>
                    <div
                      v-if="isHovering"
                      class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h6"
                      style="height: 100%"
                    >
                      Note: {{ participation.note }}
                    </div>
                  </v-expand-transition>
                  <v-card-text>
                    <div class="font-weight-light text-grey text-h6">
                      Code: {{ participation.code }}
                    </div>
                    <div class="font-weight-light text-grey text-h6">
                      Score: {{ participation.score }}
                    </div>
                  </v-card-text>
                </v-card>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ participation.end_time }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-hover>
            </v-list-item>
          </v-list-item-group>

          <!-- Divider between groups -->
          <v-divider
            v-if="
              votingList.withEndTime.length && votingList.withoutEndTime.length
            "
          ></v-divider>

          <!-- Display voting items without end_time -->
          <v-subheader v-if="votingList.withoutEndTime.length">
            Voting List without End Time
          </v-subheader>
          <v-list-item-group>
            <v-list-item
              v-for="(participation, index) in votingList.withoutEndTime"
              :key="'withoutEnd_' + index"
            >
              <v-card
                class="mx-auto"
                color="deep-orange-darken-2"
                max-width="600"
                variant="outlined"
                elevation="8"
                v-bind="props"
              >
                <v-card-text>
                  <div class="font-weight-light text-grey text-h6">
                    Code: {{ participation.code }}
                  </div>
                </v-card-text>
              </v-card>
              <v-list-item-content>
                <v-list-item-title> No End Time </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-card>
      </v-col>
    </v-row>
    <!-- Image -->
    <v-img
      :src="quiz.image_path"
      alt="Image description"
      width="300px"
      height="auto"
    ></v-img>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { getQuizById, getVotingListOfQuizzes } from "@api/quizzes";
import { deleteQuestion } from "@api/questions";

const route = useRoute();

const quiz = ref({});
const quiz_id = ref(route.query.id);
const votingList = ref({ withEndTime: [], withoutEndTime: [] });

// Fetch quiz data when component is mounted
const getQuiz = async () => {
  try {
    const response = await getQuizById(quiz_id.value);
    quiz.value = response;
    console.log("Fetched quiz:", quiz.value);
  } catch (error) {
    console.error("Error fetching quiz:", error);
  }
};

const toggleIsCorrect = (option) => {
  // Implement the logic to toggle correct answer for option
  console.log("Toggling correct answer for option:", option);
};

const removeQuestion = async (index) => {
  // Implement the logic to remove question from quiz
  console.log("Removing question at index:", index);
  // remove from index Question_ so only the number will stay
  const questionId = index.replace("question_", "");
  console.log("Removing question with id:", questionId);
  const result = await deleteQuestion(quiz.value.quiz_id, questionId);
  if (result) {
    quiz.value.questions.splice(index, 1);
  } else {
    console.error("Error deleting question");
  }
};

const getVotingList = async () => {
  try {
    console.log("Getting voting list for quiz:", quiz_id.value);
    const response = await getVotingListOfQuizzes(quiz_id.value);
    // Separate voting list based on end_time presence
    votingList.value = response.reduce(
      (acc, curr) => {
        if (curr.end_time) {
          acc.withEndTime.push(curr);
        } else {
          acc.withoutEndTime.push(curr);
        }
        return acc;
      },
      { withEndTime: [], withoutEndTime: [] }
    );
    console.log("Voting list:", votingList.value);
  } catch (error) {
    console.error("Error getting voting list:", error);
  }
};
const titleFontSize = computed(() => {
  // You can adjust the multiplier as needed
  // For example, to make the font size 5% of the viewport width:
  // return `${5 * window.innerWidth / 100}px`;
  return `${(5 * document.documentElement.clientWidth) / 100}px`;
});

onMounted(() => {
  getQuiz();
  getVotingList();
});
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
