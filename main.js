import Vue from 'vue'
import App from './App'
import mydialog from './pages/components/dialog/index.vue';

import http from './common/http.js';

Vue.config.productionTip = false
Vue.prototype.http = http;


Vue.component('my-dialog',mydialog)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
