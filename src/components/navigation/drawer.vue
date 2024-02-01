<script setup lang="ts">
import avatarIcon from "../../assets/logoGeekBoxIcon.png";
</script>
<template>
  <v-navigation-drawer expand-on-hover rail theme="dark">
    <v-list nav>
      <v-list-item
        :prepend-avatar="avatarIcon"
        title="Ibrahem Ghanim"
        subtitle="hemozghanim97@gmail.com"
      ></v-list-item>

      <v-divider></v-divider>
      <v-list-item
        prepend-icon="mdi-list-status"
        title="Todo List"
        value="todo"
        to="/todo"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-list-status"
        title="Todo List"
        value="anything"
        to="/add"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-list-status"
        title="Todo List"
        value="todo"
        to="/todo"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
