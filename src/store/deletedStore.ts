import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

// const TaksStorestore = useTasksStore();

interface task_body {
  id?: string;
  task_Name: string;
}
import { onUpdated } from "vue";

export const useDeletedStore = defineStore("DeletedTask", () => {
  let DeletedTasks = ref<Array<task_body>>([]);

  function GetDeletedTasks() {
    axios
      .get("https://todots-57c6a-default-rtdb.firebaseio.com/deleted.json")
      .then(function (response) {
        const data = response.data;
        for (let key in data) {
          const DeletedTask = data[key];
          DeletedTask.id = key;
          DeletedTasks.value.push(DeletedTask);
        }
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  GetDeletedTasks();

  function pushUnDeletedItems(task: task_body) {
    axios
      .post("https://todots-57c6a-default-rtdb.firebaseio.com/task.json", task)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function UnDeleteTask(id: any, task: task_body) {
    axios
      .delete(
        `https://todots-57c6a-default-rtdb.firebaseio.com/deleted/${id}.json`
      )
      .then(function (response) {
        const getIndex = DeletedTasks.value.findIndex((item) => item.id === id);
        DeletedTasks.value.splice(getIndex, 1);
        pushUnDeletedItems(task);
        console.log(response);
      });
  }
  onUpdated(() => {
    GetDeletedTasks();
  });
  return { DeletedTasks, UnDeleteTask };
});
