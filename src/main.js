import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

// font-awesome과 관련된 import를 정의 
import { library } from '@fortawesome/fontawesome-svg-core' 
// 사용할 아이콘 목록 import
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from "axios";

library.add(faUser, faKey)

const app = createApp(App)
axios.defaults.baseURL = "http://dev-faker-be.herokuapp.com";
app.config.globalProperties.axios = axios;
app.component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(vuetify)
    .mount('#app')