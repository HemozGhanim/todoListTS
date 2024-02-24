<script lang="ts" setup>
import todoComponent from "../view/todoListView.vue";
import finishedCompoenet from "../view/finishedListview.vue";
import deletedCompoenet from "../view/deletedListview.vue";
import { useTasksStore } from "../store/todoStore";
import { useTheme } from "vuetify";
import { onMounted, ref } from "vue";
let tab = ref();

const theme = useTheme();
const store = useTasksStore();
onMounted(() => {
  store.getTasks;
});
</script>
<template>
  <div>
    <v-tabs
      v-model="tab"
      color="pink-accent-2"
      align-tabs="center"
      :bg-color="theme.current.value.colors.darkBlue"
    >
      <v-tab value="todo" class="font-weight-medium">Created</v-tab>
      <v-tab value="finished" class="font-weight-medium">Finished</v-tab>
      <v-tab value="deleted" class="font-weight-medium">Deleted</v-tab>
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
