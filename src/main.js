import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
// import VueRouter from 'vue-router'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import store from '@/store'

loadFonts()

// font-awesome과 관련된 import를 정의
import { library } from '@fortawesome/fontawesome-svg-core'
// 사용할 아이콘 목록 import
import { faUser, faKey, faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faKey, faCode)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app')