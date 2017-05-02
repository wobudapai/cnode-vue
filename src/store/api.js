import { post, get } from './fetch.js'

const api = {
  topics: '/topics',
  detail: '/topic/'
}

export default {
  actions: {
    LOGIN: ({ state, commit }, user) => {
      return new Promise(function (resolve, reject) {
        post(api.login, user).then(function (u) {
          global.user.saveUser(u)
          resolve()
        }).catch(function (e) {
          reject(e)
        })
      })
    },
    topics: ({ state }, { page = 1, limit = 10, mdrender = false, tab }) => {
      return get(api.topics, { page, limit, mdrender, tab }, false)
    },
    detail: ({ state }, id) => {
      return get(api.detail + id, false)
    }
  }
}
