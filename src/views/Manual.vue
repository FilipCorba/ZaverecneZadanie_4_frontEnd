<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div ref="manualContentRef" class="manual-content">
          <h1>{{ store.getters.currentTranslations.manual_title }}</h1>
          <p>{{ store.getters.currentTranslations.welcome }}</p>
          <h2>{{ store.getters.currentTranslations.login_register }}</h2>
          <p>{{ store.getters.currentTranslations.login_description }}</p>
          <h2>{{ store.getters.currentTranslations.guest_functions }}</h2>
          <p>{{ store.getters.currentTranslations.guest_functions_description }}</p>
          <h2>{{ store.getters.currentTranslations.user_functions }}</h2>
          <p>{{ store.getters.currentTranslations.user_functions_description }}</p>
          <h2>{{ store.getters.currentTranslations.admin_functions }}</h2>
          <p>{{ store.getters.currentTranslations.admin_functions_description }}</p>
        </div>
        <v-btn color="deep-orange-darken-2" @click="exportToPDF">{{ store.getters.currentTranslations.export_to_pdf }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { jsPDF } from "jspdf";
import { useStore } from "vuex";
import { ref } from "vue";

// Import custom font
import { DejaVuSans } from "@assets/DejaVuSans.js"; // Ensure this file contains the base64 string

const store = useStore();
const manualContentRef = ref(null);

const exportToPDF = () => {
  const pdf = new jsPDF();
  pdf.addFileToVFS("DejaVuSans.ttf", DejaVuSans);
  pdf.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
  pdf.setFont("DejaVuSans");

  const margin = 10;
  const lineHeight = 10;
  let yPosition = margin;
  const pageWidth = pdf.internal.pageSize.getWidth();

  const addText = (text, isHeader = false) => {
    const fontSize = isHeader ? 16 : 12;
    const fontStyle = isHeader ? "bold" : "normal";
    const color = "#e64a19"; // Set text color to deep orange
    pdf.setFontSize(fontSize);
    pdf.setFont(undefined, fontStyle);
    pdf.setTextColor(color);

    const textLines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    textLines.forEach((line) => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
      if (yPosition > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    });

    if (isHeader) yPosition += lineHeight / 2;
  };

  addText(store.getters.currentTranslations.manual_title, true);
  addText(store.getters.currentTranslations.welcome);
  addText(store.getters.currentTranslations.login_register, true);
  addText(store.getters.currentTranslations.login_description);
  addText(store.getters.currentTranslations.guest_functions, true);
  addText(store.getters.currentTranslations.guest_functions_description);
  addText(store.getters.currentTranslations.user_functions, true);
  addText(store.getters.currentTranslations.user_functions_description);
  addText(store.getters.currentTranslations.admin_functions, true);
  addText(store.getters.currentTranslations.admin_functions_description);

  pdf.save("manual.pdf");
};
</script>

<style scoped>
.manual-content {
  color: #e64a19;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
