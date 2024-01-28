import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

interface task_body {
  id?: string;
  task_Name: string;
  status?: string;
}
export const useTasksStore = defineStore("tasks", () => {
  let createdTasks = ref<Array<task_body>>([]);
  let deletedTasks = ref<Array<task_body>>([]);
  let finishedTasks = ref<Array<task_body>>([]);
  let ifItemIncluded = ref<boolean>();
  let ExistMessage = ref<string>();
  let setTimeOutMessage = ref<number>();
  //Get tasks function
  function getTasks() {
    axios
      .get("https://todots-57c6a-default-rtdb.firebaseio.com/task.json")
      .then(function (response) {
        const data = response.data;
        const allTasks = ref<Array<task_body>>([]);
        for (let key in data) {
          const task = data[key];
          task.id = key;
          allTasks.value.push(task);
        }
        allTasks.value.forEach((element) => {
          if (element.status === "created") {
            // Extracting existing IDs from the first Array
            const isIncreatedtasksArray = createdTasks.value.map(
              (item) => item.id
            );
            // Extracting existing Taske Name from the first Array
            const isIncreatedtasksArrayTaskName = createdTasks.value.map(
              (item) => item.task_Name
            );

            // Checking if the current task's ID is not already in the first Array
            if (
              !isIncreatedtasksArray.includes(element.id) &&
              !isIncreatedtasksArrayTaskName.includes(element.task_Name)
            ) {
              createdTasks.value.push(element);
            }
          } else if (element.status === "deleted") {
            // Extracting existing IDs from the first Array
            const isIndeletedtasksArray = deletedTasks.value.map(
              (item) => item.id
            );
            // Extracting existing Taske Name from the first Array
            const isIndeletedtasksArrayTaskName = createdTasks.value.map(
              (item) => item.task_Name
            );

            // Checking if the current task's ID is not already in the first Array
            if (
              !isIndeletedtasksArray.includes(element.id) &&
              !isIndeletedtasksArrayTaskName.includes(element.task_Name)
            ) {
              deletedTasks.value.push(element);
            }
          } else if (element.status === "finished") {
            // Extracting existing IDs from the first Array
            const isInfinishedtasksArray = finishedTasks.value.map(
              (item) => item.id
            );
            // Extracting existing Taske Name from the first Array
            const isInfinishedtasksArrayTaskName = createdTasks.value.map(
              (item) => item.task_Name
            );

            // Checking if the current task's ID is not already in the first Array
            if (
              !isInfinishedtasksArray.includes(element.id) &&
              !isInfinishedtasksArrayTaskName.includes(element.task_Name)
            ) {
              finishedTasks.value.push(element);
            }
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getTasks();

  function pushTasks(task: task_body) {
    if (createdTasks.value.some((el) => el.task_Name === task.task_Name)) {
      ifItemIncluded.value = true;
      setTimeOutMessage.value = 1;
      ExistMessage.value = "Task is Already Added";
    } else {
      axios
        .post("https://todots-57c6a-default-rtdb.firebaseio.com/task.json", {
          id: task.id,
          task_Name: task.task_Name,
          status: "created",
        })
        .then(function () {
          getTasks();
        })
        .catch(function (error) {
          console.log(error);
        });
      ifItemIncluded.value = false;
    }
  }

  function DeleteTask(id: any, task: task_body) {
    axios
      .put(`https://todots-57c6a-default-rtdb.firebaseio.com/task/${id}.json`, {
        id: task.id,
        task_Name: task.task_Name,
        status: "deleted",
      })
      .then((Response) => {
        console.log(Response);
        const objIndex = createdTasks.value.findIndex((item) => item.id === id);
        createdTasks.value.splice(objIndex, 1);
        deletedTasks.value.push({
          id: task.id,
          task_Name: task.task_Name,
          status: "deleted",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function finishedTask(id: any, task: task_body) {
    axios
      .put(`https://todots-57c6a-default-rtdb.firebaseio.com/task/${id}.json`, {
        id: task.id,
        task_Name: task.task_Name,
        status: "finished",
      })
      .then((Response) => {
        console.log(Response);
        const objIndex = createdTasks.value.findIndex((item) => item.id === id);
        createdTasks.value.splice(objIndex, 1);
        finishedTasks.value.push({
          id: task.id,
          task_Name: task.task_Name,
          status: "finished",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function UnDeleteTask(id: any, task: task_body) {
    axios
      .put(`https://todots-57c6a-default-rtdb.firebaseio.com/task/${id}.json`, {
        id: task.id,
        task_Name: task.task_Name,
        status: "created",
      })
      .then(function () {
        const getIndex = deletedTasks.value.findIndex((item) => item.id === id);
        deletedTasks.value.splice(getIndex, 1);
        if (createdTasks.value.some((el) => el.task_Name === task.task_Name)) {
          ifItemIncluded.value = true;
          setTimeOutMessage.value = 1;
          ExistMessage.value = "Deleted Task is Already here";
        } else {
          createdTasks.value.push({
            task_Name: task.task_Name,
            status: "created",
          });
        }
      });
  }
  function perDeleteTask(id: any) {
    axios
      .delete(
        `https://todots-57c6a-default-rtdb.firebaseio.com/task/${id}.json`
      )
      .then(function (response) {
        const getIndex = deletedTasks.value.findIndex((item) => item.id === id);
        deletedTasks.value.splice(getIndex, 1);
        console.log(response);
      });
  }
  function unfinishedTask(id: any, task: task_body) {
    axios
      .put(`https://todots-57c6a-default-rtdb.firebaseio.com/task/${id}.json`, {
        id: task.id,
        task_Name: task.task_Name,
        status: "created",
      })
      .then(function () {
        const getIndex = finishedTasks.value.findIndex(
          (item) => item.id === id
        );
        finishedTasks.value.splice(getIndex, 1);
        if (createdTasks.value.some((el) => el.task_Name === task.task_Name)) {
          ifItemIncluded.value = true;
          setTimeOutMessage.value = 1;
          ExistMessage.value = "Finished Task is Already here";
        } else {
          createdTasks.value.push({
            task_Name: task.task_Name,
            status: "created",
          });
        }
      });
  }
  function permanentDeleteFinishedTask(id: any) {
    axios
      .delete(
        `https://todots-57c6a-default-rtdb.firebaseio.com/task/${id}.json`
      )
      .then(function (response) {
        const getIndex = finishedTasks.value.findIndex(
          (item) => item.id === id
        );
        finishedTasks.value.splice(getIndex, 1);
        console.log(response);
      });
  }
  function editTask(task: task_body) {
    axios
      .put(
        `https://todots-57c6a-default-rtdb.firebaseio.com/task/${task.id}.json`,
        {
          id: task.id,
          task_Name: task.task_Name,
          status: "created",
        }
      )
      .then(function (response) {
        const getIndex = createdTasks.value.findIndex(
          (item) => item.id === task.id
        );
        createdTasks.value.splice(getIndex, 1, task);
        console.log(response);
      });
  }
  return {
    createdTasks,
    deletedTasks,
    finishedTasks,
    ifItemIncluded,
    ExistMessage,
    setTimeOutMessage,
    pushTasks,
    DeleteTask,
    finishedTask,
    UnDeleteTask,
    perDeleteTask,
    unfinishedTask,
    permanentDeleteFinishedTask,
    editTask,
  };
});
