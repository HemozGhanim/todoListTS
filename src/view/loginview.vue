<script setup lang="ts">
import LogoPhoto from "../assets/logoGeekBox.svg";
import LogoSmallPhoto from "../assets/logoGeekBox.png";
</script>
<template>
  <v-sheet class="h-screen pa-3 bg-blue-lighten-1">
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
      <v-col
        cols="4"
        class="h-screen elevation-5 BgSide d-flex justify-center align-center flex-wrap"
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
          <v-card-title>Login</v-card-title>
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
              ></v-text-field>
              <v-text-field
                bg-color="white"
                required
                clearable
                label="password"
                hint="Enter your password to access this website"
                type="input"
                variant="solo"
              ></v-text-field>
              <v-btn
                block
                class="mb-8 mt-4 bg-MainColor text-white"
                size="large"
              >
                Log In
              </v-btn>
              <v-card-text class="text-center">
                <a
                  class="MainColor text-decoration-none text-h6"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
              </v-card-text>
            </form>
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
</style>
