<script setup lang="ts">
import { ref } from "vue";
import { userAuthStore } from "../../store/userAuth";
import LogoSmallPhoto from "../../assets/logoGeekBox-Small.png";
import DrawerNav from "./drawer.vue";
const Store = userAuthStore();
const version = import.meta.env.VITE_APP_VERSION;
import { useDisplay } from "vuetify";
const { smAndDown, mdAndUp, mdAndDown } = useDisplay();

const drawer = ref<boolean>();
if (mdAndDown.value) {
  drawer.value = false;
} else {
  drawer.value = true;
}
</script>
<template>
  <v-app-bar
    :elevation="1"
    class="text-center"
    density="comfortable"
    style="background-color: #384152"
  >
    <v-app-bar-nav-icon
      v-if="mdAndDown"
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-img
        aspect-ratio="16/9"
        crossorigin="use-credentials"
        class="mx-auto"
        style="height: 45px; width: 200px"
        :inline="true"
        :src="LogoSmallPhoto"
      ></v-img>
    </v-app-bar-title>
    <template v-slot:append>
      <v-chip class="CurrentVersionColor" variant="elevated" v-if="smAndDown"
        >{{ version }} </v-chip
      ><v-chip
        class="CurrentVersionColor"
        variant="elevated"
        v-else-if="mdAndUp"
        >Current Version : {{ version }}
      </v-chip>
      <v-btn @click="Store.signOutUser" to="/login" icon="mdi-logout"></v-btn>
    </template>
  </v-app-bar>
  <DrawerNav v-model:drawer="drawer"></DrawerNav>
</template>
<style scoped>
.CurrentVersionColor {
  color: #fff;
  font-weight: bold;
  background: linear-gradient(119deg, #1565c0, #b92b27);
  background-size: 400% 400%;

  -webkit-animation: gradiantColor 9s ease infinite;
  -moz-animation: gradiantColor 9s ease infinite;
  -o-animation: gradiantColor 9s ease infinite;
  animation: gradiantColor 9s ease infinite;
}
@-webkit-keyframes gradiantColor {
  0% {
    background-position: 0% 27%;
  }
  50% {
    background-position: 100% 74%;
  }
  100% {
    background-position: 0% 27%;
  }
}
@-moz-keyframes gradiantColor {
  0% {
    background-position: 0% 27%;
  }
  50% {
    background-position: 100% 74%;
  }
  100% {
    background-position: 0% 27%;
  }
}
@-o-keyframes gradiantColor {
  0% {
    background-position: 0% 27%;
  }
  50% {
    background-position: 100% 74%;
  }
  100% {
    background-position: 0% 27%;
  }
}
@keyframes gradiantColor {
  0% {
    background-position: 0% 27%;
  }
  50% {
    background-position: 100% 74%;
  }
  100% {
    background-position: 0% 27%;
  }
}
</style>
