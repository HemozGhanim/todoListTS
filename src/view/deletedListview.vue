<script setup lang="ts">
import { useTasksStore } from "../store/todoStore";
import { useDisplay } from "vuetify";

const store = useTasksStore();
const { smAndDown } = useDisplay();
</script>
<template>
  <v-sheet
    width="100%"
    height="100%"
    class="d-flex align-center justify-center flex-nowrap bg-transparent pa-4"
  >
    <v-card
      elevation="5"
      :width="smAndDown ? '100%' : '80%'"
      color="#384152"
      rounded="xl"
      class="pa-3"
    >
      <v-card-title
        class="text-grey-lighten-2 font-weight-medium text-h5 text-md-h5 text-lg-h5 text-xl-h4 text-xxl-h3 d-flex justify-space-between align-center pa-1 pa-sm-1 pa-md-3 pa-lg-3 pa-xl-3 pa-xxl-3"
      >
        <span>Deleted Tasks List</span>
        <!-- <v-btn
          v-if="smAndDown"
          color="warning"
          variant="tonal"
          icon="mdi-delete-forever"
        ></v-btn>
        <v-btn
          v-else
          prepend-icon="mdi-delete-forever"
          color="warning"
          variant="tonal"
          icon="mdi-delete-forever"
          >Delete All</v-btn
        >-->
      </v-card-title>
      <v-card-item class="w-100 px-1 px-sm-1 px-md-2 px-lg-2 px-xl-2 px-xxl-2">
        <v-container fluid>
          <p
            class="text-h4 my-2 font-italic text-grey-darken-1 text-center"
            v-if="store.deletedTasks.length == 0"
          >
            No Tasks here
          </p>
          <TransitionGroup
            name="slide-fade"
            tag="v-row"
            class="w-100 d-flex justify-center flex-wrap align-center"
            key="3"
          >
            <v-col
              v-for="deletedTask in store.deletedTasks"
              cols="12"
              class="bg-darkBlue mb-2"
              style="border-radius: 100px 100px"
              :key="deletedTask.task_Name"
            >
              <v-row>
                <v-col
                  cols="7"
                  sm="7"
                  md="9"
                  lg="9"
                  xl="9"
                  xxl="9"
                  class="text-left d-flex justify-start align-center"
                  ><p class="px-3">{{ deletedTask.task_Name }}</p></v-col
                >
                <v-col
                  cols="5"
                  sm="5"
                  md="3"
                  lg="3"
                  xl="3"
                  xxl="3"
                  class="d-flex justify-center"
                >
                  <v-btn
                    size="small"
                    color="blue"
                    icon="mdi-delete-off"
                    class="px-2 ma-1"
                    @click="
                      store.UnDeleteTask(deletedTask.id, {
                        id: deletedTask.id,
                        task_Name: deletedTask.task_Name,
                      })
                    "
                  ></v-btn>
                  <v-btn
                    size="small"
                    color="red"
                    icon="mdi-delete-forever"
                    class="px-2 ma-1"
                    @click="store.perDeleteTask(deletedTask.id)"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-col>
          </TransitionGroup>
        </v-container>
      </v-card-item>
    </v-card>
  </v-sheet>
</template>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  position: relative;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
