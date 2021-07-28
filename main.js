import Vue from 'vue'
import App from './App'
import mydialog from './pages/components/dialog/index.vue';

Vue.config.productionTip = false


Vue.component('my-dialog',mydialog)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
