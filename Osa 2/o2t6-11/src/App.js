import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas'
        }
      ],
      newName: '', 
    }
    this.uusiNumero = this.uusiNumero.bind(this)
  }

  uusiNumero = (event) => {
    event.preventDefault()
    var lastPerson = this.state.persons[this.state.persons.length-1].name

    const numero = {
      name: this.state.newName
    }

    /* Only works because added number is always the last index*/
    if (lastPerson === this.state.newName) {
      console.log("Duplicate name, dude");
      return
    }

    const numerot = this
      .state
      .persons
      .concat(numero)

    this.setState({persons: numerot, newName: ''})
  }

  handleUusiNumero = (event) => {
    this.setState({newName: event.target.value});
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.uusiNumero}>
          <div>
            nimi:
            <input value={this.state.newName} onChange={this.handleUusiNumero}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this
            .state
            .persons
            .map(person => <li key={person.name}>
              {person.name}
            </li>)}
        </ul>
      </div>
    )
  }
}

export default App