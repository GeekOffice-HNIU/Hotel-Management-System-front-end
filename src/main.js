import { createApp } from "vue";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/assets/fonts/font.css';
import mitt from '@/libs/libs.js';

const app = createApp(App);

app.config.globalProperties.$mitt = mitt;

app.use(store).use(router).use(ElementPlus).mount("#app");