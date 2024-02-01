<script setup lang="ts">
import { userAuthStore } from "../../store/userAuth";
import LogoSmallPhoto from "../../assets/logoGeekBox-Small.png";
import DrawerNav from "./drawer.vue";
const Store = userAuthStore();
// function coverUri() {
//   return "../../assets/logoGeekBox-Small.png";
// }
</script>
<template>
  <v-app-bar
    :elevation="1"
    class="text-center"
    density="comfortable"
    theme="dark"
    style="background-color: #384152"
  >
    <v-app-bar-title>
      <v-img
        aspect-ratio="16/9"
        crossorigin="use-credentials"
        class="mx-auto"
        style="height: 56px; width: 200px"
        :inline="true"
        :src="LogoSmallPhoto"
      ></v-img>
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn @click="Store.signOutUser" to="/login" icon="mdi-logout"></v-btn>
    </template>
  </v-app-bar>
  <DrawerNav></DrawerNav>
</template>
