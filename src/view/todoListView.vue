<script lang="ts" setup>
import { onUpdated, ref } from "vue";
import { useTasksStore } from "../store/todoStore";
import { SlideInOut } from "vue3-transitions";
//store declare
const store = useTasksStore();
//build Edit Object
interface editObj {
  id: string;
  task_Name: string;
  status: string;
}

//variables
let task_Name = ref("");
let vTextModel = ref("");
const dialog = ref(false);
//functions to change edidting Value
const EditingObj = ref<editObj>({
  id: "",
  task_Name: "",
  status: "",
});
function takeTaskDetails() {
  store.editTask(EditingObj.value);
  EditingObj.value.task_Name = "";
  EditingObj.value.id = "";
  EditingObj.value.status = "";
  dialog.value = false;
}
function putEditName(task: any) {
  EditingObj.value.task_Name = task.task_Name;
  EditingObj.value.id = task.id;
  EditingObj.value.status = task.status;
}
function closeEdit() {
  dialog.value = !dialog.value;
  vTextModel.value = "";
  EditingObj.value.id = "";
  EditingObj.value.status = "";
}
function ShowMessage() {
  setTimeout(() => {
    store.ifItemIncluded = false;
  }, 500);
}

onUpdated(() => {
  store.getTasks;
});
</script>

<template>
  <v-sheet
    width="100%"
    height="100%"
    class="d-flex align-center justify-center flex-nowrap bg-transparent"
  >
    <v-container class="pa-4">
      <!-- <v-row>
        <v-col cols="12" class="px-1 mx-2 d-flex justify-end align-center">
          <v-btn
            append-icon="mdi-plus"
            color="pink"
            @click="
              store.pushTasks({ task_Name }), (task_Name = ''), ShowMessage
            "
          >
            Add List
          </v-btn>
        </v-col>

        <v-col cols="3 my-2">
          <v-card
            elevation="5"
            color="#384152"
            min-width="50%"
            rounded="l"
            class="pa-2"
          >
            <v-card-title
              class="text-grey-lighten-2 font-weight-medium text-subtitle-1 w-100 text-center"
            >
              Task List
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="3 my-2"> HH </v-col>
        <v-col cols="3 my-2"> HH </v-col>
        <v-col cols="3 my-2"> HH </v-col>
        <v-col cols="3 my-2"> HH </v-col>
      </v-row> -->
      <v-card
        elevation="5"
        color="#384152"
        rounded="xl"
        class="d-flex justify-center align-center flex-wrap pa-3 mx-4"
      >
        <v-card-title
          class="text-grey-lighten-2 font-weight-medium text-h5 w-100 text-center"
        >
          Task List
        </v-card-title>
        <v-card-item class="w-100">
          <v-row align="center" justify="center">
            <v-col cols="10" class="px-1 mx-2">
              <v-text-field
                label="Your Task"
                variant="solo"
                bg-color="#202938"
                :hide-details="true"
                rounded
                v-model="task_Name"
                @keydown.enter="
                  store.pushTasks({ task_Name }), (task_Name = ''), ShowMessage
                "
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="pa-0">
              <v-btn
                icon="mdi-plus"
                density="compact"
                size="x-large"
                color="orange-darken-3"
                @click="
                  store.pushTasks({ task_Name }), (task_Name = ''), ShowMessage
                "
              ></v-btn>
            </v-col>
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
              <v-col v-if="store.ifItemIncluded" class="text-center">
                <span class="my-2 px-1 mx-2 text-red text-h6">{{
                  store.ExistMessage
                }}</span>
              </v-col>
            </SlideInOut>
          </v-row>
        </v-card-item>
        <v-card-item class="w-100">
          <v-card-title class="text-grey-lighten-1 text-left pl-6">
            Tasks
          </v-card-title>
          <v-container fluid>
            <p
              class="text-h4 my-2 font-italic text-grey-darken-1"
              v-if="store.createdTasks.length == 0"
            >
              No Tasks here
            </p>
            <v-row>
              <TransitionGroup name="fade" tag="v-row" class="w-100">
                <v-fade-transition group tag="v-row" class="w-100" key="task">
                  <v-col
                    class="bg-darkBlue mb-2 w-100 rounded-pill"
                    cols="12"
                    v-for="(task, index) in store.createdTasks"
                    :key="index"
                  >
                    <v-row>
                      <v-col
                        cols="8"
                        class="text-left d-flex justify-start align-center"
                      >
                        <p class="px-3">
                          {{ task.task_Name }}
                        </p>
                      </v-col>
                      <v-col cols="4">
                        <div
                          class="d-flex justify-center align-center flex-wrap w-100"
                        >
                          <v-btn
                            class="ma-1"
                            size="small"
                            color="blue"
                            icon="mdi-file-edit"
                            @click="(dialog = !dialog), putEditName(task)"
                          ></v-btn>
                          <v-btn
                            size="small"
                            class="px-2 mx-1"
                            color="red"
                            icon="mdi-delete"
                            @click="
                              store.DeleteTask(task.id, {
                                id: `${task.id}`,
                                task_Name: `${task.task_Name}`,
                              })
                            "
                          ></v-btn>
                          <v-btn
                            size="small"
                            class="px-2 mx-1"
                            color="green"
                            icon="mdi-check"
                            @click="
                              store.finishedTask(task.id, {
                                id: `${task.id}`,
                                task_Name: `${task.task_Name}`,
                              })
                            "
                          ></v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-fade-transition>
              </TransitionGroup>
            </v-row>
          </v-container>
        </v-card-item>
      </v-card>
    </v-container>
  </v-sheet>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-item>
        <v-text-field class v-model="EditingObj.task_Name"></v-text-field>
      </v-card-item>
      <v-card-item>
        <div class="d-flex justify-center align-center flex-wrap w-100">
          <v-btn
            :loading="store.isLoading"
            class="px-2 mx-1"
            color="green"
            variant="outlined"
            @click="takeTaskDetails()"
            >done</v-btn
          ><v-btn
            class="px-2 mx-1"
            color="primary"
            variant="outlined"
            @click="closeEdit()"
            >canel</v-btn
          >
        </div>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
