class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airportOptions: [],
      airlineOptions: []
    };
  }

  select(query, event) {
    this.setState({
      [query]: JSON.parse(event.target.value)[0],
      [query + 'Name']: JSON.parse(event.target.value)[1]
    });
  }

  fetch(value, name) {
    $.ajax({
      url: `http://127.0.0.1:3000/airlines?${name}=${value}`,
      type: 'GET',
      'Content-Type': 'application/json',
      success: (res) => {
        this.setState({
          [name + 'Options']: res
        })
      },
      error: () => {
        console.log('error');
      }
    });
  }

  getValue(event) {
    this.fetch(event.target.value, event.target.name);
  }

  render() {
    return (
      <div>
        <div className="col-xs-12">
          <label className="col-xs-12 text-center">Enter Airport Code or Name</label>
          <input className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 text-center" name="airport" onChange={this.getValue.bind(this)}/>
          <label className="col-xs-12 text-center">Enter Airline Code or Name</label>
          <input className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 text-center" name="airline" onChange={this.getValue.bind(this)}/>
        </div>

        <label className="col-xs-12 text-center">Make Your Selection</label>
        <div className="col-xs-12 selects">
          <select className="col-xs-12 col-sm-5 col-sm-offset-1 col-md-4 col-md-offset-2 text-center" value={this.state.value} onChange={this.select.bind(this.props.parent, 'airport')}>
            <option value={JSON.stringify(['', ''])}>Select an Airport</option>
            {this.state.airportOptions.map((airport, i) => {
              return (<option key={i} value={JSON.stringify([airport.airport.code, airport.airport.name])}>{airport.airport.name}({airport.airport.code})</option>);
            })}
          </select>
          <select className="col-xs-12 col-sm-5 col-md-4 text-center" value={this.state.value} onChange={this.select.bind(this.props.parent, 'airline')}>
            <option value={JSON.stringify(['', ''])}>Select an Airline</option>
            {this.state.airlineOptions.map((airline, i) => {
              return (<option key={i} value={JSON.stringify([airline.carrier.code, airline.carrier.name])}>{airline.carrier.name}({airline.carrier.code})</option>);
            })}
          </select>
        </div>

        <button className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 text-center" onClick={this.props.getData}>Search</button>
      </div>
    )
  }
}
