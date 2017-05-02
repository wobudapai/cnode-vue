
import Vue from 'vue';
import App from './App';
import router from './router';
import CommonPlugin from './plugin/CommonPlugin';
import axios from 'axios';
import store from './store/';
import './assets/js/base.js';

Vue.config.productionTip = false;
Vue.use(CommonPlugin);

global.axios = axios;
axios.defaults.baseURL = 'https://cnodejs.org/api/v1';

var manualLoadingPage = ['/detail'];

var history = window.sessionStorage;
history.clear();
var historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

var commit = store.commit;
router.beforeEach(function (to, from, next) {
  to.meta.title && window.setDocumentTitle(to.meta.title);
  var toIndex = history.getItem(to.path);
  var fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward');
    } else {
      commit('UPDATE_DIRECTION', 'reverse');
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    commit('UPDATE_DIRECTION', 'forward');
  }
  commit('UPDATE_LOADING', true);
  next();
});

router.afterEach(function (to, from, next) {
  var isContain = false;
  manualLoadingPage.forEach(function (v) {
    if (v === to.path) {
      isContain = true;
    }
  });
  if (!isContain) {
    commit('UPDATE_LOADING', false);
  }
});

window.setDocumentTitle = function (title) {
  document.title = title;
  var ua = navigator.userAgent;
  if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    var i = document.createElement('iframe');
    i.src = './views/title.html';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
};

new Vue({
  el: '#app',
  store: store,
  router: router,
  template: '<App/>',
  components: { App: App }
});

//# sourceMappingURL=main-compiled.js.map