'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _page = require('./page.js');

var _page2 = _interopRequireDefault(_page);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

exports.default = new _vuex2.default.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		page: _page2.default,
		api: _api2.default
	}
});

//# sourceMappingURL=index-compiled.js.map