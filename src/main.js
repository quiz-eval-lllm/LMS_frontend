import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Set up base URL for API requests (optional)

// Inject Axios into app instance
const app = createApp(App);
app.config.globalProperties.$axios = axios;

// Use router
app.use(router);

// Mount the app
app.mount("#app");
