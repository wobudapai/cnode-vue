'use strict';

var _animate = require('./animate');

var _animate2 = _interopRequireDefault(_animate);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEMPLATE = '\n<div class="scroller-component" data-role="component">\n  <div class="scroller-mask" data-role="mask"></div>\n  <div class="scroller-indicator" data-role="indicator"></div>\n  <div class="scroller-content" data-role="content"></div>\n</div>\n';

var Scroller = function Scroller(container, options) {
  var self = this;

  options = options || {};

  self.options = {
    itemClass: 'scroller-item',
    onSelect: function onSelect() {},

    defaultValue: 0,
    data: []
  };

  for (var key in options) {
    if (options[key] !== undefined) {
      self.options[key] = options[key];
    }
  }

  self.__container = (0, _util.getElement)(container);

  var tempContainer = document.createElement('div');
  tempContainer.innerHTML = options.template || TEMPLATE;

  var component = self.__component = tempContainer.querySelector('[data-role=component]');
  var content = self.__content = component.querySelector('[data-role=content]');
  var indicator = component.querySelector('[data-role=indicator]');

  var data = self.options.data;
  var html = '';
  if (data.length && data[0].constructor === Object) {
    data.forEach(function (row) {
      html += '<div class="' + self.options.itemClass + '" data-value="' + row.value + '">' + row.name + '</div>';
    });
  } else {
    data.forEach(function (val) {
      html += '<div class="' + self.options.itemClass + '" data-value="' + val + '">' + val + '</div>';
    });
  }
  content.innerHTML = html;

  self.__container.appendChild(component);

  self.__itemHeight = parseInt((0, _util.getComputedStyle)(indicator, 'height'), 10);

  self.__callback = options.callback || function (top) {
    content.style.webkitTransform = 'translate3d(0, ' + -top + 'px, 0)';
  };

  var rect = component.getBoundingClientRect();

  self.__clientTop = rect.top + component.clientTop || 0;

  self.__setDimensions(component.clientHeight, content.offsetHeight);

  if (component.clientHeight === 0) {
    self.__setDimensions(parseInt((0, _util.getComputedStyle)(component, 'height'), 10), 204);
  }
  self.select(self.options.defaultValue, false);

  component.addEventListener('touchstart', function (e) {
    if (e.target.tagName.match(/input|textarea|select/i)) {
      return;
    }
    e.preventDefault();
    self.__doTouchStart(e.touches, e.timeStamp);
  }, false);

  component.addEventListener('touchmove', function (e) {
    self.__doTouchMove(e.touches, e.timeStamp);
  }, false);

  component.addEventListener('touchend', function (e) {
    self.__doTouchEnd(e.timeStamp);
  }, false);
};

