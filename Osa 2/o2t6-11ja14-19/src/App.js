import React from 'react'
import Number from './components/Number'
import personsService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personsService
      .getAll()
      .then(response => {
        this.setState({persons: response})
      })
  }

  uusiNumero = (event) => {
    event.preventDefault()

    var dup = false;
    var persons = this.state.persons
    const numero = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if (numero.name.trim() === '' || numero.number.trim() === '') {
      console.log("Empty name or number!");
      return
    }

    persons
      .forEach(function (item, index, array) {
        if (numero.name.toLowerCase().trim() === item.name.toLowerCase().trim()) {
          dup = true;
        }
      });

    if (dup === true) {
      console.log("Duplicate name!");
      return
    } else {
      personsService
        .create(numero)
        .then(numero => {
          this.setState({
            persons: this
              .state
              .persons
              .concat(numero),
            newName: '',
            newNumber: ''
          })
        })
      dup = false;
    }
  }

  handleUusiNimi = (event) => {
    this.setState({newName: event.target.value})
  }

  handleUusiNumero = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilter = (event) => {
    this.setState({filter: event.target.value})
  }

  render() {
    let persons = this
      .state
      .persons
      .filter(person => person.name.toLowerCase().trim().indexOf(this.state.filter.toLowerCase()) > -1)

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          Etsi luettelosta:
          <input value={(this.state.filter)} onChange={this.handleFilter}/>
        </div>
        <h2>Uusi numero</h2>
        <form onSubmit={this.uusiNumero}>
          <div>
            Nimi:
            <input value={this.state.newName} onChange={this.handleUusiNimi}/>
          </div>
          <div>
            Numero:
            <input value={this.state.newNumber} onChange={this.handleUusiNumero}/>
          </div>
          <div>
            <button type="submit">Lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>

        <table>
          {persons.map(person => <Number key={person.name} person={person}/>)}
        </table>

      </div>
    )
  }
}

export default App