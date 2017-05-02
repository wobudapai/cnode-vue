'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.post = post;
exports.get = get;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function post(url, form) {
	return new _promise2.default(function (resolve, reject) {
		console.log('post');
		_axios2.default.post(url, form).then(function (response) {
			console.log(response);
			if (response.status === 200) {
				resolve(response.data);
			} else {
				reject(response.data.message);
			}
		}).catch(function (e) {
			reject(e);
		});
	});
}

function get(url) {
	var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	if (cache) {
		var key = url + form.toString();
		var sessionData = window.sessionStorage.getItem(key);
		return new _promise2.default(function (resolve, reject) {
			if (sessionData) {
				resolve(JSON.parse(sessionData));
			} else {
				getFromServer(url, form).then(function (data) {
					window.sessionStorage.setItem(key, (0, _stringify2.default)(data));
					resolve(data);
				}).catch(function (e) {
					reject(e);
				});
			}
		});
	} else {
		return getFromServer(url, form);
	}
}

function getFromServer(url, params) {
	return new _promise2.default(function (resolve, reject) {
		if ((0, _getOwnPropertyNames2.default)(params).length > 0) {
			url += '?';
			for (var f in params) {
				console.log('param ' + f + ':' + params[f]);
				url += f + '=' + params[f] + '&';
			}
			url = url.substring(0, url.length - 1);
		}
		console.log(url);
		_axios2.default.get(url).then(function (response) {
			console.log(response);
			if (response.status === 200) {
				resolve(response.data);
			} else {
				reject(response.data.message);
			}
		}).catch(function (e) {
			reject(e);
		});
	});
}

//# sourceMappingURL=fetch-compiled.js.map