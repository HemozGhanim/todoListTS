<script setup lang="ts">
import LogoPhoto from "../assets/logoGeekBox.svg";
import LogoSmallPhoto from "../assets/logoGeekBox.png";
import { userAuthStore } from "../store/userAuth";
import { reactive, ref } from "vue";

const userStore = userAuthStore();

let email = ref("");
let password = ref("");
let signUpEmail = ref("");
let signUpPassword = ref("");
let signUpRePassword = ref("");
let loading = ref(false);
let form = ref(false);
let showPass = ref(false);

const rules = reactive({
  required: (value: any) => !!value || "Field is required",
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
  min: (v: string) => v.length >= 8 || "Min 8 characters",
});

let SignUpView = ref(false);
function IsLoad() {
  loading.value = true;

  if (userStore.heISIn === true) {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  } else {
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  }
}
function toggleView() {
  SignUpView.value = !SignUpView.value;
}
</script>
<template>
  <v-sheet class="h-screen pa-3 bg-blue-lighten-1" style="overflow: hidden">
    <v-row>
      <v-col cols="8" class="h-screen py-5">
        <v-img
          aspect-ratio="16/9"
          crossorigin="use-credentials"
          :draggable="true"
          class="w-50 mx-auto my-auto animate__animated animate__pulse animate__infinite animate__slower"
          height="100%"
          :src="LogoPhoto"
        ></v-img>
      </v-col>
      <!-- signUp view -->
      <v-col
        cols="4"
        class="h-screen elevation-5 BgSide d-flex justify-center align-center flex-wrap overflow-y-auto scrollable-div"
        v-if="SignUpView"
      >
        <div class="ImgBox w-100 h-25">
          <v-img
            aspect-ratio="16/9"
            crossorigin="use-credentials"
            class="w-75 mx-auto my-auto h-auto"
            :inline="true"
            :src="LogoSmallPhoto"
          ></v-img>
        </div>

        <v-spacer></v-spacer>
        <v-card
          width="100%"
          color="transparent"
          elevation="0"
          class="my-auto d-block"
        >
          <v-card-title>signUp</v-card-title>
          <v-spacer></v-spacer>
          <v-card-item>
            <form>
              <v-text-field
                bg-color="white"
                required
                clearable
                label="Email address"
                placeholder="johndoe@gmail.com"
                type="email"
                variant="solo"
                v-model="signUpEmail"
              ></v-text-field>
              <v-text-field
                bg-color="white"
                required
                clearable
                label="Password"
                hint="Enter your password to access this website"
                type="input"
                variant="solo"
                v-model="signUpPassword"
              ></v-text-field>
              <v-text-field
                bg-color="white"
                required
                clearable
                label="Re Password"
                hint="Re Enter your password to access this website"
                type="input"
                variant="solo"
                v-model="signUpRePassword"
              ></v-text-field>
              <v-btn
                block
                class="mb-8 mt-4 bg-MainColor text-white"
                size="large"
                @click="IsLoad()"
                to="/home"
                :loading="loading"
              >
                Create Account
              </v-btn>
              <v-card-text class="text-center">
                <v-btn
                  class="MainColor text-decoration-none text-h6"
                  variant="text"
                  @click="toggleView"
                >
                  I Have Account Already
                  <v-icon icon="mdi-chevron-right"></v-icon>
                </v-btn>
              </v-card-text>
            </form>
          </v-card-item>
        </v-card>
      </v-col>
      <!-- signIn View -->
      <v-col
        cols="4"
        class="h-screen elevation-5 BgSide d-flex justify-center align-center flex-wrap overflow-y-auto scrollable-div"
        v-else
      >
        <div class="ImgBox w-100 h-25">
          <v-img
            aspect-ratio="16/9"
            crossorigin="use-credentials"
            class="w-75 mx-auto my-auto h-auto"
            :inline="true"
            :src="LogoSmallPhoto"
          ></v-img>
        </div>

        <v-spacer></v-spacer>
        <v-card
          width="100%"
          color="transparent"
          elevation="0"
          class="my-auto d-block"
        >
          <p
            v-if="userStore.InValied"
            class="text-center w-100 font-weight-medium bg-red py-2 rounded-lg text-subtitle-1"
          >
            {{ userStore.signInErrorMessage }}
          </p>
          <v-card-title>Login</v-card-title>
          <v-spacer></v-spacer>
          <v-card-item>
            <v-form v-model="form">
              <v-text-field
                bg-color="white"
                required
                clearable
                :rules="[rules.required, rules.email]"
                label="Email address"
                placeholder="johndoe@gmail.com"
                type="email"
                variant="solo"
                v-model="email"
                rounded
                density="comfortable"
              ></v-text-field>
              <v-text-field
                :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                bg-color="white"
                required
                clearable
                label="password"
                :rules="[rules.required, rules.min]"
                hint="Enter your password to access this website"
                :type="showPass ? 'text' : 'password'"
                @click:append-inner="showPass = !showPass"
                variant="solo"
                v-model="password"
                rounded
                class="rounded-xl"
                density="comfortable"
              ></v-text-field>
              <v-btn
                block
                class="mb-8 mt-4 bg-MainColor text-white"
                size="large"
                rounded
                @click="
                  IsLoad(),
                    userStore.signInUser({
                      email: email,
                      password: password,
                    })
                "
                to="/home"
                :loading="loading"
              >
                Log In
              </v-btn>
              <v-card-text class="text-center">
                <v-btn
                  class="MainColor text-decoration-none text-h6"
                  variant="text"
                  @click="toggleView"
                >
                  Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                </v-btn>
              </v-card-text>
            </v-form>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<style scoped>
.BgSide {
  background-color: rgb(255 255 255 / 39%) !important;
  color: #000;
}
.bg-MainColor {
  background-color: #002d4f;
}
.MainColor {
  color: #002d4f;
}
.LogoSecondColor {
  color: #ea3560;
}
.ImgBox {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .v-navigation-drawer__content::-webkit-scrollbar {
  width: 1px;
} */

.scrollable-div::-webkit-scrollbar {
  width: 10px; /* Set the width of the scrollbar */
}

.scrollable-div::-webkit-scrollbar-thumb {
  background: #002d4f; /* Set the color of the scrollbar thumb */
  border-radius: 20px; /* Set the radius of the scrollbar thumb */
}
</style>
