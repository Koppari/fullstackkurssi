import React, {Component} from 'react';
import Country from './components/Country';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: '',
      clicked: '',
      showClicked: false
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data})
      })
  }

  individualCountry = (country) => {
    return (
      <div>
        <h1>{country.name}, {country.nativeName}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <img alt={country.name} src={country.flag} height="250" width="400"/>
      </div>
    )
  }

  handleSearch = (event) => {
    this.setState({search: event.target.value})
    this.setState({showClicked: false})
  }

  handleClick = (event) => {
    var country = event.target.innerHTML
    this.setState({clicked: country})
    this.setState({showClicked: true})
  }

  render() {
    let countries = this
      .state
      .countries
      .filter(country => country.name.toLowerCase().trim().indexOf(this.state.search.toLowerCase()) > -1)

    var countryList = countries.map(country => <Country key={country.name} country={country} onClick={this.handleClick}/>)

    if (this.state.search.trim().length === 0) {
      countryList = <div>Search for a country!</div>
    }

    if (this.state.showClicked === false && countryList.length <= 10 && countryList.length > 1) {
      countryList = countries.map(country => <Country key={country.name} country={country} onClick={this.handleClick}/>)
    } else if (countryList.length > 10) {
      countryList = <div>Too many results for your search. Try another filter.</div>
    } else if (this.state.showClicked === false && countryList.length === 1) {
      countryList = this.individualCountry(countries.find(country => <Country key={country.name}/>))
    } else if (countryList.length === 0) {
      countryList = <div>Your search term didn't match any countries!</div>
    } else if (this.state.showClicked === true && this.state.clicked !== '') {
      countryList = this.individualCountry(countries.find(country => country.name === this.state.clicked))
    }

    return (

      <div>
        <div>
          Find countries:
          <input value={(this.state.search)} onChange={this.handleSearch}/>
        </div>
        <div>
          {countryList}
        </div>
      </div>
    )
  }
}

export default App