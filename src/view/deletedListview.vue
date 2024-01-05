<script setup lang="ts">
import { useTasksStore } from "../store/todoStore";

const store = useTasksStore();
</script>
<template>
  <v-sheet width="100%" height="100%" d-flex align="center" justify="center">
    <v-container fluid>
      <v-card
        elevation="5"
        max-width="50%"
        color="#384152"
        rounded="xl"
        class="pa-3"
      >
        <v-card-title class="text-grey-lighten-2 font-weight-medium text-h5">
          Deleted Tasks List
        </v-card-title>
        <v-card-item>
          <v-container fluid>
            <p
              class="text-h4 my-2 font-italic text-grey-darken-1"
              v-if="store.deletedTasks.length == 0"
            >
              No Tasks here
            </p>
            <v-row>
              <SlideInOut
                entry="left"
                exit="top"
                :duration="500"
                group
                tag="div"
                class="w-100"
                moveClass="group-move-enter"
                leaveActiveClass="group-move-leave"
              >
                <v-col
                  v-for="deletedTask in store.deletedTasks"
                  cols="12"
                  class="bg-darkBlue rounded-xl mb-2"
                >
                  <v-row>
                    <v-col
                      cols="9"
                      class="text-left d-flex justify-start align-center"
                      ><p class="px-3">{{ deletedTask.task_Name }}</p></v-col
                    >
                    <v-col cols="3">
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
              </SlideInOut>
            </v-row>
          </v-container>
        </v-card-item>
      </v-card>
    </v-container>
  </v-sheet>
</template>
