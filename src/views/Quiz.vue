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
                  <v-text-field
                    v-model="question.question_text"
                    outlined
                    dense
                    label="Question Text"
                    @input="markAsEdited(question)"
                  ></v-text-field>
                </v-list-item-title>
                <v-row>
                  <v-col cols="6">
                    <v-switch
                      v-model="question.open_question"
                      label="Open Answer"
                      @change="markAsEdited(question)"
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
                      @input="markAsEdited(question)"
                    ></v-text-field>
                  </v-col>

                  <!-- Buttons for Correct/Incorrect -->
                  <v-col cols="12" sm="6" md="3">
                    <v-btn
                      :color="
                        option.is_correct ? 'green darken-2' : 'red darken-2'
                      "
                      @click="toggleIsCorrect(option, question)"
                      class="answer-btn"
                    >
                      <span class="answer-text">{{
                        option.is_correct ? "Correct" : "Incorrect"
                      }}</span>
                    </v-btn>
                  </v-col>
                  <!-- Button to delete an option -->
                  <v-col cols="12" sm="6" md="2">
                    <v-btn
                      icon
                      @click="removeOption(question, i)"
                      color="red darken-2"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>

              <v-list-item-action>
                <v-row>
                  <v-col cols="7">
                    <v-btn
                      v-if="!question.open_question"
                      icon
                      @click="addOption(question)"
                      color="green darken-2"
                      class="my-2"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-btn
                      icon
                      @click="removeQuestion(index)"
                      color="red darken-2"
                      class="my-2"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-btn
                      v-if="question.isEdited"
                      @click="editQuestion(question)"
                      color="deep-orange-darken-2"
                      variant="outlined"
                      class="my-2"
                    >
                      Edit
                    </v-btn>
                  </v-col>
                </v-row>
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
          <div class="scrollable-list">
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
          </div>
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
          <div class="scrollable-list">
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
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="showDeactivationTextArea(participation)"
                    color="red darken-2"
                  >
                    <v-icon>mdi-cancel</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action v-if="participation.showTextArea">
                  <v-textarea
                    v-model="participation.note"
                    label="Deactivation Note"
                  ></v-textarea>
                  <v-btn
                    color="green darken-2"
                    @click="confirmDeactivation(participation)"
                  >
                    Confirm
                  </v-btn>
                  <v-btn
                    color="red darken-2"
                    @click="hideDeactivationTextArea(participation)"
                  >
                    Cancel
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </div>
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
import {
  getQuizById,
  getVotingListOfQuizzes,
  deactivateSurveyById,
} from "@api/quizzes";
import { deleteQuestion, updateQuestion } from "@api/questions"; // Ensure updateQuestion is available

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

    // Transform the questions object into an array and add question_id to each question
    if (quiz.value.questions && typeof quiz.value.questions === "object") {
      quiz.value.questions = Object.entries(quiz.value.questions).map(
        ([key, question]) => {
          question.question_id = key;
          return question;
        }
      );
    } else {
      quiz.value.questions = [];
    }

    // Initialize isEdited property for each question
    quiz.value.questions.forEach((question) => (question.isEdited = false));
    console.log("Processed quiz questions:", quiz.value.questions);
  } catch (error) {
    console.error("Error fetching quiz:", error);
  }
};

const toggleIsCorrect = (option, question) => {
  // Toggle correct answer and mark the question as edited
  option.is_correct = !option.is_correct;
  markAsEdited(question);
};

const removeQuestion = async (index) => {
  // Implement the logic to remove question from quiz
  console.log("Removing question at index:", index);
  const questionId = quiz.value.questions[index].question_id.split("_")[1]; // Get the actual question ID
  console.log("Removing question with id:", questionId);
  const result = await deleteQuestion(quiz.value.quiz_id, questionId);
  if (result) {
    quiz.value.questions.splice(index, 1);
  } else {
    console.error("Error deleting question");
  }
};

const addOption = (question) => {
  question.options.push({
    option_text: "",
    is_correct: false,
  });
  markAsEdited(question);
};

const removeOption = (question, index) => {
  question.options.splice(index, 1);
  markAsEdited(question);
};

const showDeactivationTextArea = (participation) => {
  participation.showTextArea = true;
};

const hideDeactivationTextArea = (participation) => {
  participation.showTextArea = false;
};

const confirmDeactivation = async (participation) => {
  const data = {
    note: participation.note,
    participation_id: participation.participation_id,
  };
  try {
    const result = await deactivateSurveyById(data);
    if (result) {
      participation.end_time = null;
      participation.showTextArea = false;
      await getVotingList();
    } else {
      console.error("Error deactivating survey");
    }
  } catch (error) {
    console.error("Error deactivating survey:", error);
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
        curr.showTextArea = false;
        return acc;
      },
      { withEndTime: [], withoutEndTime: [] }
    );
    console.log("Voting list:", votingList.value);
  } catch (error) {
    console.error("Error getting voting list:", error);
  }
};

const markAsEdited = (question) => {
  question.isEdited = true;
};

const editQuestion = async (question) => {
  console.log("Editing question:", question);
  const data = {
    question_id: question.question_id.split("_")[1],
    question_text: question.question_text,
    open_question: question.open_question,
    options: question.options,
  };
  try {
    const result = await updateQuestion(data);
    if (result) {
      question.isEdited = false; // Reset the edited status
      console.log("Question updated successfully");
    } else {
      console.error("Error updating question");
    }
  } catch (error) {
    console.error("Error updating question:", error);
  }
};

const titleFontSize = computed(() => {
  // You can adjust the multiplier as needed
  return `${(5 * document.documentElement.clientWidth) / 100}px`;
});

onMounted(() => {
  getQuiz();
  getVotingList();
});
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
  color: white;
}

.v-card--reveal {
  overflow: hidden;
}

.answer-btn {
  width: 100%;
}

.answer-text {
  font-size: 1rem;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}

.scrollable-list {
  max-height: 400px;
  overflow-y: auto;
}
</style>
