<template>
  <div class="container">
    <div class="centered">
      <p class="code">{{ code }}</p>
      <img :src="image" alt="QR Code" class="qr-code" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { generateQR } from "@api/qr_code";

const route = useRoute();
const participationId = ref(route.query.id);
const code = ref("");
const image = ref("");

const generateQrCode = async () => {
  try {
    const response = await generateQR(participationId.value);
    code.value = response.code;
    image.value = response.image;
  } catch (error) {
    console.error("Error fetching QR:", error);
  }
};

onMounted(async () => {
  generateQrCode();
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered {
  text-align: center;
}

.qr-code {
  border-radius: 5%;
}

.code {
  font-size: 5rem;
  font-weight: bold;
  color: #e64919;
}
</style>
