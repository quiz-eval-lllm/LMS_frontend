import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Set up base URL for API requests (optional)
// axios.defaults.baseURL = "http://localhost:8084"; // development
axios.defaults.baseURL = "http://35.184.2.105:8084"; // production

// Inject Axios into app instance
const app = createApp(App);
app.config.globalProperties.$axios = axios;

// Use router
app.use(router);

// Mount the app
app.mount("#app");
