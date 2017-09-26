class Data extends React.Component {
  constructor(props) {
    super(props);
  }

  genAve(path) {
    return Math.round(this.props.data.reduce((sum, obj) => {
      sum += Number(obj.path);
      return sum;
    }, 0) / this.props.data.length);
  }

  render() {
    let button = '';
    if(this.props.airport !== '') {
      button = <div><div className="col-xs-12 text-center needInspiration">Need inspiration?</div><button onClick={this.props.findFlights} className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 text-center">Search Flights From This Airport</button></div>
    }
    let flightHeading = '';
    let firstListItem = '';
    if(this.props.flights.length > 0) {
      flightHeading = <h2  id="flightList" className="col-xs-12 text-center">Travel Inspiration</h2>
      let style = {fontSize: '20px'}
      firstListItem = <li style={style} className="col-xs-12">
        <div className="col-xs-2 col-xs-offset-1 text-center">Airline</div>
        <div className="col-xs-2 text-center">Departure</div>
        <div className="col-xs-2 text-center">Destination</div>
        <div className="col-xs-2 text-center">Price</div>
        <div className="col-xs-2 text-center">Return</div>
      </li>
    }



    return (
      <div className="datasection hidden" id="datasection">
        <div className="summaryStats">
          <h2 className="col-xs-12 text-center">Summary Statistics</h2>
          <h3 className="col-xs-12 text-center">
            {this.props.airport ? this.props.airport : ''} {this.props.airportName ? `(${this.props.airportName})` : ''}
          </h3>
          <h3 className="col-xs-12 text-center">
            {this.props.airline ? this.props.airline : ''} {this.props.airlineName ? `(${this.props.airlineName})` : ''}
          </h3>
          {button}
          <div className="percents col-xs-12 text-center">
            <div className="percent">Percent of Flights On Time: {this.props.statistics.aveOnTime || 0}%</div>
            <div className="percent">Percent of Flights Cancelled: {this.props.statistics.aveCancelled || 0}%</div>
            <div className="percent">Percent of Flights Delayed: {this.props.statistics.aveDelayed || 0}%</div>
            <div className="percent">Percent of Flights Diverted: {this.props.statistics.aveDiverted || 0}%</div>
          </div>
        </div>

        <div id="data" className="col-xs-12 text-center"></div>

        {flightHeading}
        <ul className="col-xs-12">
          {firstListItem}
          {this.props.flights.map((flight, index) => {
            return (<li className="col-xs-12" key={index}>
              <div className="col-xs-2 col-xs-offset-1 text-center">{flight.airline}</div>
              <div className="col-xs-2 text-center">{flight.departure_date.slice(5).split('-').join('/')}/{flight.departure_date.slice(0,4)}</div>
              <div className="col-xs-2 text-center">{flight.destination}</div>
              <div className="col-xs-2 text-center">{flight.price}</div>
              <div className="col-xs-2 text-center">{flight.return_date.slice(5).split('-').join('/')}/{flight.departure_date.slice(0,4)}</div>
            </li>)
          })}
        </ul>

      </div>
    );
  }
}
