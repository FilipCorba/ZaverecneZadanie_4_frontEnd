<template>
  <v-container v-if="queryParam" fluid style="color: #e64a19">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="question-card">
          <v-card-text class="question-content">
            <h2>{{ $store.getters.currentTranslations.survey_question }}</h2>
          </v-card-text>
        </v-card>

        <!-- Options Section -->
        <v-row justify="center">
          <v-col v-for="(option, index) in options" :key="index" cols="12">
            <v-card
              class="option-card"
              :color="
                selectedOption === option.value ? 'deep-orange-lighten-2' : null
              "
              ripple
              @click="selectOption(option.value)"
            >
              <v-card-text class="option-content">
                <div class="option-text">{{ option.text }}</div>
                <div class="option-icon">
                  <template v-if="selectedOption === option.value">
                    <v-icon>mdi-check</v-icon>
                  </template>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Connect Button -->
        <v-btn color="deep-orange-darken-2" @click="connect">
          {{ $store.getters.currentTranslations.continue_btn }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const selectedOption = ref(null);

const options = [
  { text: "Option 1", value: "option1" },
  { text: "Option 2", value: "option2" },
  { text: "Option 3", value: "option3" },
  { text: "Option 4", value: "option4" },
];

const connect = () => {
  console.log("Connect button clicked");
};

const selectOption = (value) => {
  selectedOption.value = value;
};

// Read query parameter from the URL
const queryParam = router.currentRoute.value.query.code;

// Redirect if queryParam is not present
const checkQueryParam = () => {
  if (!queryParam) {
    router.push({ path: "/welcome" });
  } else {
    console.log("Query parameter found:", queryParam);
  }
};

onMounted(() => {
  checkQueryParam();
});
</script>

<style scoped>
.question-card {
  border: 2px solid #e64a19;
  border-radius: 10px;
  background-color: rgba(128, 128, 128, 0.1);
  margin-bottom: 20px;
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
</style>
