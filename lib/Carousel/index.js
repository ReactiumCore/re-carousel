"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _objectPath = _interopRequireDefault(require("object-path"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _TweenMax = require("gsap/umd/TweenMax");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * -----------------------------------------------------------------------------
 * React Component: Carousel
 * -----------------------------------------------------------------------------
 */
var Carousel =
/*#__PURE__*/
function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel(props) {
    var _this;

    _classCallCheck(this, Carousel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Carousel).call(this, props));
    var active = props.active,
        next = props.next,
        previous = props.previous,
        startIndex = props.startIndex,
        style = props.style;
    _this.slides = {};
    _this.state = {
      active: startIndex || active,
      next: next,
      previous: previous,
      style: style
    };
    _this.animating = false;
    _this.index = startIndex || active;
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onComplete = _this.onComplete.bind(_assertThisInitialized(_this));
    _this.onNext = _this.onNext.bind(_assertThisInitialized(_this));
    _this.onPrev = _this.onPrev.bind(_assertThisInitialized(_this));
    _this.next = _this.next.bind(_assertThisInitialized(_this));
    _this.prev = _this.prev.bind(_assertThisInitialized(_this));
    _this.jumpTo = _this.jumpTo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Carousel, [{
    key: "next",
    value: function next(_next) {
      var _this2 = this;

      if (this.animating === true) {
        return;
      }

      var _this$props = this.props,
          loop = _this$props.loop,
          speed = _this$props.speed;
      var max = Object.keys(this.slides).length - 1;
      var _this$state$active = this.state.active,
          active = _this$state$active === void 0 ? 0 : _this$state$active;
      _next = _next || active + 1;
      _next = loop === true && _next > max ? 0 : _next;

      if (_next > max && !loop) {
        return;
      }

      var currentSlide = _objectPath.default.get(this.slides, "slide-".concat(active, ".slide.current"));

      var nextSlide = _objectPath.default.get(this.slides, "slide-".concat(_next, ".slide.current"));

      this.animating = true;

      _TweenMax.TweenMax.set(currentSlide, {
        display: 'block'
      });

      _TweenMax.TweenMax.set(nextSlide, {
        display: 'block'
      });

      var evt = {
        active: active,
        next: _next,
        currentSlide: currentSlide,
        nextSlide: nextSlide
      };
      this.onNext(evt);
      var params = {
        onComplete: function onComplete() {
          _this2.onComplete(evt);
        }
      };
      var tl = new _TweenMax.TimelineMax(params);

      if (_next === 0) {
        tl.fromTo(currentSlide, speed, {
          xPercent: -100
        }, {
          xPercent: -200,
          ease: _TweenMax.Power2.easeInOut
        }, 0);
        tl.fromTo(nextSlide, speed, {
          xPercent: 100
        }, {
          xPercent: 0,
          ease: _TweenMax.Power2.easeInOut
        }, 0);
      } else {
        tl.fromTo(currentSlide, speed, {
          xPercent: 0
        }, {
          xPercent: -100,
          ease: _TweenMax.Power2.easeInOut
        }, 0);
        tl.fromTo(nextSlide, speed, {
          xPercent: 0
        }, {
          xPercent: -100,
          ease: _TweenMax.Power2.easeInOut
        }, 0);
      }
    }
  }, {
    key: "prev",
    value: function prev(next) {
      var _this3 = this;

      if (this.animating === true) {
        return;
      }

      var _this$props2 = this.props,
          loop = _this$props2.loop,
          speed = _this$props2.speed;
      var max = Object.keys(this.slides).length - 1;
      var _this$state$active2 = this.state.active,
          active = _this$state$active2 === void 0 ? 0 : _this$state$active2;
      next = next || active - 1;
      next = loop === true && next < 0 ? max : next;

      if (next < 0) {
        return;
      }

      this.animating = true;

      var currentSlide = _objectPath.default.get(this.slides, "slide-".concat(active, ".slide.current"));

      var nextSlide = _objectPath.default.get(this.slides, "slide-".concat(next, ".slide.current"));

      _TweenMax.TweenMax.set(currentSlide, {
        display: 'block',
        xPercent: -100
      });

      _TweenMax.TweenMax.set(nextSlide, {
        display: 'block'
      });

      var evt = {
        active: active,
        next: next,
        currentSlide: currentSlide,
        nextSlide: nextSlide
      };
      this.onPrev(evt);
      var params = {
        onComplete: function onComplete() {
          _this3.onComplete(evt);
        }
      };
      var tl = new _TweenMax.TimelineMax(params);

      if (next === max) {
        tl.fromTo(currentSlide, speed, {
          xPercent: 0
        }, {
          xPercent: 100,
          ease: _TweenMax.Power2.easeInOut
        }, 0);
        tl.fromTo(nextSlide, speed, {
          xPercent: -200
        }, {
          xPercent: -100,
          ease: _TweenMax.Power2.easeInOut
        }, 0);
      } else {
        tl.fromTo(currentSlide, speed, {
          xPercent: -100
        }, {
          xPercent: 0,
          ease: _TweenMax.Power2.easeInOut
        }, 0);
        tl.fromTo(nextSlide, speed, {
          xPercent: -100
        }, {
          xPercent: 0,
          ease: _TweenMax.Power2.easeInOut
        }, 0);
      }
    }
  }, {
    key: "jumpTo",
    value: function jumpTo(index) {
      var active = this.state.active;

      if (index === active) {
        return;
      }

      if (index < active) {
        this.prev(index);
      }

      if (index >= active) {
        this.next(index);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(evt) {
      var active = evt.active,
          next = evt.next,
          currentSlide = evt.currentSlide,
          nextSlide = evt.nextSlide;
      var onChange = this.props.onChange;
      this.index = next;

      if (typeof onChange === 'function') {
        onChange({
          previous: active,
          active: next,
          previousSlide: currentSlide,
          currentSlide: nextSlide
        });
      }
    }
  }, {
    key: "onComplete",
    value: function onComplete(evt) {
      var _this4 = this;

      var active = evt.active,
          next = evt.next,
          currentSlide = evt.currentSlide,
          nextSlide = evt.nextSlide;
      var _this$props3 = this.props,
          onChange = _this$props3.onChange,
          onComplete = _this$props3.onComplete;

      _TweenMax.TweenMax.set(nextSlide, {
        xPercent: 0,
        display: 'block'
      });

      this.animating = false;

      if (typeof onComplete === 'function') {
        onComplete({
          previous: active,
          active: next,
          previousSlide: currentSlide,
          currentSlide: nextSlide
        });
      }

      this.setState({
        active: next,
        next: null
      });
      setTimeout(function () {
        _this4.onChange(evt);
      }, 100);
    }
  }, {
    key: "onNext",
    value: function onNext(evt) {
      var onNext = this.props.onNext;

      if (typeof onNext === 'function') {
        onNext(evt);
      }
    }
  }, {
    key: "onPrev",
    value: function onPrev(evt) {
      var onPrev = this.props.onPrev;

      if (typeof onPrev === 'function') {
        onPrev(evt);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state = this.state,
          active = _this$state.active,
          next = _this$state.next,
          style = _this$state.style;
      var _this$props4 = this.props,
          children = _this$props4.children,
          defaultStyle = _this$props4.defaultStyle;
      style = _objectSpread({}, defaultStyle, style);
      return _react.default.createElement("div", {
        className: "carousel",
        style: style
      }, _react.default.Children.map(children, function (child, index) {
        return _react.default.cloneElement(child, {
          active: active,
          index: index,
          next: next,
          onComplete: _this5.onComplete,
          ref: function ref(slide) {
            _this5.slides["slide-".concat(index)] = slide;
          }
        });
      }));
    }
  }]);

  return Carousel;
}(_react.Component);

exports.default = Carousel;
Carousel.propTypes = {
  active: _propTypes.default.number,
  defaultStyle: _propTypes.default.object,
  loop: _propTypes.default.bool,
  next: _propTypes.default.number,
  onChange: _propTypes.default.func,
  onComplete: _propTypes.default.func,
  onNext: _propTypes.default.func,
  onPrev: _propTypes.default.func,
  previous: _propTypes.default.number,
  speed: _propTypes.default.number,
  startIndex: _propTypes.default.number,
  style: _propTypes.default.object
};
Carousel.defaultProps = {
  active: 0,
  defaultStyle: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'no-wrap',
    overflow: 'hidden',
    position: 'relative'
  },
  loop: false,
  next: null,
  onChange: null,
  onComplete: null,
  onNext: null,
  previous: null,
  speed: 0.25,
  startIndex: 0,
  style: {}
};