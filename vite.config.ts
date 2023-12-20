import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // proxy: "https://mainsite.com/",
  server: {
    port: 3000,

    // proxy: {
    //   "/api": {
    //     target: "https://todots-57c6a-default-rtdb.firebaseio.com",
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
