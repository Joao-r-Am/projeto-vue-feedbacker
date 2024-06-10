import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/main.css";
import "@/assets/css/fonts.css";
import "animate.css";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(Toast, { position: POSITION.TOP_RIGHT });

app.mount("#app");
