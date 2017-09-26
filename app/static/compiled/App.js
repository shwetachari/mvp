'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      active: [],
      airline: '',
      airport: '',
      airlineName: '',
      airportName: '',
      statistics: {}
    };
    return _this;
  }

  _createClass(App, [{
    key: 'updateStats',
    value: function updateStats() {
      var _this2 = this;

      var genAve = function genAve(path, total) {
        return (_this2.state.active.reduce(function (sum, obj) {
          sum += Number(obj.statistics.flights[path]);
          return sum;
        }, 0) / total * 100).toPrecision(3);
      };

      var totalFlights = genAve('total', 1) / 100;

      var newStats = {
        aveCancelled: genAve('cancelled', totalFlights),
        aveOnTime: genAve('on time', totalFlights),
        aveDelayed: genAve('delayed', totalFlights),
        aveDiverted: genAve('diverted', totalFlights)
      };

      this.setState({
        statistics: newStats
      });
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this3 = this;

      $.ajax({
        url: 'http://127.0.0.1:3000/flightdata?airport=' + this.state.airport + '&airline=' + this.state.airline,
        type: 'GET',
        'Content-Type': 'application/json',
        success: function success(res) {
          _this3.setState({
            active: res
          });
          _this3.updateStats.call(_this3);
        },
        error: function error() {
          console.log('error');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'App' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'h2',
            null,
            'Flight Delays'
          )
        ),
        React.createElement(
          'div',
          { className: 'instructions' },
          React.createElement(
            'p',
            null,
            'Instructions to use the app go here!'
          )
        ),
        React.createElement(Search, { airline: this.state.airline, airport: this.state.airport, parent: this, getData: this.getData.bind(this) }),
        React.createElement(Data, { data: this.state.active, airline: this.state.airline, airport: this.state.airport, airlineName: this.state.airlineName, airportName: this.state.airportName, statistics: this.state.statistics })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsInN0YXRlIiwiYWN0aXZlIiwiYWlybGluZSIsImFpcnBvcnQiLCJhaXJsaW5lTmFtZSIsImFpcnBvcnROYW1lIiwic3RhdGlzdGljcyIsImdlbkF2ZSIsInBhdGgiLCJ0b3RhbCIsInJlZHVjZSIsInN1bSIsIm9iaiIsIk51bWJlciIsImZsaWdodHMiLCJ0b1ByZWNpc2lvbiIsInRvdGFsRmxpZ2h0cyIsIm5ld1N0YXRzIiwiYXZlQ2FuY2VsbGVkIiwiYXZlT25UaW1lIiwiYXZlRGVsYXllZCIsImF2ZURpdmVydGVkIiwic2V0U3RhdGUiLCIkIiwiYWpheCIsInVybCIsInR5cGUiLCJzdWNjZXNzIiwicmVzIiwidXBkYXRlU3RhdHMiLCJjYWxsIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiZ2V0RGF0YSIsImJpbmQiLCJSZWFjdCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7QUFDSixpQkFBYztBQUFBOztBQUFBOztBQUVaLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxjQUFRLEVBREc7QUFFWEMsZUFBUyxFQUZFO0FBR1hDLGVBQVMsRUFIRTtBQUlYQyxtQkFBYSxFQUpGO0FBS1hDLG1CQUFhLEVBTEY7QUFNWEMsa0JBQVk7QUFORCxLQUFiO0FBRlk7QUFVYjs7OztrQ0FFYTtBQUFBOztBQUNaLFVBQUlDLFNBQVMsU0FBVEEsTUFBUyxDQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBaUI7QUFDNUIsZUFBTyxDQUFFLE9BQUtULEtBQUwsQ0FBV0MsTUFBWCxDQUFrQlMsTUFBbEIsQ0FBeUIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDOUNELGlCQUFPRSxPQUFPRCxJQUFJTixVQUFKLENBQWVRLE9BQWYsQ0FBdUJOLElBQXZCLENBQVAsQ0FBUDtBQUNBLGlCQUFPRyxHQUFQO0FBQ0QsU0FIUSxFQUdOLENBSE0sSUFHREYsS0FIQSxHQUdTLEdBSFYsRUFHZU0sV0FIZixDQUcyQixDQUgzQixDQUFQO0FBSUQsT0FMRDs7QUFPQSxVQUFJQyxlQUFlVCxPQUFPLE9BQVAsRUFBZ0IsQ0FBaEIsSUFBcUIsR0FBeEM7O0FBRUEsVUFBSVUsV0FBVztBQUNiQyxzQkFBY1gsT0FBTyxXQUFQLEVBQW9CUyxZQUFwQixDQUREO0FBRWJHLG1CQUFXWixPQUFPLFNBQVAsRUFBa0JTLFlBQWxCLENBRkU7QUFHYkksb0JBQVliLE9BQU8sU0FBUCxFQUFrQlMsWUFBbEIsQ0FIQztBQUliSyxxQkFBYWQsT0FBTyxVQUFQLEVBQW1CUyxZQUFuQjtBQUpBLE9BQWY7O0FBT0EsV0FBS00sUUFBTCxDQUFjO0FBQ1poQixvQkFBWVc7QUFEQSxPQUFkO0FBR0Q7Ozs4QkFFUztBQUFBOztBQUNSTSxRQUFFQyxJQUFGLENBQU87QUFDTEMsMkRBQWlELEtBQUt6QixLQUFMLENBQVdHLE9BQTVELGlCQUErRSxLQUFLSCxLQUFMLENBQVdFLE9BRHJGO0FBRUx3QixjQUFNLEtBRkQ7QUFHTCx3QkFBZ0Isa0JBSFg7QUFJTEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixpQkFBS04sUUFBTCxDQUFjO0FBQ1pyQixvQkFBUTJCO0FBREksV0FBZDtBQUdBLGlCQUFLQyxXQUFMLENBQWlCQyxJQUFqQjtBQUNELFNBVEk7QUFVTEMsZUFBTyxpQkFBTTtBQUNYQyxrQkFBUUMsR0FBUixDQUFZLE9BQVo7QUFDRDtBQVpJLE9BQVA7QUFjRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREYsU0FERjtBQUlFO0FBQUE7QUFBQSxZQUFLLFdBQVUsY0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixTQUpGO0FBU0UsNEJBQUMsTUFBRCxJQUFRLFNBQVMsS0FBS2pDLEtBQUwsQ0FBV0UsT0FBNUIsRUFBcUMsU0FBUyxLQUFLRixLQUFMLENBQVdHLE9BQXpELEVBQWtFLFFBQVEsSUFBMUUsRUFBZ0YsU0FBUyxLQUFLK0IsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQXpGLEdBVEY7QUFVRSw0QkFBQyxJQUFELElBQU0sTUFBTSxLQUFLbkMsS0FBTCxDQUFXQyxNQUF2QixFQUErQixTQUFTLEtBQUtELEtBQUwsQ0FBV0UsT0FBbkQsRUFBNEQsU0FBUyxLQUFLRixLQUFMLENBQVdHLE9BQWhGLEVBQXlGLGFBQWEsS0FBS0gsS0FBTCxDQUFXSSxXQUFqSCxFQUE4SCxhQUFhLEtBQUtKLEtBQUwsQ0FBV0ssV0FBdEosRUFBbUssWUFBWSxLQUFLTCxLQUFMLENBQVdNLFVBQTFMO0FBVkYsT0FERjtBQWNEOzs7O0VBbkVlOEIsTUFBTUMsUzs7QUFzRXhCQyxTQUFTQyxNQUFULENBQWdCLG9CQUFDLEdBQUQsT0FBaEIsRUFBeUJDLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBekIiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlOiBbXSxcbiAgICAgIGFpcmxpbmU6ICcnLFxuICAgICAgYWlycG9ydDogJycsXG4gICAgICBhaXJsaW5lTmFtZTogJycsXG4gICAgICBhaXJwb3J0TmFtZTogJycsXG4gICAgICBzdGF0aXN0aWNzOiB7fVxuICAgIH07XG4gIH1cblxuICB1cGRhdGVTdGF0cygpIHtcbiAgICBsZXQgZ2VuQXZlID0gKHBhdGgsIHRvdGFsKSA9PiB7XG4gICAgICByZXR1cm4gKCh0aGlzLnN0YXRlLmFjdGl2ZS5yZWR1Y2UoKHN1bSwgb2JqKSA9PiB7XG4gICAgICAgIHN1bSArPSBOdW1iZXIob2JqLnN0YXRpc3RpY3MuZmxpZ2h0c1twYXRoXSk7XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgICB9LCAwKSAvIHRvdGFsKSAqIDEwMCkudG9QcmVjaXNpb24oMyk7XG4gICAgfVxuXG4gICAgdmFyIHRvdGFsRmxpZ2h0cyA9IGdlbkF2ZSgndG90YWwnLCAxKSAvIDEwMDtcblxuICAgIGxldCBuZXdTdGF0cyA9IHtcbiAgICAgIGF2ZUNhbmNlbGxlZDogZ2VuQXZlKCdjYW5jZWxsZWQnLCB0b3RhbEZsaWdodHMpLFxuICAgICAgYXZlT25UaW1lOiBnZW5BdmUoJ29uIHRpbWUnLCB0b3RhbEZsaWdodHMpLFxuICAgICAgYXZlRGVsYXllZDogZ2VuQXZlKCdkZWxheWVkJywgdG90YWxGbGlnaHRzKSxcbiAgICAgIGF2ZURpdmVydGVkOiBnZW5BdmUoJ2RpdmVydGVkJywgdG90YWxGbGlnaHRzKVxuICAgIH07XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN0YXRpc3RpY3M6IG5ld1N0YXRzXG4gICAgfSk7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IGBodHRwOi8vMTI3LjAuMC4xOjMwMDAvZmxpZ2h0ZGF0YT9haXJwb3J0PSR7dGhpcy5zdGF0ZS5haXJwb3J0fSZhaXJsaW5lPSR7dGhpcy5zdGF0ZS5haXJsaW5lfWAsXG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGFjdGl2ZTogcmVzXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRzLmNhbGwodGhpcyk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXBwXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgyPkZsaWdodCBEZWxheXM8L2gyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnN0cnVjdGlvbnNcIj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIEluc3RydWN0aW9ucyB0byB1c2UgdGhlIGFwcCBnbyBoZXJlIVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZWFyY2ggYWlybGluZT17dGhpcy5zdGF0ZS5haXJsaW5lfSBhaXJwb3J0PXt0aGlzLnN0YXRlLmFpcnBvcnR9IHBhcmVudD17dGhpc30gZ2V0RGF0YT17dGhpcy5nZXREYXRhLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgPERhdGEgZGF0YT17dGhpcy5zdGF0ZS5hY3RpdmV9IGFpcmxpbmU9e3RoaXMuc3RhdGUuYWlybGluZX0gYWlycG9ydD17dGhpcy5zdGF0ZS5haXJwb3J0fSBhaXJsaW5lTmFtZT17dGhpcy5zdGF0ZS5haXJsaW5lTmFtZX0gYWlycG9ydE5hbWU9e3RoaXMuc3RhdGUuYWlycG9ydE5hbWV9IHN0YXRpc3RpY3M9e3RoaXMuc3RhdGUuc3RhdGlzdGljc30vPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG4iXX0=