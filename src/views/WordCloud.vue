<template>
  <div class="word-cloud-container">
    <div class="word-cloud">
      <div
        v-for="(word, index) in wordCounts"
        :key="index"
        class="word"
        :style="{
          fontSize: word.size + 'px',
          position: 'absolute',
          left: word.x + 'px',
          top: word.y + 'px',
          color: word.color, // Apply the color to the word
        }"
      >
        {{ word.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getStatistics } from "@api/statistics";
import { useRoute } from "vue-router";

// Define an empty array to hold the words
const words = ref([]);

const wordCounts = ref([]);
const route = useRoute();
const query = ref(route.query.id);
const generateWordCloud = () => {
  const wordCloud = {};

  // Count occurrences of each word
  words.value.forEach((word) => {
    const text = word.text;
    const frequency = word.frequency; // Get the frequency of the word

    if (wordCloud[text]) {
      wordCloud[text] += frequency;
    } else {
      wordCloud[text] = frequency;
    }
  });

  // Log the frequency of each word
  console.log("Word frequencies:", wordCloud);

  // Sort the words based on frequency (answer count)
  const sortedWords = Object.entries(wordCloud).sort((a, b) => a[1] - b[1]);

  // Calculate size for each word based on frequency
  const maxFrequency = sortedWords[sortedWords.length - 1][1];
  wordCounts.value = sortedWords.map(([text, frequency], index) => ({
    text,
    size: 20 + (frequency / maxFrequency) * 40, // Adjust size based on frequency
    color: getRandomColor(), // Generate random color for the word
  }));

  // Position words in the word cloud without overlapping
  positionWords();
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const positionWords = () => {
  const radius = 150;
  const angles = [];
  const stepAngle = Math.PI / (words.value.length + 1);
  let currentAngle = 0;

  // Calculate positions for each word
  wordCounts.value.forEach((word, index) => {
    const angle = currentAngle + stepAngle * index;
    const x = Math.cos(angle) * radius + 200; // Center x-coordinate
    const y = Math.sin(angle) * radius + 200; // Center y-coordinate

    // Update current angle
    currentAngle = angle;

    // Assign position to the word
    word.x = x;
    word.y = y;
  });
};

const getExportOfAnswers = async (participationID) => {
  try {
    const result = await getStatistics(participationID);

    if (result && result.data && Array.isArray(result.data)) {
      // Find the first open question
      const openQuestion = result.data.find(
        (question) => question.open_question === 1
      );

      if (openQuestion) {
        // Extract answer texts and frequencies from the first open question
        words.value = openQuestion.answers.map((answer) => ({
          text: answer.answer_text,
          frequency: answer.answer_count, // Use amount_of_answers as frequency
        }));

        // Generate word cloud
        generateWordCloud();
      } else {
        console.error("No open questions found.");
      }
    } else {
      console.error("Invalid data structure received.");
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};

onMounted(() => {
  getExportOfAnswers(query.value);
});
</script>

<style scoped>
.word-cloud-container {
  position: relative;
  width: 400px;
  height: 400px;
}

.word-cloud {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.word {
  margin: 5px;
  color: #333;
}
</style>
