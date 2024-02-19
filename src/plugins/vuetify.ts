import "vuetify/styles";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import colors from "vuetify/util/colors";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi", // This is already the default value - only for display purposes
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          background: "#111828",
          darkBlue: "#111828",
        },
      },
    },
  },
  // theme: {
  //   themes: {
  //     light: {
  //       dark: false,
  //       colors: {
  //         darkBlue: "#111828",
  //       },
  //     },
  //   },
  // },
});

export default vuetify;
