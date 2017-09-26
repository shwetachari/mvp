'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.state = {
      options: []
    };
    return _this;
  }

  _createClass(Search, [{
    key: 'select',
    value: function select(query, event) {
      var _setState;

      this.setState((_setState = {}, _defineProperty(_setState, query, JSON.parse(event.target.value)[0]), _defineProperty(_setState, query + 'Name', JSON.parse(event.target.value)[1]), _setState));
    }
  }, {
    key: 'fetch',
    value: function fetch(value, name) {
      var _this2 = this;

      $.ajax({
        url: 'http://127.0.0.1:3000/airlines?' + name + '=' + value,
        type: 'GET',
        'Content-Type': 'application/json',
        success: function success(res) {
          // render top 25 in select list
          _this2.setState({
            options: res
          });
        },
        error: function error() {
          console.log('error');
        }
      });
    }
  }, {
    key: 'getValue',
    value: function getValue(event) {
      this.fetch(event.target.value, event.target.name);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'col-xs-12' },
          React.createElement(
            'label',
            null,
            'Enter Airport Code or Name'
          ),
          React.createElement('input', { name: 'airport', onChange: this.getValue.bind(this) }),
          React.createElement(
            'label',
            null,
            'Enter Airline Code or Name'
          ),
          React.createElement('input', { name: 'airline', onChange: this.getValue.bind(this) })
        ),
        React.createElement(
          'div',
          { className: 'col-xs-12' },
          React.createElement(
            'select',
            { value: this.state.value, onChange: this.select.bind(this.props.parent, 'airport') },
            React.createElement(
              'option',
              { value: ['', ''] },
              'Select an Airport'
            ),
            this.state.options.map(function (airport, i) {
              return React.createElement(
                'option',
                { key: i, value: JSON.stringify([airport.airport.code, airport.airport.name]) },
                airport.airport.name,
                '(',
                airport.airport.code,
                ')'
              );
            })
          ),
          React.createElement(
            'select',
            { value: this.state.value, onChange: this.select.bind(this.props.parent, 'airline') },
            React.createElement(
              'option',
              { value: ['', ''] },
              'Select an Airline'
            ),
            this.state.options.map(function (airline, i) {
              return React.createElement(
                'option',
                { key: i, value: JSON.stringify([airline.carrier.code, airline.carrier.name]) },
                airline.carrier.name,
                '(',
                airline.carrier.code,
                ')'
              );
            })
          )
        ),
        React.createElement(
          'button',
          { onClick: this.props.getData },
          'Search'
        )
      );
    }
  }]);

  return Search;
}(React.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZWFyY2guanN4Il0sIm5hbWVzIjpbIlNlYXJjaCIsInByb3BzIiwic3RhdGUiLCJvcHRpb25zIiwicXVlcnkiLCJldmVudCIsInNldFN0YXRlIiwiSlNPTiIsInBhcnNlIiwidGFyZ2V0IiwidmFsdWUiLCJuYW1lIiwiJCIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwic3VjY2VzcyIsInJlcyIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImZldGNoIiwiZ2V0VmFsdWUiLCJiaW5kIiwic2VsZWN0IiwicGFyZW50IiwibWFwIiwiYWlycG9ydCIsImkiLCJzdHJpbmdpZnkiLCJjb2RlIiwiYWlybGluZSIsImNhcnJpZXIiLCJnZXREYXRhIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFNQSxNOzs7QUFDSixrQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGdIQUNYQSxLQURXOztBQUVqQixVQUFLQyxLQUFMLEdBQWE7QUFDWEMsZUFBUztBQURFLEtBQWI7QUFGaUI7QUFLbEI7Ozs7MkJBRU1DLEssRUFBT0MsSyxFQUFPO0FBQUE7O0FBQ25CLFdBQUtDLFFBQUwsNkNBQ0dGLEtBREgsRUFDV0csS0FBS0MsS0FBTCxDQUFXSCxNQUFNSSxNQUFOLENBQWFDLEtBQXhCLEVBQStCLENBQS9CLENBRFgsOEJBRUdOLFFBQVEsTUFGWCxFQUVvQkcsS0FBS0MsS0FBTCxDQUFXSCxNQUFNSSxNQUFOLENBQWFDLEtBQXhCLEVBQStCLENBQS9CLENBRnBCO0FBSUQ7OzswQkFFS0EsSyxFQUFPQyxJLEVBQU07QUFBQTs7QUFDakJDLFFBQUVDLElBQUYsQ0FBTztBQUNMQyxpREFBdUNILElBQXZDLFNBQStDRCxLQUQxQztBQUVMSyxjQUFNLEtBRkQ7QUFHTCx3QkFBZ0Isa0JBSFg7QUFJTEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQjtBQUNBLGlCQUFLWCxRQUFMLENBQWM7QUFDWkgscUJBQVNjO0FBREcsV0FBZDtBQUdELFNBVEk7QUFVTEMsZUFBTyxpQkFBTTtBQUNYQyxrQkFBUUMsR0FBUixDQUFZLE9BQVo7QUFDRDtBQVpJLE9BQVA7QUFjRDs7OzZCQUVRZixLLEVBQU87QUFDZCxXQUFLZ0IsS0FBTCxDQUFXaEIsTUFBTUksTUFBTixDQUFhQyxLQUF4QixFQUErQkwsTUFBTUksTUFBTixDQUFhRSxJQUE1QztBQUNEOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsV0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERjtBQUVFLHlDQUFPLE1BQUssU0FBWixFQUFzQixVQUFVLEtBQUtXLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQixJQUFuQixDQUFoQyxHQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUhGO0FBSUUseUNBQU8sTUFBSyxTQUFaLEVBQXNCLFVBQVUsS0FBS0QsUUFBTCxDQUFjQyxJQUFkLENBQW1CLElBQW5CLENBQWhDO0FBSkYsU0FERjtBQVFFO0FBQUE7QUFBQSxZQUFLLFdBQVUsV0FBZjtBQUNFO0FBQUE7QUFBQSxjQUFRLE9BQU8sS0FBS3JCLEtBQUwsQ0FBV1EsS0FBMUIsRUFBaUMsVUFBVSxLQUFLYyxNQUFMLENBQVlELElBQVosQ0FBaUIsS0FBS3RCLEtBQUwsQ0FBV3dCLE1BQTVCLEVBQW9DLFNBQXBDLENBQTNDO0FBQ0U7QUFBQTtBQUFBLGdCQUFRLE9BQU8sQ0FBQyxFQUFELEVBQUssRUFBTCxDQUFmO0FBQUE7QUFBQSxhQURGO0FBRUcsaUJBQUt2QixLQUFMLENBQVdDLE9BQVgsQ0FBbUJ1QixHQUFuQixDQUF1QixVQUFDQyxPQUFELEVBQVVDLENBQVYsRUFBZ0I7QUFDdEMscUJBQVE7QUFBQTtBQUFBLGtCQUFRLEtBQUtBLENBQWIsRUFBZ0IsT0FBT3JCLEtBQUtzQixTQUFMLENBQWUsQ0FBQ0YsUUFBUUEsT0FBUixDQUFnQkcsSUFBakIsRUFBdUJILFFBQVFBLE9BQVIsQ0FBZ0JoQixJQUF2QyxDQUFmLENBQXZCO0FBQXNGZ0Isd0JBQVFBLE9BQVIsQ0FBZ0JoQixJQUF0RztBQUFBO0FBQTZHZ0Isd0JBQVFBLE9BQVIsQ0FBZ0JHLElBQTdIO0FBQUE7QUFBQSxlQUFSO0FBQ0QsYUFGQTtBQUZILFdBREY7QUFPRTtBQUFBO0FBQUEsY0FBUSxPQUFPLEtBQUs1QixLQUFMLENBQVdRLEtBQTFCLEVBQWlDLFVBQVUsS0FBS2MsTUFBTCxDQUFZRCxJQUFaLENBQWlCLEtBQUt0QixLQUFMLENBQVd3QixNQUE1QixFQUFvQyxTQUFwQyxDQUEzQztBQUNFO0FBQUE7QUFBQSxnQkFBUSxPQUFPLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBZjtBQUFBO0FBQUEsYUFERjtBQUVHLGlCQUFLdkIsS0FBTCxDQUFXQyxPQUFYLENBQW1CdUIsR0FBbkIsQ0FBdUIsVUFBQ0ssT0FBRCxFQUFVSCxDQUFWLEVBQWdCO0FBQ3RDLHFCQUFRO0FBQUE7QUFBQSxrQkFBUSxLQUFLQSxDQUFiLEVBQWdCLE9BQU9yQixLQUFLc0IsU0FBTCxDQUFlLENBQUNFLFFBQVFDLE9BQVIsQ0FBZ0JGLElBQWpCLEVBQXVCQyxRQUFRQyxPQUFSLENBQWdCckIsSUFBdkMsQ0FBZixDQUF2QjtBQUFzRm9CLHdCQUFRQyxPQUFSLENBQWdCckIsSUFBdEc7QUFBQTtBQUE2R29CLHdCQUFRQyxPQUFSLENBQWdCRixJQUE3SDtBQUFBO0FBQUEsZUFBUjtBQUNELGFBRkE7QUFGSDtBQVBGLFNBUkY7QUF1QkU7QUFBQTtBQUFBLFlBQVEsU0FBUyxLQUFLN0IsS0FBTCxDQUFXZ0MsT0FBNUI7QUFBQTtBQUFBO0FBdkJGLE9BREY7QUEyQkQ7Ozs7RUFoRWtCQyxNQUFNQyxTIiwiZmlsZSI6IlNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBvcHRpb25zOiBbXVxuICAgIH07XG4gIH1cblxuICBzZWxlY3QocXVlcnksIGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBbcXVlcnldOiBKU09OLnBhcnNlKGV2ZW50LnRhcmdldC52YWx1ZSlbMF0sXG4gICAgICBbcXVlcnkgKyAnTmFtZSddOiBKU09OLnBhcnNlKGV2ZW50LnRhcmdldC52YWx1ZSlbMV1cbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoKHZhbHVlLCBuYW1lKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogYGh0dHA6Ly8xMjcuMC4wLjE6MzAwMC9haXJsaW5lcz8ke25hbWV9PSR7dmFsdWV9YCxcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgLy8gcmVuZGVyIHRvcCAyNSBpbiBzZWxlY3QgbGlzdFxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBvcHRpb25zOiByZXNcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5mZXRjaChldmVudC50YXJnZXQudmFsdWUsIGV2ZW50LnRhcmdldC5uYW1lKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cbiAgICAgICAgICA8bGFiZWw+RW50ZXIgQWlycG9ydCBDb2RlIG9yIE5hbWU8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwiYWlycG9ydFwiIG9uQ2hhbmdlPXt0aGlzLmdldFZhbHVlLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICA8bGFiZWw+RW50ZXIgQWlybGluZSBDb2RlIG9yIE5hbWU8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwiYWlybGluZVwiIG9uQ2hhbmdlPXt0aGlzLmdldFZhbHVlLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cbiAgICAgICAgICA8c2VsZWN0IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBvbkNoYW5nZT17dGhpcy5zZWxlY3QuYmluZCh0aGlzLnByb3BzLnBhcmVudCwgJ2FpcnBvcnQnKX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtbJycsICcnXX0+U2VsZWN0IGFuIEFpcnBvcnQ8L29wdGlvbj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLm9wdGlvbnMubWFwKChhaXJwb3J0LCBpKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtKU09OLnN0cmluZ2lmeShbYWlycG9ydC5haXJwb3J0LmNvZGUsIGFpcnBvcnQuYWlycG9ydC5uYW1lXSl9PnthaXJwb3J0LmFpcnBvcnQubmFtZX0oe2FpcnBvcnQuYWlycG9ydC5jb2RlfSk8L29wdGlvbj4pO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMuc2VsZWN0LmJpbmQodGhpcy5wcm9wcy5wYXJlbnQsICdhaXJsaW5lJyl9PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17WycnLCAnJ119PlNlbGVjdCBhbiBBaXJsaW5lPC9vcHRpb24+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5vcHRpb25zLm1hcCgoYWlybGluZSwgaSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17SlNPTi5zdHJpbmdpZnkoW2FpcmxpbmUuY2Fycmllci5jb2RlLCBhaXJsaW5lLmNhcnJpZXIubmFtZV0pfT57YWlybGluZS5jYXJyaWVyLm5hbWV9KHthaXJsaW5lLmNhcnJpZXIuY29kZX0pPC9vcHRpb24+KTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMuZ2V0RGF0YX0+U2VhcmNoPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiJdfQ==