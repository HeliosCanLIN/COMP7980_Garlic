

import { createApp } from 'vue'
import MainNav from './MainNav.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(MainNav)

app.use(router)
app.use(VueApexCharts)

app.mount('#app')
