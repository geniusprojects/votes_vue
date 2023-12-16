import { createApp } from 'vue'
import App from './App.vue'
import router from '../../router'
import store from '../../store'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-vue'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'

axios.defaults.baseURL = 'http://api.zoteps.ru'

createApp(App).use(store).use(router, axios).use(CKEditor).mount('#app')
