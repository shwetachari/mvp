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
    return (
      <div>
        <div className="summary-stats">
          <h2>Summary Statistics</h2>
          <h3>
            {this.props.airport ? this.props.airport : ''} {this.props.airportName ? `(${this.props.airportName})` : ''}
          </h3>
          <h3>
            {this.props.airline ? this.props.airline : ''} {this.props.airlineName ? `(${this.props.airlineName})` : ''}
          </h3>

          <div>Percent of Flights On Time: {this.props.statistics.aveOnTime || 0}%</div>
          <div>Percent of Flights Cancelled: {this.props.statistics.aveCancelled || 0}%</div>
          <div>Percent of Flights Delayed: {this.props.statistics.aveDelayed || 0}%</div>
          <div>Percent of Flights Diverted: {this.props.statistics.aveDiverted || 0}%</div>
        </div>

        <div id="data">

        </div>

      </div>
    );
  }
}
