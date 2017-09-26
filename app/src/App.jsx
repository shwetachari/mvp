class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: [],
      airline: '',
      airport: '',
      airlineName: '',
      airportName: '',
      statistics: {}
    };
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
  }

  getData() {
    $.ajax({
      url: `http://127.0.0.1:3000/flightdata?airport=${this.state.airport}&airline=${this.state.airline}`,
      type: 'GET',
      'Content-Type': 'application/json',
      success: (res) => {
        this.setState({
          active: res
        });
        this.updateStats.call(this);
      },
      error: () => {
        console.log('error');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <h2>Flight Delays</h2>
        </div>
        <div className="instructions">
          <p>
            Instructions to use the app go here!
          </p>
        </div>
        <Search airline={this.state.airline} airport={this.state.airport} parent={this} getData={this.getData.bind(this)}/>
        <Data data={this.state.active} airline={this.state.airline} airport={this.state.airport} airlineName={this.state.airlineName} airportName={this.state.airportName} statistics={this.state.statistics}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
