import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";

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
  const $cookies = useCookies().cookies;
  let isLoading = ref(false);
  // const jwt = $cookies.get("jwToken");
  // const uid = $cookies.get("uid");

  //Get tasks function
  function getTasks() {
    const config = {
      method: "get",
      baseURL: import.meta.env.VITE_APP_API_URL,
      url: `/users/${$cookies.get("uid")}/tasks.json?auth=${$cookies.get(
        "jwToken"
      )}`,
    };
    axios(config)
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

  const pushTasks = async (task: task_body) => {
    if (createdTasks.value.some((el) => el.task_Name === task.task_Name)) {
      ifItemIncluded.value = true;
      setTimeOutMessage.value = 1;
      ExistMessage.value = "Task is Already Added";
    } else {
      const data = JSON.stringify({
        id: task.id,
        task_Name: task.task_Name,
        status: "created",
      });
      const config = {
        method: "post",
        baseURL: import.meta.env.VITE_APP_API_URL,
        headers: {
          "Content-Type": "application/json",
        },
        url: `/users/${$cookies.get("uid")}/tasks.json?auth=${$cookies.get(
          "jwToken"
        )}`,
        data: data,
      };
      await axios(config)
        .then(function () {
          getTasks();
        })
        .catch(function (error) {
          console.log(error);
        });
      ifItemIncluded.value = false;
    }
  };

  const DeleteTask = async (id: any, task: task_body) => {
    const data = JSON.stringify({
      id: task.id,
      task_Name: task.task_Name,
      status: "deleted",
    });
    const config = {
      method: "put",
      baseURL: import.meta.env.VITE_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      url: `/users/${$cookies.get("uid")}/tasks/${id}.json?auth=${$cookies.get(
        "jwToken"
      )}`,
      data: data,
    };
    await axios(config)
      .then(() => {
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
  };

  // const DeleteAllTasks = async (id: any, task: task_body) => {
  //   const data = JSON.stringify({
  //     id: task.id,
  //     task_Name: task.task_Name,
  //     status: "deleted",
  //   });
  //   const config = {
  //     method: "put",
  //     baseURL: import.meta.env.VITE_APP_API_URL,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     url: `/users/${$cookies.get("uid")}/tasks/${id}.json?auth=${$cookies.get(
  //       "jwToken"
  //     )}`,
  //     data: data,
  //   };
  //   await axios(config)
  //     .then(() => {
  //       const objIndex = createdTasks.value.findIndex((item) => item.id === id);
  //       createdTasks.value.splice(objIndex, 1);
  //       deletedTasks.value.push({
  //         id: task.id,
  //         task_Name: task.task_Name,
  //         status: "deleted",
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const finishedTask = async (id: any, task: task_body) => {
    const data = JSON.stringify({
      id: task.id,
      task_Name: task.task_Name,
      status: "finished",
    });
    const config = {
      method: "put",
      baseURL: import.meta.env.VITE_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      url: `/users/${$cookies.get("uid")}/tasks/${id}.json?auth=${$cookies.get(
        "jwToken"
      )}`,
      data: data,
    };
    await axios(config)
      .then(() => {
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
  };

  const UnDeleteTask = async (id: any, task: task_body) => {
    const data = JSON.stringify({
      id: task.id,
      task_Name: task.task_Name,
      status: "created",
    });
    const config = {
      method: "put",
      baseURL: import.meta.env.VITE_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      url: `/users/${$cookies.get("uid")}/tasks/${id}.json?auth=${$cookies.get(
        "jwToken"
      )}`,
      data: data,
    };
    await axios(config).then(function () {
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
  };

  const perDeleteTask = async (id: any) => {
    const config = {
      method: "delete",
      baseURL: import.meta.env.VITE_APP_API_URL,
      url: `/users/${$cookies.get("uid")}/tasks/${id}.json?auth=${$cookies.get(
        "jwToken"
      )}`,
    };
    await axios(config).then(function () {
      const getIndex = deletedTasks.value.findIndex((item) => item.id === id);
      deletedTasks.value.splice(getIndex, 1);
    });
  };
  const unfinishedTask = async (id: any, task: task_body) => {
    const data = JSON.stringify({
      id: task.id,
      task_Name: task.task_Name,
      status: "created",
    });
    const config = {
      method: "put",
      baseURL: import.meta.env.VITE_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      url: `/users/${$cookies.get("uid")}/tasks/${id}.json?auth=${$cookies.get(
        "jwToken"
      )}`,
      data: data,
    };
    await axios(config).then(function () {
      const getIndex = finishedTasks.value.findIndex((item) => item.id === id);
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
  };

  const permanentDeleteFinishedTask = async (id: any) => {
    const config = {
      method: "delete",
      baseURL: import.meta.env.VITE_APP_API_URL,
      url: `/users/${$cookies.get("uid")}/tasks/${id}.json?auth=${$cookies.get(
        "jwToken"
      )}`,
    };
    await axios(config).then(function () {
      const getIndex = finishedTasks.value.findIndex((item) => item.id === id);
      finishedTasks.value.splice(getIndex, 1);
    });
  };

  const editTask = async (task: task_body) => {
    const data = JSON.stringify({
      id: task.id,
      task_Name: task.task_Name,
      status: "created",
    });
    const config = {
      method: "put",
      baseURL: import.meta.env.VITE_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      url: `/users/${$cookies.get("uid")}/tasks/${
        task.id
      }.json?auth=${$cookies.get("jwToken")}`,
      data: data,
    };
    await axios(config)
      .then(function () {
        isLoading.value = true;
        const getIndex = createdTasks.value.findIndex(
          (item) => item.id === task.id
        );
        try {
          createdTasks.value.splice(getIndex, 1);
        } catch {
          throw new Error("no splice");
        }
        getTasks();
        isLoading.value = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function resetAllData() {
    createdTasks.value = [];
    finishedTasks.value = [];
    deletedTasks.value = [];
  }
  return {
    createdTasks,
    deletedTasks,
    finishedTasks,
    ifItemIncluded,
    ExistMessage,
    setTimeOutMessage,
    isLoading,
    pushTasks,
    DeleteTask,
    finishedTask,
    UnDeleteTask,
    perDeleteTask,
    unfinishedTask,
    permanentDeleteFinishedTask,
    editTask,
    resetAllData,
    getTasks,
  };
});
