<script lang="ts" setup>
import todoComponent from "../view/todoListView.vue";
import finishedCompoenet from "../view/finishedListview.vue";
import deletedCompoenet from "../view/deletedListview.vue";
import { useTheme } from "vuetify";
import { ref } from "vue";
let tab = ref();

const theme = useTheme();
</script>
<template>
  <div>
    <v-tabs
      v-model="tab"
      color="pink-accent-3"
      align-tabs="center"
      :bg-color="theme.current.value.colors.darkBlue"
    >
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
