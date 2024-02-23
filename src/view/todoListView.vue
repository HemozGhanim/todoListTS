<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useTasksStore } from "../store/todoStore";
import { SlideInOut } from "vue3-transitions";
//store declare
const store = useTasksStore();

//build Edit Object
interface editObj {
  id: string;
  task_Name: string;
  status?: string;
}

//variables
let task_Name = ref("");
let checkName = ref("");
let EditDoneButton = ref<boolean>(false);
const dialog = ref(false);
//functions to change edidting Value
const EditingObj = ref<editObj>({
  id: "",
  task_Name: "",
  status: "",
});
const takeTaskDetails = async () => {
  await store.editTask(EditingObj.value);
  EditingObj.value.task_Name = "";
  EditingObj.value.id = "";
  EditingObj.value.status = "";
  dialog.value = false;
};
const putEditName = (task: any) => {
  checkName.value = task.task_Name;
  EditingObj.value.task_Name = task.task_Name;
  EditingObj.value.id = task.id;
  EditingObj.value.status = task.status;
  EditDoneButton.value = true;
};
const checkDoneValidation = () => {
  if (
    EditingObj.value.task_Name === checkName.value ||
    EditingObj.value.task_Name === null
  ) {
    EditDoneButton.value = true;
    return true;
  } else {
    EditDoneButton.value = false;
    return false;
  }
};
const closeEdit = () => {
  dialog.value = !dialog.value;
  EditingObj.value.id = "";
  EditingObj.value.status = "";
};
const ShowMessage = () => {
  setTimeout(() => {
    store.ifItemIncluded = false;
  }, 500);
};

onMounted(() => {
  store.getTasks;
});
</script>

<template>
  <v-sheet
    width="100%"
    height="100%"
    class="d-flex align-center justify-center flex-nowrap bg-transparent"
  >
    <v-container class="pa-4 d-flex align-center justify-center">
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
        width="80%"
        class="d-flex justify-center align-center flex-wrap pa-3 mx-4"
      >
        <v-card-title
          class="text-grey-lighten-2 font-weight-medium text-h5 w-100 text-center"
        >
          Task List
        </v-card-title>
        <v-card-item class="w-100 pb-0">
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
                :disabled="task_Name == ''"
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
          <v-container fluid>
            <p
              class="text-h3 my-2 font-italic text-grey-darken-1 text-center"
              v-if="store.createdTasks.length == 0"
            >
              No Tasks Here Yet
            </p>
            <v-row v-else>
              <v-card-title class="text-grey-lighten-1 text-center pb-2 w-100">
                <span class="magic"> your magical list </span>
                <v-icon
                  icon="mdi-auto-fix"
                  size="small"
                  class="magicIcon"
                ></v-icon>
              </v-card-title>
              <TransitionGroup name="fade" tag="v-row" class="w-100">
                <v-fade-transition
                  group
                  tag="v-row"
                  class="w-100 d-flex justify-center flex-wrap align-center"
                  key="task"
                >
                  <v-col
                    class="bg-darkBlue mb-2 w-100 rounded-pill"
                    cols="9"
                    v-for="(task, index) in store.createdTasks"
                    :key="index"
                  >
                    <v-row>
                      <v-col
                        cols="7"
                        class="text-left d-flex justify-start align-center"
                      >
                        <p class="px-3">{{ task.task_Name }}</p>
                      </v-col>
                      <v-col cols="5">
                        <div
                          class="d-flex justify-end align-center flex-wrap w-100"
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
    <v-card
      rounded="xl"
      color="#384152"
      height="200px"
      class="d-flex justify-center align-stretch flex-wrap"
    >
      <v-card-item>
        <v-text-field
          v-model="EditingObj.task_Name"
          rounded
          variant="solo"
          density="comfortable"
          clearable
          bg-color="#111828"
          :hide-details="true"
          @update:model-value="checkDoneValidation()"
        ></v-text-field>
      </v-card-item>
      <v-card-item>
        <div class="d-flex justify-center align-center flex-wrap w-100 pa-3">
          <v-btn
            :loading="store.isLoading"
            class="px-2 mx-1"
            color="green"
            variant="outlined"
            :disabled="EditDoneButton"
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
.magic,
.magicIcon {
  --bg-size: 200%;
  --color-one: hsl(15 90% 55%);
  --color-two: hsl(40 95% 55%);
  /* font-size: clamp(3rem, 25vmin, 8rem); */
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}
@media (prefers-reduced-motion: no-preference) {
  .magic {
    animation: move-bg 2s linear infinite;
  }
  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
}
</style>
