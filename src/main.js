// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/common.scss'
import {
  Form,
  FormItem,
  Input,
  Button,
  MessageBox,
  Message,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Pagination,
  DatePicker
} from 'element-ui'
import axios from './utils/http'

const Components = [
  Form,
  FormItem,
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Pagination,
  DatePicker
]
Components.map(key => Vue.use(key))
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.config.productionTip = false

// axios configuration
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
