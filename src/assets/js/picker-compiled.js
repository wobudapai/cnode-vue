'use strict';

function picker() {
  var options = arguments[arguments.length - 1];
  var defaults = _util2.default.extend({
    id: 'default',
    className: '',
    onChange: _util2.default.noop,
    onConfirm: _util2.default.noop
  }, options);

  var items = void 0;
  var isMulti = false;
  if (arguments.length > 2) {
    var i = 0;
    items = [];
    while (i < arguments.length - 1) {
      items.push(arguments[i++]);
    }
    isMulti = true;
  } else {
    items = arguments[0];
  }

  temp[defaults.id] = temp[defaults.id] || [];
  var result = [];
  var lineTemp = temp[defaults.id];
  var $picker = (0, _util2.default)(_util2.default.render(_picker2.default, defaults));
  var depth = options.depth || (isMulti ? items.length : util.depthOf(items[0])),
      groups = '';

  function show() {
    (0, _util2.default)('body').append($picker);

    _util2.default.getStyle($picker[0], 'transform');

    $picker.find('.weui-mask').addClass('weui-animate-fade-in');
    $picker.find('.weui-picker').addClass('weui-animate-slide-up');
  }
  function _hide(callback) {
    _hide = _util2.default.noop;

    $picker.find('.weui-mask').addClass('weui-animate-fade-out');
    $picker.find('.weui-picker').addClass('weui-animate-slide-down').on('animationend webkitAnimationEnd', function () {
      $picker.remove();
      _sington = false;
      callback && callback();
    });
  }
  function hide(callback) {
    _hide(callback);
  }

  function scroll(items, level) {
    if (lineTemp[level] === undefined && defaults.defaultValue && defaults.defaultValue[level] !== undefined) {
      var defaultVal = defaults.defaultValue[level];
      var index = 0,
          len = items.length;

      for (; index < len; ++index) {
        if (defaultVal == items[index].value) break;
      }
      if (index < len) {
        lineTemp[level] = index;
      } else {
        console.warn('Picker has not match defaultValue: ' + defaultVal);
      }
    }
    $picker.find('.weui-picker__group').eq(level).scroll({
      items: items,
      temp: lineTemp[level],
      onChange: function onChange(item, index) {
        if (item) {
          result[level] = new Result(item);
        } else {
          result[level] = null;
        }
        lineTemp[level] = index;

        if (isMulti) {
          defaults.onChange(result);
        } else {
          if (item.children && item.children.length > 0) {
            $picker.find('.weui-picker__group').eq(level + 1).show();
            !isMulti && scroll(item.children, level + 1);
          } else {
            var $items = $picker.find('.weui-picker__group');
            $items.forEach(function (ele, index) {
              if (index > level) {
                (0, _util2.default)(ele).hide();
              }
            });

            result.splice(level + 1);

            defaults.onChange(result);
          }
        }
      },
      onConfirm: defaults.onConfirm
    });
  }

  while (depth--) {
    groups += _group2.default;
  }

  $picker.find('.weui-picker__bd').html(groups);
  show();

  if (isMulti) {
    items.forEach(function (item, index) {
      scroll(item, index);
    });
  } else {
    scroll(items, 0);
  }

  $picker.on('click', '.weui-mask', function () {
    hide();
  }).on('click', '.weui-picker__action', function () {
    hide();
  }).on('click', '#weui-picker-confirm', function () {
    defaults.onConfirm(result);
  });

  _sington = $picker[0];
  _sington.hide = hide;
  return _sington;
}

//# sourceMappingURL=picker-compiled.js.map