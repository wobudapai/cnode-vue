/**
 * Created by yangwuqin on 16/11/22.
 */
/**/

/*
 * 适配
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement
        var windowWidth = html.clientWidth
        html.style.fontSize = windowWidth / 6.4 + 'px'
    }, false)
})()

/**
 * 时间对象的格式化;
 */
/*
Date.prototype.format = function (format) {
	//format="YYYY-MM-dd hh:mm:ss";
	var o = {
		'M+': this.getMonth() + 1, // month
		'd+': this.getDate(), // day
		'h+': this.getHours(), // hour
		'm+': this.getMinutes(), // minute
		's+': this.getSeconds(), // second
		'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
		'S': this.getMilliseconds()
		// millisecond
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '')
				.substr(4 - RegExp.$1.length))
	}
	for (const k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k]
					: ('00' + o[k]).substr(('' + o[k]).length))
		}
	}
  return format
}
*/
