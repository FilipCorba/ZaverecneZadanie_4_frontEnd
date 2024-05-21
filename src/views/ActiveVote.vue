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

let participationId = ref(route.query.id);
let code = ref(route.query.code); // Use route.query.code instead of router.query.code
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

const getQrCode = async () => {
  try {
    const response = await generateQR(participationId.value, code.value);
    image.value = response.image;
  } catch (error) {
    console.error("Error fetching QR:", error);
  }
};

onMounted(async () => {
  if (code.value === undefined) {
    generateQrCode();
  } else {
    getQrCode();
  }
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
