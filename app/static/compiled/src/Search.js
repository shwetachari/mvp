'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_Component) {
  _inherits(Search, _Component);

  function Search() {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

    _this.state = {
      value: ''
    };
    return _this;
  }

  _createClass(Search, [{
    key: 'fetch',
    value: function fetch(value, name) {
      $.ajax({
        url: 'http://127.0.0.1:3000/airlines?' + name + '=' + value,
        type: 'GET',
        'Content-Type': 'application/json',
        success: function success(res) {
          console.log(res);
        },
        error: function error() {
          console.log('error');
        }
      });
      // fetch(`http://127.0.0.1:3000/airlines?${name}=${value}`)
      //   .then(res => {
      //     return res.json();
      //   })
      //   .then(res => {
      //     console.log(res);
      //   });
    }
  }, {
    key: 'getValue',
    value: function getValue(event) {
      // this.setState({
      //   value: event.target.value
      // });
      this.fetch(event.target.value, event.target.name);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement('input', { name: 'airport', value: this.state.value, onChange: this.getValue.bind(this) }),
        React.createElement('input', { name: 'airline', value: this.state.value, onChange: this.getValue.bind(this) })
      );
    }
  }]);

  return Search;
}(Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZWFyY2guanN4Il0sIm5hbWVzIjpbIlNlYXJjaCIsInN0YXRlIiwidmFsdWUiLCJuYW1lIiwiJCIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImV2ZW50IiwiZmV0Y2giLCJ0YXJnZXQiLCJnZXRWYWx1ZSIsImJpbmQiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsTTs7O0FBQ0osb0JBQWM7QUFBQTs7QUFBQTs7QUFFWixVQUFLQyxLQUFMLEdBQWE7QUFDWEMsYUFBTztBQURJLEtBQWI7QUFGWTtBQUtiOzs7OzBCQUVLQSxLLEVBQU9DLEksRUFBTTtBQUNqQkMsUUFBRUMsSUFBRixDQUFPO0FBQ0xDLGlEQUF1Q0gsSUFBdkMsU0FBK0NELEtBRDFDO0FBRUxLLGNBQU0sS0FGRDtBQUdMLHdCQUFnQixrQkFIWDtBQUlMQyxpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCQyxrQkFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0QsU0FOSTtBQU9MRyxlQUFPLGlCQUFNO0FBQ1hGLGtCQUFRQyxHQUFSLENBQVksT0FBWjtBQUNEO0FBVEksT0FBUDtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7Ozs2QkFFUUUsSyxFQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsV0FBS0MsS0FBTCxDQUFXRCxNQUFNRSxNQUFOLENBQWFiLEtBQXhCLEVBQStCVyxNQUFNRSxNQUFOLENBQWFaLElBQTVDO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsdUNBQU8sTUFBSyxTQUFaLEVBQXNCLE9BQU8sS0FBS0YsS0FBTCxDQUFXQyxLQUF4QyxFQUErQyxVQUFVLEtBQUtjLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQixJQUFuQixDQUF6RCxHQURGO0FBRUUsdUNBQU8sTUFBSyxTQUFaLEVBQXNCLE9BQU8sS0FBS2hCLEtBQUwsQ0FBV0MsS0FBeEMsRUFBK0MsVUFBVSxLQUFLYyxRQUFMLENBQWNDLElBQWQsQ0FBbUIsSUFBbkIsQ0FBekQ7QUFGRixPQURGO0FBTUQ7Ozs7RUEzQ2tCQyxTIiwiZmlsZSI6IlNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNlYXJjaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGZldGNoKHZhbHVlLCBuYW1lKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogYGh0dHA6Ly8xMjcuMC4wLjE6MzAwMC9haXJsaW5lcz8ke25hbWV9PSR7dmFsdWV9YCxcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTozMDAwL2FpcmxpbmVzPyR7bmFtZX09JHt2YWx1ZX1gKVxuICAgIC8vICAgLnRoZW4ocmVzID0+IHtcbiAgICAvLyAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgLy8gICB9KVxuICAgIC8vICAgLnRoZW4ocmVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAvLyAgIH0pO1xuICB9XG5cbiAgZ2V0VmFsdWUoZXZlbnQpIHtcbiAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWVcbiAgICAvLyB9KTtcbiAgICB0aGlzLmZldGNoKGV2ZW50LnRhcmdldC52YWx1ZSwgZXZlbnQudGFyZ2V0Lm5hbWUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aW5wdXQgbmFtZT1cImFpcnBvcnRcIiB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMuZ2V0VmFsdWUuYmluZCh0aGlzKX0vPlxuICAgICAgICA8aW5wdXQgbmFtZT1cImFpcmxpbmVcIiB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMuZ2V0VmFsdWUuYmluZCh0aGlzKX0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG4iXX0=