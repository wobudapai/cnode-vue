export default {
  install: function (Vue, options) {
    Vue.prototype.$util = {
      parseTime: function (time) {
        const createTime = new Date(time)
        const offsetTime = parseInt((Date.now() - createTime) / 1000)
        if (offsetTime <= 0) {
          return ''
        }

        if (offsetTime > 10 * 24 * 60 * 60) {
          return createTime.getFullYear() + '年' + createTime.getMonth() + '月' + createTime.getDate()
        } else if (offsetTime > 24 * 60 * 60) {
          return parseInt(offsetTime / (24 * 60 * 60)) + '天前'
        } else if (offsetTime > 60 * 60) {
          return parseInt(offsetTime / (60 * 60)) + '小时前'
        } else {
          return parseInt(offsetTime / 60) + '分钟前'
        }
      }
    }
  }
}
