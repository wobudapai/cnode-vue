/**
 * Created by zy on 2016/12/15.
 */
import Vuex from 'vuex'
import Vue from 'vue'

import page from './page.js'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
	modules: {
		page,
    api
	}
})
