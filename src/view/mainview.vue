<script lang="ts" setup>
var tab: any;
</script>
<template>
  <div>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      center-active
      align-tabs="center"
      stacked
      :mandatory="true"
    >
      <v-tab :value="1" :replace="true" to="/todo">todo</v-tab>
      <v-tab :value="2" to="/finished">finished</v-tab>
      <v-tab :value="3" to="/deleted">deleted</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="n in 3" :key="n" :value="n">
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-window-item>
    </v-window>
  </div>
</template>
