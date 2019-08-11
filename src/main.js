import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入normalizeCss
import 'normalize.css'

// 引入antDesign
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.min.css'
Vue.use(ant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
