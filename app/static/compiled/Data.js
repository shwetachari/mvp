'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Data = function (_React$Component) {
  _inherits(Data, _React$Component);

  function Data(props) {
    _classCallCheck(this, Data);

    return _possibleConstructorReturn(this, (Data.__proto__ || Object.getPrototypeOf(Data)).call(this, props));
  }

  _createClass(Data, [{
    key: 'genAve',
    value: function genAve(path) {
      return Math.round(this.props.data.reduce(function (sum, obj) {
        sum += Number(obj.path);
        return sum;
      }, 0) / this.props.data.length);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'summary-stats' },
          React.createElement(
            'h2',
            null,
            'Summary Statistics'
          ),
          React.createElement(
            'h3',
            null,
            this.props.airport ? this.props.airport : '',
            ' ',
            this.props.airportName ? '(' + this.props.airportName + ')' : ''
          ),
          React.createElement(
            'h3',
            null,
            this.props.airline ? this.props.airline : '',
            ' ',
            this.props.airlineName ? '(' + this.props.airlineName + ')' : ''
          ),
          React.createElement(
            'div',
            null,
            'Percent of Flights On Time: ',
            this.props.statistics.aveOnTime || 0,
            '%'
          ),
          React.createElement(
            'div',
            null,
            'Percent of Flights Cancelled: ',
            this.props.statistics.aveCancelled || 0,
            '%'
          ),
          React.createElement(
            'div',
            null,
            'Percent of Flights Delayed: ',
            this.props.statistics.aveDelayed || 0,
            '%'
          ),
          React.createElement(
            'div',
            null,
            'Percent of Flights Diverted: ',
            this.props.statistics.aveDiverted || 0,
            '%'
          )
        ),
        React.createElement('div', { id: 'data' })
      );
    }
  }]);

  return Data;
}(React.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRhLmpzeCJdLCJuYW1lcyI6WyJEYXRhIiwicHJvcHMiLCJwYXRoIiwiTWF0aCIsInJvdW5kIiwiZGF0YSIsInJlZHVjZSIsInN1bSIsIm9iaiIsIk51bWJlciIsImxlbmd0aCIsImFpcnBvcnQiLCJhaXJwb3J0TmFtZSIsImFpcmxpbmUiLCJhaXJsaW5lTmFtZSIsInN0YXRpc3RpY3MiLCJhdmVPblRpbWUiLCJhdmVDYW5jZWxsZWQiLCJhdmVEZWxheWVkIiwiYXZlRGl2ZXJ0ZWQiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxJOzs7QUFDSixnQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHVHQUNYQSxLQURXO0FBRWxCOzs7OzJCQUVNQyxJLEVBQU07QUFDWCxhQUFPQyxLQUFLQyxLQUFMLENBQVcsS0FBS0gsS0FBTCxDQUFXSSxJQUFYLENBQWdCQyxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNyREQsZUFBT0UsT0FBT0QsSUFBSU4sSUFBWCxDQUFQO0FBQ0EsZUFBT0ssR0FBUDtBQUNELE9BSGlCLEVBR2YsQ0FIZSxJQUdWLEtBQUtOLEtBQUwsQ0FBV0ksSUFBWCxDQUFnQkssTUFIakIsQ0FBUDtBQUlEOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsZUFBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQTtBQUNHLGlCQUFLVCxLQUFMLENBQVdVLE9BQVgsR0FBcUIsS0FBS1YsS0FBTCxDQUFXVSxPQUFoQyxHQUEwQyxFQUQ3QztBQUFBO0FBQ2tELGlCQUFLVixLQUFMLENBQVdXLFdBQVgsU0FBNkIsS0FBS1gsS0FBTCxDQUFXVyxXQUF4QyxTQUF5RDtBQUQzRyxXQUZGO0FBS0U7QUFBQTtBQUFBO0FBQ0csaUJBQUtYLEtBQUwsQ0FBV1ksT0FBWCxHQUFxQixLQUFLWixLQUFMLENBQVdZLE9BQWhDLEdBQTBDLEVBRDdDO0FBQUE7QUFDa0QsaUJBQUtaLEtBQUwsQ0FBV2EsV0FBWCxTQUE2QixLQUFLYixLQUFMLENBQVdhLFdBQXhDLFNBQXlEO0FBRDNHLFdBTEY7QUFTRTtBQUFBO0FBQUE7QUFBQTtBQUFrQyxpQkFBS2IsS0FBTCxDQUFXYyxVQUFYLENBQXNCQyxTQUF0QixJQUFtQyxDQUFyRTtBQUFBO0FBQUEsV0FURjtBQVVFO0FBQUE7QUFBQTtBQUFBO0FBQW9DLGlCQUFLZixLQUFMLENBQVdjLFVBQVgsQ0FBc0JFLFlBQXRCLElBQXNDLENBQTFFO0FBQUE7QUFBQSxXQVZGO0FBV0U7QUFBQTtBQUFBO0FBQUE7QUFBa0MsaUJBQUtoQixLQUFMLENBQVdjLFVBQVgsQ0FBc0JHLFVBQXRCLElBQW9DLENBQXRFO0FBQUE7QUFBQSxXQVhGO0FBWUU7QUFBQTtBQUFBO0FBQUE7QUFBbUMsaUJBQUtqQixLQUFMLENBQVdjLFVBQVgsQ0FBc0JJLFdBQXRCLElBQXFDLENBQXhFO0FBQUE7QUFBQTtBQVpGLFNBREY7QUFnQkUscUNBQUssSUFBRyxNQUFSO0FBaEJGLE9BREY7QUF1QkQ7Ozs7RUFwQ2dCQyxNQUFNQyxTIiwiZmlsZSI6IkRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEYXRhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBnZW5BdmUocGF0aCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHRoaXMucHJvcHMuZGF0YS5yZWR1Y2UoKHN1bSwgb2JqKSA9PiB7XG4gICAgICBzdW0gKz0gTnVtYmVyKG9iai5wYXRoKTtcbiAgICAgIHJldHVybiBzdW07XG4gICAgfSwgMCkgLyB0aGlzLnByb3BzLmRhdGEubGVuZ3RoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdW1tYXJ5LXN0YXRzXCI+XG4gICAgICAgICAgPGgyPlN1bW1hcnkgU3RhdGlzdGljczwvaDI+XG4gICAgICAgICAgPGgzPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuYWlycG9ydCA/IHRoaXMucHJvcHMuYWlycG9ydCA6ICcnfSB7dGhpcy5wcm9wcy5haXJwb3J0TmFtZSA/IGAoJHt0aGlzLnByb3BzLmFpcnBvcnROYW1lfSlgIDogJyd9XG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8aDM+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5haXJsaW5lID8gdGhpcy5wcm9wcy5haXJsaW5lIDogJyd9IHt0aGlzLnByb3BzLmFpcmxpbmVOYW1lID8gYCgke3RoaXMucHJvcHMuYWlybGluZU5hbWV9KWAgOiAnJ31cbiAgICAgICAgICA8L2gzPlxuXG4gICAgICAgICAgPGRpdj5QZXJjZW50IG9mIEZsaWdodHMgT24gVGltZToge3RoaXMucHJvcHMuc3RhdGlzdGljcy5hdmVPblRpbWUgfHwgMH0lPC9kaXY+XG4gICAgICAgICAgPGRpdj5QZXJjZW50IG9mIEZsaWdodHMgQ2FuY2VsbGVkOiB7dGhpcy5wcm9wcy5zdGF0aXN0aWNzLmF2ZUNhbmNlbGxlZCB8fCAwfSU8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlBlcmNlbnQgb2YgRmxpZ2h0cyBEZWxheWVkOiB7dGhpcy5wcm9wcy5zdGF0aXN0aWNzLmF2ZURlbGF5ZWQgfHwgMH0lPC9kaXY+XG4gICAgICAgICAgPGRpdj5QZXJjZW50IG9mIEZsaWdodHMgRGl2ZXJ0ZWQ6IHt0aGlzLnByb3BzLnN0YXRpc3RpY3MuYXZlRGl2ZXJ0ZWQgfHwgMH0lPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgaWQ9XCJkYXRhXCI+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==