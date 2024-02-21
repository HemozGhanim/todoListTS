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

export const userAuthStore = defineStore("Users", () => {
  //stores
  const TasksStore = useTasksStore();
  //variables
  const heISIn = ref(false);
  const signInErrorMessage = ref("");
  const InValied = ref(false);
  const $cookies = useCookies().cookies;
  const userEmail = ref("");
  const uid = ref("");
  const snackbar = ref(false);
  const snackBarText = ref("");
  const snackBarColor = ref("");
  const theme = useTheme();

  //functions
  const signUpUser = async (user: user_body) => {
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
      url: `:signUp?key=${import.meta.env.VITE_APP_API_KEY}`,
      data: data,
    };
    await axios(config)
      .then(function (response) {
        const data = response.data;
        $cookies.set("jwToken", data.idToken);
        $cookies.set("uid", data.localId);
        userEmail.value = data.email;
        heISIn.value = false;
        snackbar.value = true;
        snackBarText.value = "Created Successfuly";
        snackBarColor.value = "success";
        router.push("/");
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
        userEmail.value = data.email;
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
  };

  return {
    signInUser,
    signOutUser,
    signUpUser,
    heISIn,
    signInErrorMessage,
    InValied,
    userEmail,
    uid,
    snackbar,
    snackBarText,
    snackBarColor,
  };
});

// const config = {
//       method: "get",
//       baseURL: import.meta.env.VITE_APP_API_URL,
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//         "Content-Type": "application/json",
//       },
//       url: "/admin/users",
//     };
//     if (useCookies().cookies.isKey("jwtToken")) {
//       const res = await axios(config)
