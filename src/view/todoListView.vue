<script lang="ts" setup>
import { onUpdated, ref } from "vue";
import { useTasksStore } from "../store/todoStore";
import { SlideInOut } from "vue3-transitions";
//store declare
const store = useTasksStore();

//build Edit Object
interface editObj {
  id?: string;
  task_Name: string;
  status?: string;
}

//variables
let task_Name: string = "";
let vTextModel: string = "";
const isEditing = ref(false);

//functions to change edidting Value
const EditingObj = ref<editObj>({
  id: "",
  task_Name: "",
  status: "",
});
function takeTaskDetails(task: editObj) {
  EditingObj.value.id = task.id;
  EditingObj.value.task_Name = vTextModel;
  EditingObj.value.status = task.status;
}
function putEditName(el: any) {
  vTextModel = el;
}

function ShowMessage() {
  setTimeout(() => {
    store.ifItemIncluded = false;
  }, 500);
}

onUpdated(() => {
  useTasksStore();
});

function Testhere() {
  console.log("test");
}
Testhere();
</script>

<template>
  <v-sheet
    width="100%"
    height="100%"
    class="d-flex align-center justify-center flex-nowrap"
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
        min-width="50%"
        rounded="xl"
        class="d-block pa-3 mx-4"
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
                  cols="12"
                  class="bg-darkBlue rounded-xl mb-2"
                  v-for="task in store.createdTasks"
                >
                  <v-row>
                    <v-col
                      cols="8"
                      class="text-left d-flex justify-start align-center"
                    >
                      <v-text-field
                        v-if="isEditing == true"
                        class
                        v-model="vTextModel"
                        @update:model-value="takeTaskDetails(task)"
                      ></v-text-field>
                      <p class="px-3" v-else>
                        {{ task.task_Name }}
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <div
                        v-if="isEditing == true"
                        class="d-flex justify-center align-center flex-wrap w-100"
                      >
                        <v-btn
                          class="px-2 mx-1"
                          color="green"
                          variant="outlined"
                          @click="
                            (isEditing = !isEditing), store.editTask(EditingObj)
                          "
                          >done</v-btn
                        >
                      </div>
                      <div
                        v-else
                        class="d-flex justify-center align-center flex-wrap w-100"
                      >
                        <v-btn
                          class="ma-1"
                          size="small"
                          color="blue"
                          icon="mdi-file-edit"
                          @click="
                            (isEditing = !isEditing),
                              putEditName(task.task_Name)
                          "
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
              </SlideInOut>
            </v-row>
          </v-container>
        </v-card-item>
      </v-card>
    </v-container>
  </v-sheet>
</template>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 2s ease, transform 1s ease-in-out;
  transform: translateY(0px);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
