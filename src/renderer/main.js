import Vue from 'vue'
import axios from 'axios'

import './styles/index.scss'
import '@/assets/iconfont/iconfont.css'
import App from './App'
import router from './router'
import store from './store'
import { quickRouter} from '@/utils/tools.js'
import appRootDir from 'app-root-dir'
import os from 'os'
import path from 'path'
import db from '../utils/dataStore'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// 项目目录
const { remote } = require('electron')
const userPath = process.env.NODE_ENV == 'development' ? remote.getGlobal('fileObj').userPath : remote.app.getPath('userData')
Vue.prototype.$objectPath = userPath

const fs = require('fs')
fs.mkdir(userPath + '/temp', function (err, result) {

})
// 是否为windows
Vue.prototype.$isWindows = remote.getGlobal('isWindows')

// 用户目录
Vue.prototype.$userPath = remote.app.getPath('userData')

// ffmpeg目录
let ffmpegPath = ''
const platform = os.platform()
if (process.env.NODE_ENV == 'development') {
  ffmpegPath = require('ffmpeg-static')
} else {
  ffmpegPath = path.join(appRootDir.get(), './resources/' + platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg')
}
Vue.prototype.$ffmpegPath = ffmpegPath

// exec
const util = require('util')
const exec = util.promisify(require('child_process').exec)
Vue.prototype.$exec = exec

// db
Vue.prototype.$DB = db

// quickRouter
Vue.prototype.$quickRouter = quickRouter
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