var members = {
  value: null,
  __prevValue: null,
  __isSingleTouch: false,
  __isTracking: false,
  __didDecelerationComplete: false,
  __isGesturing: false,
  __isDragging: false,
  __isDecelerating: false,
  __isAnimating: false,
  __clientTop: 0,
  __clientHeight: 0,
  __contentHeight: 0,
  __itemHeight: 0,
  __scrollTop: 0,
  __minScrollTop: 0,
  __maxScrollTop: 0,
  __scheduledTop: 0,
  __lastTouchTop: null,
  __lastTouchMove: null,
  __positions: null,
  __minDecelerationScrollTop: null,
  __maxDecelerationScrollTop: null,
  __decelerationVelocityY: null,

  __setDimensions: function __setDimensions(clientHeight, contentHeight) {
    var self = this;

    self.__clientHeight = clientHeight;
    self.__contentHeight = contentHeight;

    var totalItemCount = self.options.data.length;
    var clientItemCount = Math.round(self.__clientHeight / self.__itemHeight);

    self.__minScrollTop = -self.__itemHeight * (clientItemCount / 2);
    self.__maxScrollTop = self.__minScrollTop + totalItemCount * self.__itemHeight - 0.1;
  },
  selectByIndex: function selectByIndex(index, animate) {
    var self = this;
    if (index < 0 || index > self.__content.childElementCount - 1) {
      return;
    }
    self.__scrollTop = self.__minScrollTop + index * self.__itemHeight;

    self.scrollTo(self.__scrollTop, animate);

    self.__selectItem(self.__content.children[index]);
  },
  select: function select(value, animate) {
    var self = this;

    var children = self.__content.children;
    for (var i = 0, len = children.length; i < len; i++) {
      if (children[i].dataset.value === value) {
        self.selectByIndex(i, animate);
        return;
      }
    }

    self.selectByIndex(0, animate);
  },
  getValue: function getValue() {
    return this.value;
  },
  scrollTo: function scrollTo(top, animate) {
    var self = this;

    animate = animate === undefined ? true : animate;

    if (self.__isDecelerating) {
      _animate2.default.stop(self.__isDecelerating);
      self.__isDecelerating = false;
    }

    top = Math.round(top / self.__itemHeight) * self.__itemHeight;
    top = Math.max(Math.min(self.__maxScrollTop, top), self.__minScrollTop);

    if (top === self.__scrollTop || !animate) {
      self.__publish(top);
      self.__scrollingComplete();
      return;
    }
    self.__publish(top, 250);
  },
  destroy: function destroy() {
    this.__component.parentNode && this.__component.parentNode.removeChild(this.__component);
  },
  __selectItem: function __selectItem(selectedItem) {
    var self = this;

    var selectedItemClass = self.options.itemClass + '-selected';
    var lastSelectedElem = self.__content.querySelector('.' + selectedItemClass);
    if (lastSelectedElem) {
      lastSelectedElem.classList.remove(selectedItemClass);
    }
    selectedItem.classList.add(selectedItemClass);

    if (self.value !== null) {
      self.__prevValue = self.value;
    }

    self.value = selectedItem.dataset.value;
  },
  __scrollingComplete: function __scrollingComplete() {
    var self = this;

    var index = Math.round((self.__scrollTop - self.__minScrollTop - self.__itemHeight / 2) / self.__itemHeight);

    self.__selectItem(self.__content.children[index]);

    if (self.__prevValue !== null && self.__prevValue !== self.value) {
      self.options.onSelect(self.value);
    }
  },
  __doTouchStart: function __doTouchStart(touches, timeStamp) {
    var self = this;

    if (touches.length == null) {
      throw new Error('Invalid touch list: ' + touches);
    }
    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf();
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp);
    }

    self.__interruptedAnimation = true;

    if (self.__isDecelerating) {
      _animate2.default.stop(self.__isDecelerating);
      self.__isDecelerating = false;
      self.__interruptedAnimation = true;
    }

    if (self.__isAnimating) {
      _animate2.default.stop(self.__isAnimating);
      self.__isAnimating = false;
      self.__interruptedAnimation = true;
    }

    var currentTouchTop;
    var isSingleTouch = touches.length === 1;
    if (isSingleTouch) {
      currentTouchTop = touches[0].pageY;
    } else {
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
    }

    self.__initialTouchTop = currentTouchTop;
    self.__lastTouchTop = currentTouchTop;
    self.__lastTouchMove = timeStamp;
    self.__lastScale = 1;
    self.__enableScrollY = !isSingleTouch;
    self.__isTracking = true;
    self.__didDecelerationComplete = false;
    self.__isDragging = !isSingleTouch;
    self.__isSingleTouch = isSingleTouch;
    self.__positions = [];
  },
  __doTouchMove: function __doTouchMove(touches, timeStamp, scale) {
    var self = this;

    if (touches.length == null) {
      throw new Error('Invalid touch list: ' + touches);
    }
    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf();
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp);
    }

    if (!self.__isTracking) {
      return;
    }

    var currentTouchTop;

    if (touches.length === 2) {
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
    } else {
      currentTouchTop = touches[0].pageY;
    }

    var positions = self.__positions;

    if (self.__isDragging) {
      var moveY = currentTouchTop - self.__lastTouchTop;
      var scrollTop = self.__scrollTop;

      if (self.__enableScrollY) {
        scrollTop -= moveY;

        var minScrollTop = self.__minScrollTop;
        var maxScrollTop = self.__maxScrollTop;

        if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
          if (scrollTop > maxScrollTop) {
            scrollTop = maxScrollTop;
          } else {
            scrollTop = minScrollTop;
          }
        }
      }

      if (positions.length > 40) {
        positions.splice(0, 20);
      }

      positions.push(scrollTop, timeStamp);

      self.__publish(scrollTop);
    } else {
      var minimumTrackingForScroll = 0;
      var minimumTrackingForDrag = 5;

      var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);

      self.__enableScrollY = distanceY >= minimumTrackingForScroll;

      positions.push(self.__scrollTop, timeStamp);

      self.__isDragging = self.__enableScrollY && distanceY >= minimumTrackingForDrag;

      if (self.__isDragging) {
        self.__interruptedAnimation = false;
      }
    }

    self.__lastTouchTop = currentTouchTop;
    self.__lastTouchMove = timeStamp;
    self.__lastScale = scale;
  },
  __doTouchEnd: function __doTouchEnd(timeStamp) {
    var self = this;

    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf();
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp);
    }

    if (!self.__isTracking) {
      return;
    }

    self.__isTracking = false;

    if (self.__isDragging) {
      self.__isDragging = false;

      if (self.__isSingleTouch && timeStamp - self.__lastTouchMove <= 100) {
        var positions = self.__positions;
        var endPos = positions.length - 1;
        var startPos = endPos;

        for (var i = endPos; i > 0 && positions[i] > self.__lastTouchMove - 100; i -= 2) {
          startPos = i;
        }

        if (startPos !== endPos) {
          var timeOffset = positions[endPos] - positions[startPos];
          var movedTop = self.__scrollTop - positions[startPos - 1];

          self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

          var minVelocityToStartDeceleration = 4;

          if (Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
            self.__startDeceleration(timeStamp);
          }
        }
      }
    }

    if (!self.__isDecelerating) {
      self.scrollTo(self.__scrollTop);
    }

    self.__positions.length = 0;
  },
  __publish: function __publish(top, animationDuration) {
    var self = this;

    var wasAnimating = self.__isAnimating;
    if (wasAnimating) {
      _animate2.default.stop(wasAnimating);
      self.__isAnimating = false;
    }

    if (animationDuration) {
      self.__scheduledTop = top;

      var oldTop = self.__scrollTop;
      var diffTop = top - oldTop;

      var step = function step(percent, now, render) {
        self.__scrollTop = oldTop + diffTop * percent;

        if (self.__callback) {
          self.__callback(self.__scrollTop);
        }
      };

      var verify = function verify(id) {
        return self.__isAnimating === id;
      };

      var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
        if (animationId === self.__isAnimating) {
          self.__isAnimating = false;
        }
        if (self.__didDecelerationComplete || wasFinished) {
          self.__scrollingComplete();
        }
      };

      self.__isAnimating = _animate2.default.start(step, verify, completed, animationDuration, wasAnimating ? _util.easeOutCubic : _util.easeInOutCubic);
    } else {
      self.__scheduledTop = self.__scrollTop = top;

      if (self.__callback) {
        self.__callback(top);
      }
    }
  },
  __startDeceleration: function __startDeceleration(timeStamp) {
    var self = this;

    self.__minDecelerationScrollTop = self.__minScrollTop;
    self.__maxDecelerationScrollTop = self.__maxScrollTop;

    var step = function step(percent, now, render) {
      self.__stepThroughDeceleration(render);
    };

    var minVelocityToKeepDecelerating = 0.5;

    var verify = function verify() {
      var shouldContinue = Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
      if (!shouldContinue) {
        self.__didDecelerationComplete = true;
      }
      return shouldContinue;
    };

    var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
      self.__isDecelerating = false;
      if (self.__scrollTop <= self.__minScrollTop || self.__scrollTop >= self.__maxScrollTop) {
        self.scrollTo(self.__scrollTop);
        return;
      }
      if (self.__didDecelerationComplete) {
        self.__scrollingComplete();
      }
    };

    self.__isDecelerating = _animate2.default.start(step, verify, completed);
  },
  __stepThroughDeceleration: function __stepThroughDeceleration(render) {
    var self = this;

    var scrollTop = self.__scrollTop + self.__decelerationVelocityY;

    var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
    if (scrollTopFixed !== scrollTop) {
      scrollTop = scrollTopFixed;
      self.__decelerationVelocityY = 0;
    }

    if (Math.abs(self.__decelerationVelocityY) <= 1) {
      if (Math.abs(scrollTop % self.__itemHeight) < 1) {
        self.__decelerationVelocityY = 0;
      }
    } else {
      self.__decelerationVelocityY *= 0.95;
    }

    self.__publish(scrollTop);
  }
};

for (var key in members) {
  Scroller.prototype[key] = members[key];
}

module.exports = Scroller;

//# sourceMappingURL=scroller-compiled.js.map