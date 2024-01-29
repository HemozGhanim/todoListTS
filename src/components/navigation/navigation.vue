<script setup lang="ts">
import { userAuthStore } from "../../store/userAuth";

const Store = userAuthStore();
</script>
<template>
  <v-app-bar
    :elevation="1"
    class="text-center"
    density="comfortable"
    theme="dark"
    color="blue-darken-4"
  >
    <v-app-bar-title> TODO LIST </v-app-bar-title>

    <template v-slot:append>
      <v-btn @click="Store.signOutUser" to="/login" icon="mdi-logout"></v-btn>
    </template>
  </v-app-bar>
</template>
