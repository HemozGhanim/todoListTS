import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import router from "../router/router";

interface user_body {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
const heISIn = ref(false);
const signInErrorMessage = ref("");
const InValied = ref(false);
export const userAuthStore = defineStore("Users", () => {
  async function signInUser(user: user_body) {
    heISIn.value = true;
    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkCBATfqnheO2Wb4D3XKhWEWmGmUJGKIE",
        {
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }
      )
      .then(function (response) {
        const data = response.data;
        localStorage.setItem("jwToken", data.idToken);
        heISIn.value = false;
        InValied.value = false;
        router.push("/home");
      })
      .catch(function (error) {
        InValied.value = true;
        signInErrorMessage.value =
          "Email Or Passowrd Is Wrong .. Please Re Enter it ";
        console.log(error);
      });
  }
  function signOutUser() {
    localStorage.removeItem("jwToken");
  }
  return {
    signInUser,
    signOutUser,
    heISIn,
    signInErrorMessage,
    InValied,
  };
});
