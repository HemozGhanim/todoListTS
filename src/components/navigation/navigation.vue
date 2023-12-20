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
      <v-btn icon="mdi-logout"></v-btn>
    </template>
  </v-app-bar>
</template>
