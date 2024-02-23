import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import router from "../router/router";
import { useCookies } from "vue3-cookies";
import { useTasksStore } from "./todoStore";
import { useTheme } from "vuetify";
interface user_body {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
interface user_data {
  fristName: string;
  lastName: string;
  userName: string;
  dateOfBirth: string;
}

export const userAuthStore = defineStore("Users", () => {
  //stores
  const TasksStore = useTasksStore();
  //variables
  const heISIn = ref(false);
  const userDataObj = ref<user_data>({
    fristName: "",
    lastName: "",
    userName: "",
    dateOfBirth: "",
  });
  const signInErrorMessage = ref("");
  const InValied = ref(false);
  const $cookies = useCookies().cookies;
  const uid = ref("");
  const snackbar = ref(false);
  const snackBarText = ref("");
  const snackBarColor = ref("");
  const theme = useTheme();

  const getUserData = () => {
    const config = {
      method: "get",
      baseURL: import.meta.env.VITE_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      url: `/users/${$cookies.get("uid")}/userData.json?auth=${$cookies.get(
        "jwToken"
      )}`,
    };
    axios(config)
      .then((res) => {
        const data = res.data;
        console.log(data);
        userDataObj.value = data;
        $cookies.set("userName", btoa(userDataObj.value.userName));
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  //functions
  const signUpUser = async (user: user_body, userData: user_data) => {
    heISIn.value = true;
    const data = JSON.stringify({
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    });
    const dataUser = JSON.stringify({
      fristName: userData.fristName,
      lastName: userData.lastName,
      userName: userData.userName,
      dateOfBirth: userData.dateOfBirth,
    });
    const config = {
      method: "post",
      baseURL: import.meta.env.VITE_APP_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
      },
      url: `:signUp?key=${import.meta.env.VITE_APP_API_KEY}`,
      data: data,
    };

    await axios(config)
      .then(function (response) {
        const data = response.data;
        const token = data.idToken;
        const userId = data.localId;

        const configDataUser = {
          method: "put",
          baseURL: import.meta.env.VITE_APP_API_URL,
          headers: {
            "Content-Type": "application/json",
          },
          url: `/users/${userId}/userData.json?auth=${token}`,
          data: dataUser,
        };
        axios(configDataUser)
          .then(function () {
            heISIn.value = false;
            snackbar.value = true;
            snackBarText.value = "Created Successfuly";
            snackBarColor.value = "success";
            router.push("/");
          })
          .catch(function (userErr) {
            console.log(userErr);
          });
      })
      .catch(function (error) {
        snackBarText.value = "Error In Creating Account";
        snackBarColor.value = "red";
        console.log(error);
      });
  };
  const signInUser = async (user: user_body) => {
    heISIn.value = true;
    const data = JSON.stringify({
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    });
    const config = {
      method: "post",
      baseURL: import.meta.env.VITE_APP_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
      },
      url: `:signInWithPassword?key=${import.meta.env.VITE_APP_API_KEY}`,
      data: data,
    };
    await axios(config)
      .then(function (response) {
        const data = response.data;
        $cookies.set("jwToken", data.idToken);
        $cookies.set("uid", data.localId);
        getUserData();
        heISIn.value = false;
        snackbar.value = true;
        snackBarText.value = "Loggedin Successfuly";
        snackBarColor.value = "success";
        TasksStore.getTasks();
        router.push("/");
      })
      .catch(function (error) {
        snackbar.value = true;
        snackBarText.value = "Error In Logging In";
        snackBarColor.value = "red";
        console.log(error);
      });
  };

  const signOutUser = () => {
    TasksStore.resetAllData();
    heISIn.value = false;
    snackbar.value = true;
    snackBarText.value = "Logged Out - Thanks For Using Geek App";
    snackBarColor.value = theme.current.value.colors.darkBlue;
    $cookies.remove("jwToken");
    $cookies.remove("uid");
    $cookies.remove("userName");
  };

  return {
    signInUser,
    signOutUser,
    signUpUser,
    getUserData,
    heISIn,
    signInErrorMessage,
    InValied,
    uid,
    snackbar,
    snackBarText,
    snackBarColor,
    userDataObj,
  };
});
