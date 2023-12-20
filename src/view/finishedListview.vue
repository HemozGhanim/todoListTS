<template>
  <v-sheet width="100%" height="100%" d-flex align="center" justify="center">
    <v-container fluid>
      <v-card
        elevation="5"
        max-width="50%"
        color="#384152"
        rounded="xl"
        class="pa-3"
      >
        <v-card-title class="text-grey-lighten-2 font-weight-medium text-h5">
          Finished Task List
        </v-card-title>
        <v-card-item>
          <v-row align="center" justify="center">
            <v-col cols="10" class="px-1">
              <v-text-field
                label="Your Task"
                variant="solo"
                bg-color="#202938"
                :hide-details="true"
                rounded
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="pa-0">
              <v-btn
                icon="mdi-plus"
                density="compact"
                size="large"
                color="red-darken-1"
              ></v-btn>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-item>
          <v-card-title class="text-grey-lighten-1 text-left pl-6">
            Tasks
          </v-card-title>
          <v-container fluid>
            <v-row>
              <v-col cols="12" class="bg-darkBlue rounded-xl mb-2">
                <v-row>
                  <v-col cols="8" class="text-left"
                    ><p class="px-3">text</p></v-col
                  >
                  <v-col cols="4">
                    <v-btn
                      size="small"
                      variant="text"
                      class="px-2 mx-1 text-blue"
                      >Edit</v-btn
                    >
                    <v-btn
                      size="small"
                      variant="text"
                      class="px-2 mx-1 text-red"
                      >Delete</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="bg-darkBlue rounded-xl mb-2">
                <v-row>
                  <v-col cols="8" class="text-left"
                    ><p class="px-3">text</p></v-col
                  >
                  <v-col cols="4">
                    <v-btn
                      size="small"
                      variant="text"
                      class="px-2 mx-1 text-blue"
                      >Edit</v-btn
                    >
                    <v-btn
                      size="small"
                      variant="text"
                      class="px-2 mx-1 text-red"
                      >Delete</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-item>
      </v-card>
    </v-container>
  </v-sheet>
</template>
