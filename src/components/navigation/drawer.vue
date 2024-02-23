<script setup lang="ts">
import { onBeforeMount } from "vue";
import avatarIcon from "../../assets/logoGeekBoxIcon.png";
import { userAuthStore } from "../../store/userAuth";
import { useCookies } from "vue3-cookies";

const userStore = userAuthStore();
const $cookies = useCookies().cookies;

const comingVersin = import.meta.env.VITE_APP_COMING_VERSION;
const props = defineProps(["drawer"]);
const DecodeuserName = atob($cookies.get("userName"));
onBeforeMount(() => {
  userStore.getUserData();
});
</script>
<template>
  <v-navigation-drawer
    v-model="props.drawer"
    expand-on-hover
    rail
    color="#384152"
  >
    <v-list nav>
      <v-list-item
        :prepend-avatar="avatarIcon"
        :title="DecodeuserName"
      ></v-list-item>

      <v-divider></v-divider>
      <v-list-item
        prepend-icon="mdi-list-status"
        title="Todo List"
        value="todo"
        to="/todo"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-soccer"
        title="Football News"
        value="Football News"
        to="/"
        ><template v-slot:append>
          <v-chip class="NewColor" variant="elevated"
            >NEW {{ comingVersin }}
          </v-chip>
        </template>
      </v-list-item>
      <v-list-item prepend-icon="mdi-note" title="Notes" value="Notes" to="/">
        <template v-slot:append>
          <v-chip class="NewColor" variant="elevated"
            >NEW {{ comingVersin }}
          </v-chip>
        </template></v-list-item
      >
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped>
.NewColor {
  color: #fff;
  font-weight: bold;
  background: linear-gradient(82deg, #f12711, #f5af19);
  background-size: 400% 400%;

  -webkit-animation: gradiantColor 3s ease infinite;
  -moz-animation: gradiantColor 3s ease infinite;
  -o-animation: gradiantColor 3s ease infinite;
  animation: gradiantColor 3s ease infinite;
}

@-webkit-keyframes gradiantColor {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes gradiantColor {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-o-keyframes gradiantColor {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes gradiantColor {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
