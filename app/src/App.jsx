class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: [],
      airline: '',
      airport: '',
      airlineName: '',
      airportName: '',
      flights: [],
      statistics: {}
    };
  }

  findFlights() {
    $.ajax({
      url: `http://127.0.0.1:3000/findflights?airport=${this.state.airport}`,
      type: 'GET',
      'Content-Type': 'application/json',
      success: (res) => {
        this.setState({
          flights: res
        });
        let pos = $('#flightList').offset().top;
        $('html, body').scrollTop(pos);
      },
      error: () => {
        console.log('error finding flights');
      }
    });
  }

  updateStats() {
    let genAve = (path, total) => {
      return ((this.state.active.reduce((sum, obj) => {
        sum += Number(obj.statistics.flights[path]);
        return sum;
      }, 0) / total) * 100).toPrecision(3);
    }

    var totalFlights = genAve('total', 1) / 100;

    let newStats = {
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

  getData() {
    $('#datasection').fadeOut();
    $('#datasection').removeClass('hidden');
    $.ajax({
      url: `http://127.0.0.1:3000/flightdata?airport=${this.state.airport}&airline=${this.state.airline}`,
      type: 'GET',
      'Content-Type': 'application/json',
      success: (res) => {
        this.setState({
          active: res
        });
        this.updateStats.call(this);
        $('#datasection').show();
        let pos = $('#datasection').offset().top;
        $('html, body').scrollTop(pos);
      },
      error: () => {
        console.log('error');
      }
    });
  }

  genChart(path) {

    var margin = {top:40, right:40, left:60, bottom:40};
    var outerw = Math.min(window.innerWidth, window.innerHeight) / 1.25;
    var outerh = outerw;
    var h = outerh - margin.top - margin.bottom;
    var w = outerw - margin.left - margin.right;
    var xScale = d3.scaleBand()
                   .domain([2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016])
                   .paddingInner(0.3)
                   .paddingOuter(0.1)
                   .range([0, w]);
    var yScale = d3.scaleLinear()
                   .domain([0, 1])
                   .range([h, 0]);
    var xAxis = d3.axisBottom(xScale)
                   .ticks(14);
    var yAxis = d3.axisLeft(yScale)
                  .tickFormat(d3.format('.0%'))
                  .ticks(20);


    var svg = d3.select('#data').append('svg');

    svg.attr('height', outerh)
      .attr('width', outerw);


    svg.selectAll('rect')
      .data(this.state.active)
      .enter()
      .append('rect')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('width', xScale.bandwidth())
      .attr('x', (d) => {
        return xScale(d.time.year + d.time.month/12);
      })
      .attr('y', h)
      .style('fill', 'skyblue')
      .attr('height', 0)
      .transition()
        .duration(750)
        .ease(d3.easeBounce)
        .attr('y', (d) => {
          return yScale(d.statistics.flights[path] / d.statistics.flights.total);
        })
        .attr('height', (d) => {
          return h - yScale(d.statistics.flights[path] / d.statistics.flights.total);
        });

      var tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '10px')
        .style('background', 'white')
        .style('color', '#1C3144')
        .style('border-radius', '5px')
        .style('opacity', 0);

      svg.selectAll('rect')
        .on('mouseover', (d, i) => {
          tooltip.style('opacity', 1)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top', (d3.event.pageY - 35) + 'px')
            .html((100 * (d.statistics.flights[path] / d.statistics.flights.total)).toPrecision(3) + '%');
        })
        .on('mouseout', (d, i) => {
          tooltip.style('opacity', 0);
        });

    svg.append('text')
      .attr('transform', `translate(${margin.left + w / 2}, ${margin.top})`)
      .style('text-anchor', 'middle')
      .style('font-size', '25px')
      .text('Flights ' + path);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${h + margin.top})`)
      .call(xAxis);
    svg.append('text')
      .attr('transform', `translate(${margin.left + w / 2}, ${h + margin.top + 40})`)
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .text('Year');

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);
    svg.append('text')
      .attr('transform', `translate(15, ${margin.top + h / 2})rotate(-90)`)
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .text('Percent of Flights ' + path[0].toUpperCase() + path.slice(1));

  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 className="col-xs-12 text-center">
            Flight Delay History
          </h1>
        </div>
        <div className="instructions col-xs-12 text-center">
          <p>
            Select an airport and/or airline to begin. Simply type in the name or code of a domestic airline/airport, then select from the dropdown menu and hit Submit to see flight delay statistics for your selection from 2003 to 2016.
          </p>
        </div>
        <Search airline={this.state.airline} airport={this.state.airport} parent={this} getData={this.getData.bind(this)}/>
        <Data data={this.state.active} airline={this.state.airline} airport={this.state.airport} airlineName={this.state.airlineName} airportName={this.state.airportName} statistics={this.state.statistics} findFlights={this.findFlights.bind(this)} flights={this.state.flights}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
