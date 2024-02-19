import { createApp } from "vue";
import router from "./router/router";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import * as Sentry from "@sentry/vue";
import Vue3Transitions from "vue3-transitions";
import "./style.css";
const pinia = createPinia();
import App from "./App.vue";
import "animate.css";
const app = createApp(App);
Sentry.init({
  dsn: "https://0ff2f3b566bd45f88591990d2ab27c45@o4506740210663424.ingest.sentry.io/4506771773390848",
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.browserProfilingIntegration(),
    Sentry.vueIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
    Sentry.metrics.metricsAggregatorIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/geekbox\.xyz\//],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
app.use(Vue3Transitions);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
