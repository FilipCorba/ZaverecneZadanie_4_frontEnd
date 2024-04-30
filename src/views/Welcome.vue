<template>
  <v-container fluid style="color: #e64a19">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <h1 class="display-2" style="color: #e64a19; margin-bottom: 10px">
            {{ $store.getters.currentTranslations.phrase }}
          </h1>
        </div>
        <v-form>
          <v-row align="center" justify="center">
            <v-col cols="4" sm="4">
              <v-text-field
                class="outlined-text-field"
                color="deep-orange-darken-2"
                :label="$store.getters.currentTranslations.field_label"
                variant="outlined"
                v-model="connectionCode"
                maxlength="5"
              ></v-text-field>
            </v-col>
            <v-col cols="4" sm="4" class="text-center">
              <v-btn color="deep-orange-darken-2" @click="connect">{{
                $store.getters.currentTranslations.connect_btn
              }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const connectionCode = ref("");

const connect = () => {
  console.log(connectionCode.value);
};
</script>

<style scoped>
app {
  color: #e64a19;
  height: 300px;
}
.outlined-text-field .v-input__control {
  border-color: #e64a19;
}
</style>
