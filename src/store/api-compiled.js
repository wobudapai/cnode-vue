'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _fetch = require('./fetch.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = {
  topics: '/topics'
};

exports.default = {
  actions: {
    LOGIN: function LOGIN(_ref, user) {
      var state = _ref.state,
          commit = _ref.commit;

      return new _promise2.default(function (resolve, reject) {
        (0, _fetch.post)(api.login, user).then(function (u) {
          global.user.saveUser(u);
          resolve();
        }).catch(function (e) {
          reject(e);
        });
      });
    },
    topics: function topics(_ref2, _ref3) {
      var _ref3$page = _ref3.page,
          page = _ref3$page === undefined ? 1 : _ref3$page,
          _ref3$limit = _ref3.limit,
          limit = _ref3$limit === undefined ? 10 : _ref3$limit;
      (0, _objectDestructuringEmpty3.default)(_ref2);

      console.log('topics');
      (0, _fetch.get)(api.topics, { page: page, limit: limit }, false).then(function (data) {
        console.log(data);
      });
    }
  }
};

//# sourceMappingURL=api-compiled.js.map