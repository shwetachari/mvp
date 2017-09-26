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
      airportOptions: [],
      airlineOptions: []
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
          _this2.setState(_defineProperty({}, name + 'Options', res));
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
            { className: 'col-xs-12 text-center' },
            'Enter Airport Code or Name'
          ),
          React.createElement('input', { className: 'col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 text-center', name: 'airport', onChange: this.getValue.bind(this) }),
          React.createElement(
            'label',
            { className: 'col-xs-12 text-center' },
            'Enter Airline Code or Name'
          ),
          React.createElement('input', { className: 'col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 text-center', name: 'airline', onChange: this.getValue.bind(this) })
        ),
        React.createElement(
          'label',
          { className: 'col-xs-12 text-center' },
          'Make Your Selection'
        ),
        React.createElement(
          'div',
          { className: 'col-xs-12 selects' },
          React.createElement(
            'select',
            { className: 'col-xs-12 col-sm-5 col-sm-offset-1 col-md-4 col-md-offset-2 text-center', value: this.state.value, onChange: this.select.bind(this.props.parent, 'airport') },
            React.createElement(
              'option',
              { value: JSON.stringify(['', '']) },
              'Select an Airport'
            ),
            this.state.airportOptions.map(function (airport, i) {
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
            { className: 'col-xs-12 col-sm-5 col-md-4 text-center', value: this.state.value, onChange: this.select.bind(this.props.parent, 'airline') },
            React.createElement(
              'option',
              { value: JSON.stringify(['', '']) },
              'Select an Airline'
            ),
            this.state.airlineOptions.map(function (airline, i) {
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
          { className: 'col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 text-center', onClick: this.props.getData },
          'Search'
        )
      );
    }
  }]);

  return Search;
}(React.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZWFyY2guanN4Il0sIm5hbWVzIjpbIlNlYXJjaCIsInByb3BzIiwic3RhdGUiLCJhaXJwb3J0T3B0aW9ucyIsImFpcmxpbmVPcHRpb25zIiwicXVlcnkiLCJldmVudCIsInNldFN0YXRlIiwiSlNPTiIsInBhcnNlIiwidGFyZ2V0IiwidmFsdWUiLCJuYW1lIiwiJCIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwic3VjY2VzcyIsInJlcyIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImZldGNoIiwiZ2V0VmFsdWUiLCJiaW5kIiwic2VsZWN0IiwicGFyZW50Iiwic3RyaW5naWZ5IiwibWFwIiwiYWlycG9ydCIsImkiLCJjb2RlIiwiYWlybGluZSIsImNhcnJpZXIiLCJnZXREYXRhIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFNQSxNOzs7QUFDSixrQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGdIQUNYQSxLQURXOztBQUVqQixVQUFLQyxLQUFMLEdBQWE7QUFDWEMsc0JBQWdCLEVBREw7QUFFWEMsc0JBQWdCO0FBRkwsS0FBYjtBQUZpQjtBQU1sQjs7OzsyQkFFTUMsSyxFQUFPQyxLLEVBQU87QUFBQTs7QUFDbkIsV0FBS0MsUUFBTCw2Q0FDR0YsS0FESCxFQUNXRyxLQUFLQyxLQUFMLENBQVdILE1BQU1JLE1BQU4sQ0FBYUMsS0FBeEIsRUFBK0IsQ0FBL0IsQ0FEWCw4QkFFR04sUUFBUSxNQUZYLEVBRW9CRyxLQUFLQyxLQUFMLENBQVdILE1BQU1JLE1BQU4sQ0FBYUMsS0FBeEIsRUFBK0IsQ0FBL0IsQ0FGcEI7QUFJRDs7OzBCQUVLQSxLLEVBQU9DLEksRUFBTTtBQUFBOztBQUNqQkMsUUFBRUMsSUFBRixDQUFPO0FBQ0xDLGlEQUF1Q0gsSUFBdkMsU0FBK0NELEtBRDFDO0FBRUxLLGNBQU0sS0FGRDtBQUdMLHdCQUFnQixrQkFIWDtBQUlMQyxpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hC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QUFVLHlFQUFsQixFQUE0RixTQUFTLEtBQUs5QixLQUFMLENBQVdpQyxPQUFoSDtBQUFBO0FBQUE7QUF4QkYsT0FERjtBQTRCRDs7OztFQWpFa0JDLE1BQU1DLFMiLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFpcnBvcnRPcHRpb25zOiBbXSxcbiAgICAgIGFpcmxpbmVPcHRpb25zOiBbXVxuICAgIH07XG4gIH1cblxuICBzZWxlY3QocXVlcnksIGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBbcXVlcnldOiBKU09OLnBhcnNlKGV2ZW50LnRhcmdldC52YWx1ZSlbMF0sXG4gICAgICBbcXVlcnkgKyAnTmFtZSddOiBKU09OLnBhcnNlKGV2ZW50LnRhcmdldC52YWx1ZSlbMV1cbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoKHZhbHVlLCBuYW1lKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogYGh0dHA6Ly8xMjcuMC4wLjE6MzAwMC9haXJsaW5lcz8ke25hbWV9PSR7dmFsdWV9YCxcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgW25hbWUgKyAnT3B0aW9ucyddOiByZXNcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5mZXRjaChldmVudC50YXJnZXQudmFsdWUsIGV2ZW50LnRhcmdldC5uYW1lKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29sLXhzLTEyIHRleHQtY2VudGVyXCI+RW50ZXIgQWlycG9ydCBDb2RlIG9yIE5hbWU8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXNtLTYgY29sLXNtLW9mZnNldC0zIGNvbC1tZC00IGNvbC1tZC1vZmZzZXQtNCB0ZXh0LWNlbnRlclwiIG5hbWU9XCJhaXJwb3J0XCIgb25DaGFuZ2U9e3RoaXMuZ2V0VmFsdWUuYmluZCh0aGlzKX0vPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcIj5FbnRlciBBaXJsaW5lIENvZGUgb3IgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtc20tNiBjb2wtc20tb2Zmc2V0LTMgY29sLW1kLTQgY29sLW1kLW9mZnNldC00IHRleHQtY2VudGVyXCIgbmFtZT1cImFpcmxpbmVcIiBvbkNoYW5nZT17dGhpcy5nZXRWYWx1ZS5iaW5kKHRoaXMpfS8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcIj5NYWtlIFlvdXIgU2VsZWN0aW9uPC9sYWJlbD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgc2VsZWN0c1wiPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS01IGNvbC1zbS1vZmZzZXQtMSBjb2wtbWQtNCBjb2wtbWQtb2Zmc2V0LTIgdGV4dC1jZW50ZXJcIiB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMuc2VsZWN0LmJpbmQodGhpcy5wcm9wcy5wYXJlbnQsICdhaXJwb3J0Jyl9PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17SlNPTi5zdHJpbmdpZnkoWycnLCAnJ10pfT5TZWxlY3QgYW4gQWlycG9ydDwvb3B0aW9uPlxuICAgICAgICAgICAge3RoaXMuc3RhdGUuYWlycG9ydE9wdGlvbnMubWFwKChhaXJwb3J0LCBpKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtKU09OLnN0cmluZ2lmeShbYWlycG9ydC5haXJwb3J0LmNvZGUsIGFpcnBvcnQuYWlycG9ydC5uYW1lXSl9PnthaXJwb3J0LmFpcnBvcnQubmFtZX0oe2FpcnBvcnQuYWlycG9ydC5jb2RlfSk8L29wdGlvbj4pO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXNtLTUgY29sLW1kLTQgdGV4dC1jZW50ZXJcIiB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMuc2VsZWN0LmJpbmQodGhpcy5wcm9wcy5wYXJlbnQsICdhaXJsaW5lJyl9PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17SlNPTi5zdHJpbmdpZnkoWycnLCAnJ10pfT5TZWxlY3QgYW4gQWlybGluZTwvb3B0aW9uPlxuICAgICAgICAgICAge3RoaXMuc3RhdGUuYWlybGluZU9wdGlvbnMubWFwKChhaXJsaW5lLCBpKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtKU09OLnN0cmluZ2lmeShbYWlybGluZS5jYXJyaWVyLmNvZGUsIGFpcmxpbmUuY2Fycmllci5uYW1lXSl9PnthaXJsaW5lLmNhcnJpZXIubmFtZX0oe2FpcmxpbmUuY2Fycmllci5jb2RlfSk8L29wdGlvbj4pO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS02IGNvbC1zbS1vZmZzZXQtMyBjb2wtbWQtNCBjb2wtbWQtb2Zmc2V0LTQgdGV4dC1jZW50ZXJcIiBvbkNsaWNrPXt0aGlzLnByb3BzLmdldERhdGF9PlNlYXJjaDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG4iXX0=