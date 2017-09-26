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
      var button = '';
      if (this.props.airport !== '') {
        button = React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'col-xs-12 text-center needInspiration' },
            'Need inspiration?'
          ),
          React.createElement(
            'button',
            { onClick: this.props.findFlights, className: 'col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 text-center' },
            'Search Flights From This Airport'
          )
        );
      }
      var flightHeading = '';
      var firstListItem = '';
      if (this.props.flights.length > 0) {
        flightHeading = React.createElement(
          'h2',
          { id: 'flightList', className: 'col-xs-12 text-center' },
          'Travel Inspiration'
        );
        var style = { fontSize: '20px' };
        firstListItem = React.createElement(
          'li',
          { style: style, className: 'col-xs-12' },
          React.createElement(
            'div',
            { className: 'col-xs-2 col-xs-offset-1 text-center' },
            'Airline'
          ),
          React.createElement(
            'div',
            { className: 'col-xs-2 text-center' },
            'Departure'
          ),
          React.createElement(
            'div',
            { className: 'col-xs-2 text-center' },
            'Destination'
          ),
          React.createElement(
            'div',
            { className: 'col-xs-2 text-center' },
            'Price'
          ),
          React.createElement(
            'div',
            { className: 'col-xs-2 text-center' },
            'Return'
          )
        );
      }

      return React.createElement(
        'div',
        { className: 'datasection hidden', id: 'datasection' },
        React.createElement(
          'div',
          { className: 'summaryStats' },
          React.createElement(
            'h2',
            { className: 'col-xs-12 text-center' },
            'Summary Statistics'
          ),
          React.createElement(
            'h3',
            { className: 'col-xs-12 text-center' },
            this.props.airport ? this.props.airport : '',
            ' ',
            this.props.airportName ? '(' + this.props.airportName + ')' : ''
          ),
          React.createElement(
            'h3',
            { className: 'col-xs-12 text-center' },
            this.props.airline ? this.props.airline : '',
            ' ',
            this.props.airlineName ? '(' + this.props.airlineName + ')' : ''
          ),
          button,
          React.createElement(
            'div',
            { className: 'percents col-xs-12 text-center' },
            React.createElement(
              'div',
              { className: 'percent' },
              'Percent of Flights On Time: ',
              this.props.statistics.aveOnTime || 0,
              '%'
            ),
            React.createElement(
              'div',
              { className: 'percent' },
              'Percent of Flights Cancelled: ',
              this.props.statistics.aveCancelled || 0,
              '%'
            ),
            React.createElement(
              'div',
              { className: 'percent' },
              'Percent of Flights Delayed: ',
              this.props.statistics.aveDelayed || 0,
              '%'
            ),
            React.createElement(
              'div',
              { className: 'percent' },
              'Percent of Flights Diverted: ',
              this.props.statistics.aveDiverted || 0,
              '%'
            )
          )
        ),
        React.createElement('div', { id: 'data', className: 'col-xs-12 text-center' }),
        flightHeading,
        React.createElement(
          'ul',
          { className: 'col-xs-12' },
          firstListItem,
          this.props.flights.map(function (flight, index) {
            return React.createElement(
              'li',
              { className: 'col-xs-12', key: index },
              React.createElement(
                'div',
                { className: 'col-xs-2 col-xs-offset-1 text-center' },
                flight.airline
              ),
              React.createElement(
                'div',
                { className: 'col-xs-2 text-center' },
                flight.departure_date.slice(5).split('-').join('/'),
                '/',
                flight.departure_date.slice(0, 4)
              ),
              React.createElement(
                'div',
                { className: 'col-xs-2 text-center' },
                flight.destination
              ),
              React.createElement(
                'div',
                { className: 'col-xs-2 text-center' },
                flight.price
              ),
              React.createElement(
                'div',
                { className: 'col-xs-2 text-center' },
                flight.return_date.slice(5).split('-').join('/'),
                '/',
                flight.departure_date.slice(0, 4)
              )
            );
          })
        )
      );
    }
  }]);

  return Data;
}(React.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRhLmpzeCJdLCJuYW1lcyI6WyJEYXRhIiwicHJvcHMiLCJwYXRoIiwiTWF0aCIsInJvdW5kIiwiZGF0YSIsInJlZHVjZSIsInN1bSIsIm9iaiIsIk51bWJlciIsImxlbmd0aCIsImJ1dHRvbiIsImFpcnBvcnQiLCJmaW5kRmxpZ2h0cyIsImZsaWdodEhlYWRpbmciLCJmaXJzdExpc3RJdGVtIiwiZmxpZ2h0cyIsInN0eWxlIiwiZm9udFNpemUiLCJhaXJwb3J0TmFtZSIsImFpcmxpbmUiLCJhaXJsaW5lTmFtZSIsInN0YXRpc3RpY3MiLCJhdmVPblRpbWUiLCJhdmVDYW5jZWxsZWQiLCJhdmVEZWxheWVkIiwiYXZlRGl2ZXJ0ZWQiLCJtYXAiLCJmbGlnaHQiLCJpbmRleCIsImRlcGFydHVyZV9kYXRlIiwic2xpY2UiLCJzcGxpdCIsImpvaW4iLCJkZXN0aW5hdGlvbiIsInByaWNlIiwicmV0dXJuX2RhdGUiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxJOzs7QUFDSixnQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHVHQUNYQSxLQURXO0FBRWxCOzs7OzJCQUVNQyxJLEVBQU07QUFDWCxhQUFPQyxLQUFLQyxLQUFMLENBQVcsS0FBS0gsS0FBTCxDQUFXSSxJQUFYLENBQWdCQyxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNyREQsZUFBT0UsT0FBT0QsSUFBSU4sSUFBWCxDQUFQO0FBQ0EsZUFBT0ssR0FBUDtBQUNELE9BSGlCLEVBR2YsQ0FIZSxJQUdWLEtBQUtOLEtBQUwsQ0FBV0ksSUFBWCxDQUFnQkssTUFIakIsQ0FBUDtBQUlEOzs7NkJBRVE7QUFDUCxVQUFJQyxTQUFTLEVBQWI7QUFDQSxVQUFHLEtBQUtWLEtBQUwsQ0FBV1csT0FBWCxLQUF1QixFQUExQixFQUE4QjtBQUM1QkQsaUJBQVM7QUFBQTtBQUFBO0FBQUs7QUFBQTtBQUFBLGNBQUssV0FB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QUFRO0FBQUE7QUFBQSxnQkFBSSxXQUFVLFdBQWQsRUFBMEIsS0FBS0EsS0FBL0I7QUFDTjtBQUFBO0FBQUEsa0JBQUssV0FBVSxzQ0FBZjtBQUF1REQsdUJBQU9SO0FBQTlELGVBRE07QUFFTjtBQUFBO0FBQUEsa0JBQUssV0FBVSxzQkFBZjtBQUF1Q1EsdUJBQU9FLGNBQVAsQ0FBc0JDLEtBQXRCLENBQTRCLENBQTVCLEVBQStCQyxLQUEvQixDQUFxQyxHQUFyQyxFQUEwQ0MsSUFBMUMsQ0FBK0MsR0FBL0MsQ0FBdkM7QUFBQTtBQUE2RkwsdUJBQU9FLGNBQVAsQ0FBc0JDLEtBQXRCLENBQTRCLENBQTVCLEVBQThCLENBQTlCO0FBQTdGLGVBRk07QUFHTjtBQUFBO0FBQUEsa0JBQUssV0FBVSxzQkFBZjtBQUF1Q0gsdUJBQU9NO0FBQTlDLGVBSE07QUFJTjtBQUFBO0FBQUEsa0JBQUssV0FBVSxzQkFBZjtBQUF1Q04sdUJBQU9PO0FBQTlDLGVBSk07QUFLTjtBQUFBO0FBQUEsa0JBQUssV0FBVSxzQkFBZjtBQUF1Q1AsdUJBQU9RLFdBQVAsQ0FBbUJMLEtBQW5CLENBQXlCLENBQXpCLEVBQTRCQyxLQUE1QixDQUFrQyxHQUFsQyxFQUF1Q0MsSUFBdkMsQ0FBNEMsR0FBNUMsQ0FBdkM7QUFBQTtBQUEwRkwsdUJBQU9FLGNBQVAsQ0FBc0JDLEtBQXRCLENBQTRCLENBQTVCLEVBQThCLENBQTlCO0FBQTFGO0FBTE0sYUFBUjtBQU9ELFdBUkE7QUFGSDtBQXJCRixPQURGO0FBcUNEOzs7O0VBdEVnQk0sTUFBTUMsUyIsImZpbGUiOiJEYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRGF0YSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgZ2VuQXZlKHBhdGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLnByb3BzLmRhdGEucmVkdWNlKChzdW0sIG9iaikgPT4ge1xuICAgICAgc3VtICs9IE51bWJlcihvYmoucGF0aCk7XG4gICAgICByZXR1cm4gc3VtO1xuICAgIH0sIDApIC8gdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGJ1dHRvbiA9ICcnO1xuICAgIGlmKHRoaXMucHJvcHMuYWlycG9ydCAhPT0gJycpIHtcbiAgICAgIGJ1dHRvbiA9IDxkaXY+PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgdGV4dC1jZW50ZXIgbmVlZEluc3BpcmF0aW9uXCI+TmVlZCBpbnNwaXJhdGlvbj88L2Rpdj48YnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMuZmluZEZsaWdodHN9IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtc20tNiBjb2wtc20tb2Zmc2V0LTMgY29sLW1kLTQgY29sLW1kLW9mZnNldC00IHRleHQtY2VudGVyXCI+U2VhcmNoIEZsaWdodHMgRnJvbSBUaGlzIEFpcnBvcnQ8L2J1dHRvbj48L2Rpdj5cbiAgICB9XG4gICAgbGV0IGZsaWdodEhlYWRpbmcgPSAnJztcbiAgICBsZXQgZmlyc3RMaXN0SXRlbSA9ICcnO1xuICAgIGlmKHRoaXMucHJvcHMuZmxpZ2h0cy5sZW5ndGggPiAwKSB7XG4gICAgICBmbGlnaHRIZWFkaW5nID0gPGgyICBpZD1cImZsaWdodExpc3RcIiBjbGFzc05hbWU9XCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcIj5UcmF2ZWwgSW5zcGlyYXRpb248L2gyPlxuICAgICAgbGV0IHN0eWxlID0ge2ZvbnRTaXplOiAnMjBweCd9XG4gICAgICBmaXJzdExpc3RJdGVtID0gPGxpIHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTIgY29sLXhzLW9mZnNldC0xIHRleHQtY2VudGVyXCI+QWlybGluZTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0yIHRleHQtY2VudGVyXCI+RGVwYXJ0dXJlPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTIgdGV4dC1jZW50ZXJcIj5EZXN0aW5hdGlvbjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0yIHRleHQtY2VudGVyXCI+UHJpY2U8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMiB0ZXh0LWNlbnRlclwiPlJldHVybjwvZGl2PlxuICAgICAgPC9saT5cbiAgICB9XG5cblxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0YXNlY3Rpb24gaGlkZGVuXCIgaWQ9XCJkYXRhc2VjdGlvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1bW1hcnlTdGF0c1wiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcIj5TdW1tYXJ5IFN0YXRpc3RpY3M8L2gyPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmFpcnBvcnQgPyB0aGlzLnByb3BzLmFpcnBvcnQgOiAnJ30ge3RoaXMucHJvcHMuYWlycG9ydE5hbWUgPyBgKCR7dGhpcy5wcm9wcy5haXJwb3J0TmFtZX0pYCA6ICcnfVxuICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImNvbC14cy0xMiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuYWlybGluZSA/IHRoaXMucHJvcHMuYWlybGluZSA6ICcnfSB7dGhpcy5wcm9wcy5haXJsaW5lTmFtZSA/IGAoJHt0aGlzLnByb3BzLmFpcmxpbmVOYW1lfSlgIDogJyd9XG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICB7YnV0dG9ufVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGVyY2VudHMgY29sLXhzLTEyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBlcmNlbnRcIj5QZXJjZW50IG9mIEZsaWdodHMgT24gVGltZToge3RoaXMucHJvcHMuc3RhdGlzdGljcy5hdmVPblRpbWUgfHwgMH0lPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBlcmNlbnRcIj5QZXJjZW50IG9mIEZsaWdodHMgQ2FuY2VsbGVkOiB7dGhpcy5wcm9wcy5zdGF0aXN0aWNzLmF2ZUNhbmNlbGxlZCB8fCAwfSU8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGVyY2VudFwiPlBlcmNlbnQgb2YgRmxpZ2h0cyBEZWxheWVkOiB7dGhpcy5wcm9wcy5zdGF0aXN0aWNzLmF2ZURlbGF5ZWQgfHwgMH0lPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBlcmNlbnRcIj5QZXJjZW50IG9mIEZsaWdodHMgRGl2ZXJ0ZWQ6IHt0aGlzLnByb3BzLnN0YXRpc3RpY3MuYXZlRGl2ZXJ0ZWQgfHwgMH0lPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgaWQ9XCJkYXRhXCIgY2xhc3NOYW1lPVwiY29sLXhzLTEyIHRleHQtY2VudGVyXCI+PC9kaXY+XG5cbiAgICAgICAge2ZsaWdodEhlYWRpbmd9XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cbiAgICAgICAgICB7Zmlyc3RMaXN0SXRlbX1cbiAgICAgICAgICB7dGhpcy5wcm9wcy5mbGlnaHRzLm1hcCgoZmxpZ2h0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICg8bGkgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTIgY29sLXhzLW9mZnNldC0xIHRleHQtY2VudGVyXCI+e2ZsaWdodC5haXJsaW5lfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0yIHRleHQtY2VudGVyXCI+e2ZsaWdodC5kZXBhcnR1cmVfZGF0ZS5zbGljZSg1KS5zcGxpdCgnLScpLmpvaW4oJy8nKX0ve2ZsaWdodC5kZXBhcnR1cmVfZGF0ZS5zbGljZSgwLDQpfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0yIHRleHQtY2VudGVyXCI+e2ZsaWdodC5kZXN0aW5hdGlvbn08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMiB0ZXh0LWNlbnRlclwiPntmbGlnaHQucHJpY2V9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTIgdGV4dC1jZW50ZXJcIj57ZmxpZ2h0LnJldHVybl9kYXRlLnNsaWNlKDUpLnNwbGl0KCctJykuam9pbignLycpfS97ZmxpZ2h0LmRlcGFydHVyZV9kYXRlLnNsaWNlKDAsNCl9PC9kaXY+XG4gICAgICAgICAgICA8L2xpPilcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC91bD5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19