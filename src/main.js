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
  DatePicker,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Table,
  TableColumn,
  Autocomplete,
  Radio,
  RadioGroup,
  RadioButton,
  Upload,
  Tag,
  Dialog
} from 'element-ui'
import axios from './utils/http'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

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
  DatePicker,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Table,
  TableColumn,
  Autocomplete,
  Radio,
  RadioGroup,
  RadioButton,
  Upload,
  Tag,
  Dialog
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
