import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
interface task_body {
  task: string;
}
export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<task_body[]>([]);

  // function AddTask(task: task_body) {
  //   tasks.value.push(task);
  // }

  function pushTasks(task: task_body) {
    axios
      .post("./task.json", task)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function getTasks() {
    axios
      .get("./task.json")
      .then((response) => {
        console.log(response.data);
      })
      .then((error) => {
        console.log(error);
      });
  }
  getTasks();
  return { tasks, pushTasks };
});
