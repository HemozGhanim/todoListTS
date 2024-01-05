<script lang="ts" setup>
import todoComponent from "../view/todoListView.vue";
import finishedCompoenet from "../view/finishedListview.vue";
import deletedCompoenet from "../view/deletedListview.vue";
import { ref } from "vue";
let tab = ref();
</script>
<template>
  <div>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab value="todo" class="font-weight-bold">todo</v-tab>
      <v-tab value="finished" class="font-weight-bold">finished</v-tab>
      <v-tab value="deleted" class="font-weight-bold">deleted</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="todo">
        <todoComponent></todoComponent>
      </v-window-item>
      <v-window-item value="finished">
        <finishedCompoenet></finishedCompoenet>
      </v-window-item>
      <v-window-item value="deleted">
        <deletedCompoenet></deletedCompoenet>
      </v-window-item>
    </v-window>
  </div>
</template>
