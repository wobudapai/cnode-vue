function picker() {
  //if (_sington) return _sington;

  // 配置项
  var options = arguments[arguments.length - 1];
  var defaults = _util2.default.extend({
    id: 'default',
    className: '',
    onChange: _util2.default.noop,
    onConfirm: _util2.default.noop
  }, options);

  // 数据处理
  var items = void 0;
  var isMulti = false; // 是否多列的类型
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

  // 获取缓存
  temp[defaults.id] = temp[defaults.id] || [];
  var result = [];
  var lineTemp = temp[defaults.id];
  var $picker = (0, _util2.default)(_util2.default.render(_picker2.default, defaults));
  var depth = options.depth || (isMulti ? items.length : util.depthOf(items[0])),
    groups = '';

  // 显示与隐藏的方法
  function show() {
    (0, _util2.default)('body').append($picker);

    // 这里获取一下计算后的样式，强制触发渲染. fix IOS10下闪现的问题
    _util2.default.getStyle($picker[0], 'transform');

    $picker.find('.weui-mask').addClass('weui-animate-fade-in');
    $picker.find('.weui-picker').addClass('weui-animate-slide-up');
  }
  function _hide(callback) {
    _hide = _util2.default.noop; // 防止二次调用导致报错

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

  // 初始化滚动的方法
  function scroll(items, level) {
    if (lineTemp[level] === undefined && defaults.defaultValue && defaults.defaultValue[level] !== undefined) {
      // 没有缓存选项，而且存在defaultValue
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
        //为当前的result赋值。
        if (item) {
          result[level] = new Result(item);
        } else {
          result[level] = null;
        }
        lineTemp[level] = index;

        if (isMulti) {
          defaults.onChange(result);
        } else {
          /**
           * @子列表处理
           * 1. 在没有子列表，或者值列表的数组长度为0时，隐藏掉子列表。
           * 2. 滑动之后发现重新有子列表时，再次显示子列表。
           *
           * @回调处理
           * 1. 因为滑动实际上是一层一层传递的：父列表滚动完成之后，会call子列表的onChange，从而带动子列表的滑动。
           * 2. 所以，使用者的传进来onChange回调应该在最后一个子列表滑动时再call
           */
          if (item.children && item.children.length > 0) {
            $picker.find('.weui-picker__group').eq(level + 1).show();
            !isMulti && scroll(item.children, level + 1); // 不是多列的情况下才继续处理children
          } else {
            //如果子列表test不通过，子孙列表都隐藏。
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
