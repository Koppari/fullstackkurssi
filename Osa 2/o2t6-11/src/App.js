import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '040-123456'
        }, {
          name: 'Martti Tienari',
          number: '040-123456'
        }, {
          name: 'Arto Järvinen',
          number: '040-123456'
        }, {
          name: 'Lea Kutvonen',
          number: '040-123456'
        }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  uusiNumero = (event) => {
    event.preventDefault()

    var lastPerson = this.state.persons[this.state.persons.length - 1].name
    const numero = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    /* Only works because added number is always the last index.
    2 people can have the same number e.g if they use the same phone */
    if (lastPerson === numero.name || numero.name.trim().length === 0 || numero.number.trim().length === 0) {
      console.log("Your name/number is empty or a duplicate, dude");
      return
    }

    const numerot = this
      .state
      .persons
      .concat(numero)

    this.setState({persons: numerot, newName: '', newNumber: ''})
  }

  handleUusiNimi = (event) => {
    this.setState({newName: event.target.value});
  }

  handleUusiNumero = (event) => {
    this.setState({newNumber: event.target.value});
  }

  handleFilter = (event) => {
    this.setState({filter: event.target.value});
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
          <tbody>
            {persons.map(person => <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>)}
          </tbody>
        </table>

      </div>
    )
  }
}

export default App