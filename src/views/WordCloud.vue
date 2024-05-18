<template>
  <div class="word-cloud">
    <div
      v-for="(word, index) in wordCounts"
      :key="index"
      :style="{
        fontSize: word.size + 'px',
        position: 'absolute',
        left: word.x + 'px',
        top: word.y + 'px'
      }"
    >
      {{ word.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const words = [
  'Vue', 'JavaScript', 'Framework', 'Library', 'Component', 'State', 'Props', 'Lifecycle', 'Reactivity', 'Template', 'Script', 'Setup',
  'Vue', 'JavaScript', 'Framework', 'Library', 'Component', 'Props', 'Lifecycle', 'Reactivity', 'Template', 'Script', 'Setup',
  'Vue', 'JavaScript', 'Framework', 'Library', 'Component', 'Props', 'Reactivity', 'Template', 'Script', 'Setup',
  'Vue', 'JavaScript', 'Framework', 'Library', 'Component', 'Props', 'Reactivity', 'Template', 'Script', 'Setup',
  'Vue', 'JavaScript', 'Framework', 'Library', 'Component', 'Props', 'Reactivity', 'Template', 'Script', 'Setup',
  'Vue', 'JavaScript', 'Framework', 'Library', 'Component', 'Props', 'Lifecycle', 'Reactivity', 'Template', 'Script', 'Setup'
];

const wordCounts = ref([]);

onMounted(() => {
  generateWordCloud();
});

function generateWordCloud() {
  const wordCloud = {};

  // Count occurrences of each word
  words.forEach(word => {
    if (wordCloud[word]) {
      wordCloud[word]++;
    } else {
      wordCloud[word] = 1;
    }
  });

  // Convert wordCloud object to array of objects
  wordCounts.value = Object.keys(wordCloud).map((text, index) => ({
    text,
    size: wordCloud[text] * 10, // Adjust size based on frequency
    angle: (index / words.length) * 2 * Math.PI // Calculate angle for each word
  }));

  // Spread out words in a circular pattern
  const radius = 100;
  wordCounts.value.forEach(word => {
    word.x = 150 + radius * Math.cos(word.angle);
    word.y = 150 + radius * Math.sin(word.angle);
  });
}
</script>

<style scoped>
.word-cloud {
  position: relative;
  width: 300px;
  height: 300px;
}

.word-cloud div {
  margin: 5px;
  color: #333;
}
</style>
