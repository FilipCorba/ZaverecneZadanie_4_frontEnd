<template>
  <div>
    <h1 :style="{ fontSize: titleFontSize }">{{ quiz.quiz_title }}</h1>
    <p>
      {{ $store.getters.currentTranslations.survey_description }}:
      {{ quiz.quiz_description }}
    </p>
    <p>
      {{ $store.getters.currentTranslations.survey_created_at }}:
      {{ quiz.quiz_created_at }}
    </p>
    <p>
      {{ $store.getters.currentTranslations.survey_subject }}:
      {{ quiz.subject }}
    </p>

    <!-- Display Questions and Answers -->
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <v-card class="questions-list-card">
          <v-list>
            <v-list-item
              v-if="quiz.questions && quiz.questions.length > 0"
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
                    :label="$store.getters.currentTranslations.question"
                    @input="markAsEdited(question)"
                  ></v-text-field>
                </v-list-item-title>
                <v-row align="left">
                  <v-col cols="12">
                    <v-btn
                      @click="toggleOpenQuestion(question)"
                      :color="question.open_question ? 'success' : 'info'"
                    >
                      <span class="answer-text">
                        {{
                          question.open_question
                            ? $store.getters.currentTranslations.is_open
                            : $store.getters.currentTranslations.is_not_open
                        }}</span
                      >
                    </v-btn>
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
                      :label="
                        $store.getters.currentTranslations.option + (i + 1)
                      "
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
                        option.is_correct
                          ? $store.getters.currentTranslations.correct
                          : $store.getters.currentTranslations.incorrect
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
                      {{ $store.getters.currentTranslations.edit }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-btn @click="deleteQuiz" color="red darken-2">{{
            $store.getters.currentTranslations.delete_quiz
          }}</v-btn>
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
            {{ $store.getters.currentTranslations.with_end_time }}
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
                        {{ $store.getters.currentTranslations.note }}:
                        {{ participation.note }}
                      </div>
                    </v-expand-transition>
                    <v-card-text>
                      <div class="font-weight-light text-grey text-h6">
                        {{ $store.getters.currentTranslations.code }}:
                        {{ participation.code }}
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ participation.end_time }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="downloadExport(participation)"
                      color="blue-darken-2"
                      class="mr-3"
                    >
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      @click="showStats(participation)"
                      color="green darken-2"
                      class="mr-3"
                    >
                      <v-icon>mdi-chart-bar</v-icon>
                    </v-btn>
                  </v-list-item-action>
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
            {{ $store.getters.currentTranslations.without_end_time }}
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
                      {{ $store.getters.currentTranslations.code }}:
                      {{ participation.code }}
                    </div>
                  </v-card-text>
                </v-card>
                <v-list-item-content>
                  <v-list-item-title
                    >{{ $store.getters.currentTranslations.no_end_time }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="showDeactivationTextArea(participation)"
                    color="red darken-2"
                    class="mr-3"
                  >
                    <v-icon>mdi-cancel</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="showParticipationQR(participation)"
                    color="green darken-2"
                    class="mr-3"
                  >
                    <v-icon>mdi-qrcode</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="showStats(participation)"
                    color="green darken-2"
                    class="mr-3"
                  >
                    <v-icon>mdi-chart-bar</v-icon>
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
                    {{ $store.getters.currentTranslations.confirm }}
                  </v-btn>
                  <v-btn
                    color="red darken-2"
                    @click="hideDeactivationTextArea(participation)"
                  >
                    {{ $store.getters.currentTranslations.cancel }}
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <v-dialog v-model="dialogDelete" max-width="500">
    <v-card>
      <v-card-title class="headline">
        {{ $store.getters.currentTranslations.confirm_deletion }}
      </v-card-title>
      <v-card-text>
        {{ $store.getters.currentTranslations.delete_confirmation_message }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="dialogDelete = false">
          {{ $store.getters.currentTranslations.cancel }}
        </v-btn>
        <v-btn color="green darken-1" text @click="confirmDelete">
          {{ $store.getters.currentTranslations.confirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getQuizById,
  getVotingListOfQuizzes,
  deactivateSurveyById,
  deleteQuizById,
} from "@api/quizzes";
import { deleteQuestion, updateQuestion, getExport } from "@api/questions";
import { saveAs } from "file-saver";

import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();

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
const toggleOpenQuestion = (question) => {
  question.open_question = !question.open_question;
  markAsEdited(question);
};

const deleteQuiz = async () => {
  dialogDelete.value = true;
};
const confirmDelete = async () => {
  // Close the dialog
  dialogDelete.value = false;

  const result = await deleteQuizById(quiz_id.value);
  if (result) {
    router.push("/dashboard");
  } else {
    dialogDelete.value = false;
    return
  }
};
const removeQuestion = async (index) => {
  console.log("Removing question at index:", index);
  const questionId = quiz.value.questions[index].question_id.split("_")[1]; // Get the actual question ID

  if (quiz.value.questions.length === 1) {
    deleteQuiz();
  }
  console.log("Removing question with id:", questionId);
  const result = await deleteQuestion(quiz.value.quiz_id, questionId);
  if (result) {
    quiz.value.questions.splice(index, 1);
  } else {
    console.error("Error deleting question");
  }
};

const downloadExport = async (participation) => {
  try {
    const response = await getExport(participation.participation_id);
    const data = response;

    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    saveAs(jsonBlob, `export_${participation.participation_id}.json`);
  } catch (error) {
    console.error("Error exporting data:", error);
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

const showParticipationQR = (participation) => {
  console.log("Showing QR for participation:", participation);
  router.push({
    path: "/active-vote",
    query: { id: participation.participation_id, code: participation.code },
  });
};

const showStats = (participation) => {
  console.log("Showing stats for participation:", participation);
  router.push({
    path: "/statistics",
    query: { participation_id: participation.participation_id },
  });
};

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
