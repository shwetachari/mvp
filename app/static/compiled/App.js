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
      flights: [],
      statistics: {}
    };
    return _this;
  }

  _createClass(App, [{
    key: 'findFlights',
    value: function findFlights() {
      var _this2 = this;

      $.ajax({
        url: 'http://127.0.0.1:3000/findflights?airport=' + this.state.airport,
        type: 'GET',
        'Content-Type': 'application/json',
        success: function success(res) {
          _this2.setState({
            flights: res
          });
          var pos = $('#flightList').offset().top;
          $('html, body').scrollTop(pos);
        },
        error: function error() {
          console.log('error finding flights');
        }
      });
    }
  }, {
    key: 'updateStats',
    value: function updateStats() {
      var _this3 = this;

      var genAve = function genAve(path, total) {
        return (_this3.state.active.reduce(function (sum, obj) {
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

      d3.selectAll('svg').remove();
      this.genChart.call(this, 'on time');
      this.genChart.call(this, 'delayed');
      this.genChart.call(this, 'cancelled');
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this4 = this;

      $('#datasection').fadeOut();
      $('#datasection').removeClass('hidden');
      $.ajax({
        url: 'http://127.0.0.1:3000/flightdata?airport=' + this.state.airport + '&airline=' + this.state.airline,
        type: 'GET',
        'Content-Type': 'application/json',
        success: function success(res) {
          _this4.setState({
            active: res
          });
          _this4.updateStats.call(_this4);
          $('#datasection').show();
          var pos = $('#datasection').offset().top;
          $('html, body').scrollTop(pos);
        },
        error: function error() {
          console.log('error');
        }
      });
    }
  }, {
    key: 'genChart',
    value: function genChart(path) {

      var margin = { top: 40, right: 40, left: 60, bottom: 40 };
      var outerw = Math.min(window.innerWidth, window.innerHeight) / 1.25;
      var outerh = outerw;
      var h = outerh - margin.top - margin.bottom;
      var w = outerw - margin.left - margin.right;
      var xScale = d3.scaleBand().domain([2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]).paddingInner(0.3).paddingOuter(0.1).range([0, w]);
      var yScale = d3.scaleLinear().domain([0, 1]).range([h, 0]);
      var xAxis = d3.axisBottom(xScale).ticks(14);
      var yAxis = d3.axisLeft(yScale).tickFormat(d3.format('.0%')).ticks(20);

      var svg = d3.select('#data').append('svg');

      svg.attr('height', outerh).attr('width', outerw);

      svg.selectAll('rect').data(this.state.active).enter().append('rect').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').attr('width', xScale.bandwidth()).attr('x', function (d) {
        return xScale(d.time.year + d.time.month / 12);
      }).attr('y', h).style('fill', 'skyblue').attr('height', 0).transition().duration(750).ease(d3.easeBounce).attr('y', function (d) {
        return yScale(d.statistics.flights[path] / d.statistics.flights.total);
      }).attr('height', function (d) {
        return h - yScale(d.statistics.flights[path] / d.statistics.flights.total);
      });

      var tooltip = d3.select('body').append('div').style('position', 'absolute').style('padding', '10px').style('background', 'white').style('color', '#1C3144').style('border-radius', '5px').style('opacity', 0);

      svg.selectAll('rect').on('mouseover', function (d, i) {
        tooltip.style('opacity', 1).style('left', d3.event.pageX - 35 + 'px').style('top', d3.event.pageY - 35 + 'px').html((100 * (d.statistics.flights[path] / d.statistics.flights.total)).toPrecision(3) + '%');
      }).on('mouseout', function (d, i) {
        tooltip.style('opacity', 0);
      });

      svg.append('text').attr('transform', 'translate(' + (margin.left + w / 2) + ', ' + margin.top + ')').style('text-anchor', 'middle').style('font-size', '25px').text('Flights ' + path);

      svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + (h + margin.top) + ')').call(xAxis);
      svg.append('text').attr('transform', 'translate(' + (margin.left + w / 2) + ', ' + (h + margin.top + 40) + ')').style('text-anchor', 'middle').style('font-size', '18px').text('Year');

      svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').call(yAxis);
      svg.append('text').attr('transform', 'translate(15, ' + (margin.top + h / 2) + ')rotate(-90)').style('text-anchor', 'middle').style('font-size', '18px').text('Percent of Flights ' + path[0].toUpperCase() + path.slice(1));
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'App' },
        React.createElement(
          'div',
          { className: 'header' },
          React.createElement(
            'h1',
            { className: 'col-xs-12 text-center' },
            'Flight Delay History'
          )
        ),
        React.createElement(
          'div',
          { className: 'instructions col-xs-12 text-center' },
          React.createElement(
            'p',
            null,
            'Select an airport and/or airline to begin. Simply type in the name or code of a domestic airline/airport, then select from the dropdown menu and hit Submit to see flight delay statistics for your selection from 2003 to 2016.'
          )
        ),
        React.createElement(Search, { airline: this.state.airline, airport: this.state.airport, parent: this, getData: this.getData.bind(this) }),
        React.createElement(Data, { data: this.state.active, airline: this.state.airline, airport: this.state.airport, airlineName: this.state.airlineName, airportName: this.state.airportName, statistics: this.state.statistics, findFlights: this.findFlights.bind(this), flights: this.state.flights })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsInN0YXRlIiwiYWN0aXZlIiwiYWlybGluZSIsImFpcnBvcnQiLCJhaXJsaW5lTmFtZSIsImFpcnBvcnROYW1lIiwiZmxpZ2h0cyIsInN0YXRpc3RpY3MiLCIkIiwiYWpheCIsInVybCIsInR5cGUiLCJzdWNjZXNzIiwicmVzIiwic2V0U3RhdGUiLCJwb3MiLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGxUb3AiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJnZW5BdmUiLCJwYXRoIiwidG90YWwiLCJyZWR1Y2UiLCJzdW0iLCJvYmoiLCJOdW1iZXIiLCJ0b1ByZWNpc2lvbiIsInRvdGFsRmxpZ2h0cyIsIm5ld1N0YXRzIiwiYXZlQ2FuY2VsbGVkIiwiYXZlT25UaW1lIiwiYXZlRGVsYXllZCIsImF2ZURpdmVydGVkIiwiZDMiLCJzZWxlY3RBbGwiLCJyZW1vdmUiLCJnZW5DaGFydCIsImNhbGwiLCJmYWRlT3V0IiwicmVtb3ZlQ2xhc3MiLCJ1cGRhdGVTdGF0cyIsInNob3ciLCJtYXJnaW4iLCJyaWdodCIsImxlZnQiLCJib3R0b20iLCJvdXRlcnciLCJNYXRoIiwibWluIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwib3V0ZXJoIiwiaCIsInciLCJ4U2NhbGUiLCJzY2FsZUJhbmQiLCJkb21haW4iLCJwYWRkaW5nSW5uZXIiLCJwYWRkaW5nT3V0ZXIiLCJyYW5nZSIsInlTY2FsZSIsInNjYWxlTGluZWFyIiwieEF4aXMiLCJheGlzQm90dG9tIiwidGlja3MiLCJ5QXhpcyIsImF4aXNMZWZ0IiwidGlja0Zvcm1hdCIsImZvcm1hdCIsInN2ZyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJkYXRhIiwiZW50ZXIiLCJiYW5kd2lkdGgiLCJkIiwidGltZSIsInllYXIiLCJtb250aCIsInN0eWxlIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiZWFzZSIsImVhc2VCb3VuY2UiLCJ0b29sdGlwIiwib24iLCJpIiwiZXZlbnQiLCJwYWdlWCIsInBhZ2VZIiwiaHRtbCIsInRleHQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiZ2V0RGF0YSIsImJpbmQiLCJmaW5kRmxpZ2h0cyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7OztBQUNKLGlCQUFjO0FBQUE7O0FBQUE7O0FBRVosVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLGNBQVEsRUFERztBQUVYQyxlQUFTLEVBRkU7QUFHWEMsZUFBUyxFQUhFO0FBSVhDLG1CQUFhLEVBSkY7QUFLWEMsbUJBQWEsRUFMRjtBQU1YQyxlQUFTLEVBTkU7QUFPWEMsa0JBQVk7QUFQRCxLQUFiO0FBRlk7QUFXYjs7OztrQ0FFYTtBQUFBOztBQUNaQyxRQUFFQyxJQUFGLENBQU87QUFDTEMsNERBQWtELEtBQUtWLEtBQUwsQ0FBV0csT0FEeEQ7QUFFTFEsY0FBTSxLQUZEO0FBR0wsd0JBQWdCLGtCQUhYO0FBSUxDLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsaUJBQUtDLFFBQUwsQ0FBYztBQUNaUixxQkFBU087QUFERyxXQUFkO0FBR0EsY0FBSUUsTUFBTVAsRUFBRSxhQUFGLEVBQWlCUSxNQUFqQixHQUEwQkMsR0FBcEM7QUFDQVQsWUFBRSxZQUFGLEVBQWdCVSxTQUFoQixDQUEwQkgsR0FBMUI7QUFDRCxTQVZJO0FBV0xJLGVBQU8saUJBQU07QUFDWEMsa0JBQVFDLEdBQVIsQ0FBWSx1QkFBWjtBQUNEO0FBYkksT0FBUDtBQWVEOzs7a0NBRWE7QUFBQTs7QUFDWixVQUFJQyxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWlCO0FBQzVCLGVBQU8sQ0FBRSxPQUFLeEIsS0FBTCxDQUFXQyxNQUFYLENBQWtCd0IsTUFBbEIsQ0FBeUIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDOUNELGlC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QUFTLEtBQUtwRyxLQUFMLENBQVdNLE9BQXBRO0FBWkYsT0FERjtBQWdCRDs7OztFQW5NZWdHLE1BQU1DLFM7O0FBc014QkMsU0FBU0MsTUFBVCxDQUFnQixvQkFBQyxHQUFELE9BQWhCLEVBQXlCQyxTQUFTQyxjQUFULENBQXdCLE1BQXhCLENBQXpCIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZTogW10sXG4gICAgICBhaXJsaW5lOiAnJyxcbiAgICAgIGFpcnBvcnQ6ICcnLFxuICAgICAgYWlybGluZU5hbWU6ICcnLFxuICAgICAgYWlycG9ydE5hbWU6ICcnLFxuICAgICAgZmxpZ2h0czogW10sXG4gICAgICBzdGF0aXN0aWNzOiB7fVxuICAgIH07XG4gIH1cblxuICBmaW5kRmxpZ2h0cygpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cDovLzEyNy4wLjAuMTozMDAwL2ZpbmRmbGlnaHRzP2FpcnBvcnQ9JHt0aGlzLnN0YXRlLmFpcnBvcnR9YCxcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZmxpZ2h0czogcmVzXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcG9zID0gJCgnI2ZsaWdodExpc3QnKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5zY3JvbGxUb3AocG9zKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3IgZmluZGluZyBmbGlnaHRzJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdGF0cygpIHtcbiAgICBsZXQgZ2VuQXZlID0gKHBhdGgsIHRvdGFsKSA9PiB7XG4gICAgICByZXR1cm4gKCh0aGlzLnN0YXRlLmFjdGl2ZS5yZWR1Y2UoKHN1bSwgb2JqKSA9PiB7XG4gICAgICAgIHN1bSArPSBOdW1iZXIob2JqLnN0YXRpc3RpY3MuZmxpZ2h0c1twYXRoXSk7XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgICB9LCAwKSAvIHRvdGFsKSAqIDEwMCkudG9QcmVjaXNpb24oMyk7XG4gICAgfVxuXG4gICAgdmFyIHRvdGFsRmxpZ2h0cyA9IGdlbkF2ZSgndG90YWwnLCAxKSAvIDEwMDtcblxuICAgIGxldCBuZXdTdGF0cyA9IHtcbiAgICAgIGF2ZUNhbmNlbGxlZDogZ2VuQXZlKCdjYW5jZWxsZWQnLCB0b3RhbEZsaWdodHMpLFxuICAgICAgYXZlT25UaW1lOiBnZW5BdmUoJ29uIHRpbWUnLCB0b3RhbEZsaWdodHMpLFxuICAgICAgYXZlRGVsYXllZDogZ2VuQXZlKCdkZWxheWVkJywgdG90YWxGbGlnaHRzKSxcbiAgICAgIGF2ZURpdmVydGVkOiBnZW5BdmUoJ2RpdmVydGVkJywgdG90YWxGbGlnaHRzKVxuICAgIH07XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN0YXRpc3RpY3M6IG5ld1N0YXRzXG4gICAgfSk7XG5cblxuICAgIGQzLnNlbGVjdEFsbCgnc3ZnJykucmVtb3ZlKCk7XG4gICAgdGhpcy5nZW5DaGFydC5jYWxsKHRoaXMsICdvbiB0aW1lJyk7XG4gICAgdGhpcy5nZW5DaGFydC5jYWxsKHRoaXMsICdkZWxheWVkJyk7XG4gICAgdGhpcy5nZW5DaGFydC5jYWxsKHRoaXMsICdjYW5jZWxsZWQnKTtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgJCgnI2RhdGFzZWN0aW9uJykuZmFkZU91dCgpO1xuICAgICQoJyNkYXRhc2VjdGlvbicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cDovLzEyNy4wLjAuMTozMDAwL2ZsaWdodGRhdGE/YWlycG9ydD0ke3RoaXMuc3RhdGUuYWlycG9ydH0mYWlybGluZT0ke3RoaXMuc3RhdGUuYWlybGluZX1gLFxuICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBhY3RpdmU6IHJlc1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0cy5jYWxsKHRoaXMpO1xuICAgICAgICAkKCcjZGF0YXNlY3Rpb24nKS5zaG93KCk7XG4gICAgICAgIGxldCBwb3MgPSAkKCcjZGF0YXNlY3Rpb24nKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5zY3JvbGxUb3AocG9zKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdlbkNoYXJ0KHBhdGgpIHtcblxuICAgIHZhciBtYXJnaW4gPSB7dG9wOjQwLCByaWdodDo0MCwgbGVmdDo2MCwgYm90dG9tOjQwfTtcbiAgICB2YXIgb3V0ZXJ3ID0gTWF0aC5taW4od2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCkgLyAxLjI1O1xuICAgIHZhciBvdXRlcmggPSBvdXRlcnc7XG4gICAgdmFyIGggPSBvdXRlcmggLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgICB2YXIgdyA9IG91dGVydyAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZUJhbmQoKVxuICAgICAgICAgICAgICAgICAgIC5kb21haW4oWzIwMDMsIDIwMDQsIDIwMDUsIDIwMDYsIDIwMDcsIDIwMDgsIDIwMDksIDIwMTAsIDIwMTEsIDIwMTIsIDIwMTMsIDIwMTQsIDIwMTUsIDIwMTZdKVxuICAgICAgICAgICAgICAgICAgIC5wYWRkaW5nSW5uZXIoMC4zKVxuICAgICAgICAgICAgICAgICAgIC5wYWRkaW5nT3V0ZXIoMC4xKVxuICAgICAgICAgICAgICAgICAgIC5yYW5nZShbMCwgd10pO1xuICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAgICAgICAgLmRvbWFpbihbMCwgMV0pXG4gICAgICAgICAgICAgICAgICAgLnJhbmdlKFtoLCAwXSk7XG4gICAgdmFyIHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgICAgICAgICAgICAgICAgLnRpY2tzKDE0KTtcbiAgICB2YXIgeUF4aXMgPSBkMy5heGlzTGVmdCh5U2NhbGUpXG4gICAgICAgICAgICAgICAgICAudGlja0Zvcm1hdChkMy5mb3JtYXQoJy4wJScpKVxuICAgICAgICAgICAgICAgICAgLnRpY2tzKDIwKTtcblxuXG4gICAgdmFyIHN2ZyA9IGQzLnNlbGVjdCgnI2RhdGEnKS5hcHBlbmQoJ3N2ZycpO1xuXG4gICAgc3ZnLmF0dHIoJ2hlaWdodCcsIG91dGVyaClcbiAgICAgIC5hdHRyKCd3aWR0aCcsIG91dGVydyk7XG5cblxuICAgIHN2Zy5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgICAgLmRhdGEodGhpcy5zdGF0ZS5hY3RpdmUpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgJHttYXJnaW4udG9wfSlgKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgeFNjYWxlLmJhbmR3aWR0aCgpKVxuICAgICAgLmF0dHIoJ3gnLCAoZCkgPT4ge1xuICAgICAgICByZXR1cm4geFNjYWxlKGQudGltZS55ZWFyICsgZC50aW1lLm1vbnRoLzEyKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cigneScsIGgpXG4gICAgICAuc3R5bGUoJ2ZpbGwnLCAnc2t5Ymx1ZScpXG4gICAgICAuYXR0cignaGVpZ2h0JywgMClcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDc1MClcbiAgICAgICAgLmVhc2UoZDMuZWFzZUJvdW5jZSlcbiAgICAgICAgLmF0dHIoJ3knLCAoZCkgPT4ge1xuICAgICAgICAgIHJldHVybiB5U2NhbGUoZC5zdGF0aXN0aWNzLmZsaWdodHNbcGF0aF0gLyBkLnN0YXRpc3RpY3MuZmxpZ2h0cy50b3RhbCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCAoZCkgPT4ge1xuICAgICAgICAgIHJldHVybiBoIC0geVNjYWxlKGQuc3RhdGlzdGljcy5mbGlnaHRzW3BhdGhdIC8gZC5zdGF0aXN0aWNzLmZsaWdodHMudG90YWwpO1xuICAgICAgICB9KTtcblxuICAgICAgdmFyIHRvb2x0aXAgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgLnN0eWxlKCdwYWRkaW5nJywgJzEwcHgnKVxuICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQnLCAnd2hpdGUnKVxuICAgICAgICAuc3R5bGUoJ2NvbG9yJywgJyMxQzMxNDQnKVxuICAgICAgICAuc3R5bGUoJ2JvcmRlci1yYWRpdXMnLCAnNXB4JylcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgIHN2Zy5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIChkLCBpKSA9PiB7XG4gICAgICAgICAgdG9vbHRpcC5zdHlsZSgnb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggLSAzNSkgKyAncHgnKVxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAzNSkgKyAncHgnKVxuICAgICAgICAgICAgLmh0bWwoKDEwMCAqIChkLnN0YXRpc3RpY3MuZmxpZ2h0c1twYXRoXSAvIGQuc3RhdGlzdGljcy5mbGlnaHRzLnRvdGFsKSkudG9QcmVjaXNpb24oMykgKyAnJScpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlb3V0JywgKGQsIGkpID0+IHtcbiAgICAgICAgICB0b29sdGlwLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gICAgICAgIH0pO1xuXG4gICAgc3ZnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0ICsgdyAvIDJ9LCAke21hcmdpbi50b3B9KWApXG4gICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsICcyNXB4JylcbiAgICAgIC50ZXh0KCdGbGlnaHRzICcgKyBwYXRoKTtcblxuICAgIHN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sICR7aCArIG1hcmdpbi50b3B9KWApXG4gICAgICAuY2FsbCh4QXhpcyk7XG4gICAgc3ZnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0ICsgdyAvIDJ9LCAke2ggKyBtYXJnaW4udG9wICsgNDB9KWApXG4gICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsICcxOHB4JylcbiAgICAgIC50ZXh0KCdZZWFyJyk7XG5cbiAgICBzdmcuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9LCAke21hcmdpbi50b3B9KWApXG4gICAgICAuY2FsbCh5QXhpcyk7XG4gICAgc3ZnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgxNSwgJHttYXJnaW4udG9wICsgaCAvIDJ9KXJvdGF0ZSgtOTApYClcbiAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgJzE4cHgnKVxuICAgICAgLnRleHQoJ1BlcmNlbnQgb2YgRmxpZ2h0cyAnICsgcGF0aFswXS50b1VwcGVyQ2FzZSgpICsgcGF0aC5zbGljZSgxKSk7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJBcHBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY29sLXhzLTEyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICBGbGlnaHQgRGVsYXkgSGlzdG9yeVxuICAgICAgICAgIDwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluc3RydWN0aW9ucyBjb2wteHMtMTIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIFNlbGVjdCBhbiBhaXJwb3J0IGFuZC9vciBhaXJsaW5lIHRvIGJlZ2luLiBTaW1wbHkgdHlwZSBpbiB0aGUgbmFtZSBvciBjb2RlIG9mIGEgZG9tZXN0aWMgYWlybGluZS9haXJwb3J0LCB0aGVuIHNlbGVjdCBmcm9tIHRoZSBkcm9wZG93biBtZW51IGFuZCBoaXQgU3VibWl0IHRvIHNlZSBmbGlnaHQgZGVsYXkgc3RhdGlzdGljcyBmb3IgeW91ciBzZWxlY3Rpb24gZnJvbSAyMDAzIHRvIDIwMTYuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlYXJjaCBhaXJsaW5lPXt0aGlzLnN0YXRlLmFpcmxpbmV9IGFpcnBvcnQ9e3RoaXMuc3RhdGUuYWlycG9ydH0gcGFyZW50PXt0aGlzfSBnZXREYXRhPXt0aGlzLmdldERhdGEuYmluZCh0aGlzKX0vPlxuICAgICAgICA8RGF0YSBkYXRhPXt0aGlzLnN0YXRlLmFjdGl2ZX0gYWlybGluZT17dGhpcy5zdGF0ZS5haXJsaW5lfSBhaXJwb3J0PXt0aGlzLnN0YXRlLmFpcnBvcnR9IGFpcmxpbmVOYW1lPXt0aGlzLnN0YXRlLmFpcmxpbmVOYW1lfSBhaXJwb3J0TmFtZT17dGhpcy5zdGF0ZS5haXJwb3J0TmFtZX0gc3RhdGlzdGljcz17dGhpcy5zdGF0ZS5zdGF0aXN0aWNzfSBmaW5kRmxpZ2h0cz17dGhpcy5maW5kRmxpZ2h0cy5iaW5kKHRoaXMpfSBmbGlnaHRzPXt0aGlzLnN0YXRlLmZsaWdodHN9Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuIl19