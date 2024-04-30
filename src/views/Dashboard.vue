<script></script>
<template>
  <v-container fluid>
    <v-layout>
      <v-main>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
              <v-card-title>
                <v-img
                  class="mx-auto"
                  src="../assets/logo.png"
                  max-height="200"
                  max-width="200"
                ></v-img>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    outlined
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    outlined
                    required
                    type="password"
                  ></v-text-field>
                  <v-btn block color="primary" @click="login"> Login </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </v-layout>
  </v-container>
</template>

<style scoped></style>
