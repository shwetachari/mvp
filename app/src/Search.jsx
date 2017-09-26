class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
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
        // render top 25 in select list
        this.setState({
          options: res
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
          <label>Enter Airport Code or Name</label>
          <input name="airport" onChange={this.getValue.bind(this)}/>
          <label>Enter Airline Code or Name</label>
          <input name="airline" onChange={this.getValue.bind(this)}/>
        </div>

        <div className="col-xs-12">
          <select value={this.state.value} onChange={this.select.bind(this.props.parent, 'airport')}>
            <option value={['', '']}>Select an Airport</option>
            {this.state.options.map((airport, i) => {
              return (<option key={i} value={JSON.stringify([airport.airport.code, airport.airport.name])}>{airport.airport.name}({airport.airport.code})</option>);
            })}
          </select>
          <select value={this.state.value} onChange={this.select.bind(this.props.parent, 'airline')}>
            <option value={['', '']}>Select an Airline</option>
            {this.state.options.map((airline, i) => {
              return (<option key={i} value={JSON.stringify([airline.carrier.code, airline.carrier.name])}>{airline.carrier.name}({airline.carrier.code})</option>);
            })}
          </select>
        </div>

        <button onClick={this.props.getData}>Search</button>
      </div>
    )
  }
}
