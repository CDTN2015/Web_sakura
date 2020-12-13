import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import JSEncrypt from 'jsencrypt'

Vue.prototype.$getRsaCode = function(str){
  let pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRwlYVAwXNnqfRSYw3SyF9o2o3\
Wnb7SJ+QFckysiQbpehzyV8Kzk/b/A/byKGm0CiqVz47xtPVF8KHbL67zaoiOcgb\
qBkSqp555npLzGw4G7xlRLgvNg4QdaDy5qr25B3UgGZ+g1cfAu5HUybQh+DdyG0+\
fuaFECNsNb4+Vn7hsQIDAQAB';
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey);
  return encryptStr.encrypt(str.toString());
}

Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
/*axios.interceptors.request.use((req) =>{
  if(req.method === 'post'){
    req.data = qs.stringify(req.data)
  }
  return req
},(error) => Promise.reject(error))*/

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
