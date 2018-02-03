import React from 'react'
import Number from './components/Number'
import Notification from './components/Notification'
import personsService from './services/persons'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      success: null,
      error: null
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
    var numero = {
      name: this
        .state
        .newName
        .trim(),
      number: this.state.newNumber
    }
    if (numero.name.trim() === '' || numero.number.trim() === '') {
      return
    }

    persons
      .forEach(function (item, array) {
        if (numero.name.toLowerCase() === item.name.toLowerCase()) {
          dup = true;
        }
      });

    if (dup === true) {
      var person = persons[
        this
          .state
          .persons
          .findIndex(p => p.name === numero.name)
      ]
      if (window.confirm(person.name + ' on jo luettelossa, haluatko vaihtaa numeroa?')) 
        personsService.update(person.id, numero).then(numero => {
          persons[persons.findIndex(p => numero.id === p.id)] = numero
          this.setState({persons: this.state.persons, success: "Numero muutettu!"})
          setTimeout(() => {
            this.setState({success: null})
          }, 3000)
        }).catch(error => {
          alert("Numero on poistettu sillä välin kun yritit muuttaa sitä!")
          this.setState({
            persons: this
              .state
              .persons
              .filter(p => p.id !== person.id)
          })
          setTimeout(() => {
            this.setState({success: null})
          }, 3000)
        })

      }
    else {
      personsService
        .create(numero)
        .then(numero => {
          this.setState({
            persons: this
              .state
              .persons
              .concat(numero),
            newName: '',
            newNumber: '',
            success: 'Numero lisätty!'
          })
          setTimeout(() => {
            this.setState({success: null})
          }, 3000)
        })
      dup = false;
    }
  }

  remove = (id) => {
    return () => {
      const person = this
        .state
        .persons
        .find(p => p.id === id)

      if (window.confirm('Poistetaanko henkilön ' + person.name + " numero?")) 
        personsService.remove(person.id).then(person => {
          this.setState({
            persons: this
              .state
              .persons
              .filter(p => p.id !== id),
            success: 'Numero poistettu!'
          })
          setTimeout(() => {
            this.setState({success: null})
          }, 3000)
        })
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

        <div>
          <table>
            {persons.map(person => <Number key={person.name} person={person} remove={this.remove(person.id)}/>)}
          </table>
        </div>

        <div>
          <Notification message={this.state.success}/>
          <Notification message={this.state.error}/>
        </div>

      </div>
    )
  }
}

export default App