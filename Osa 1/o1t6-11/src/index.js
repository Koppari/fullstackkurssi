import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      huono: 0,
      neutraali: 0
    }
  }

  hyvaVote = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  neutraaliVote = () => {
    this.setState({
      neutraali: this.state.neutraali + 1
    })
  }

  huonoVote = () => {
    this.setState({
      huono: this.state.huono + 1
    })
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>

        <button onClick={this.hyvaVote}>
            hyva
        </button>
        <button onClick={this.neutraaliVote}>
            neutraali
        </button>
        <button onClick={this.huonoVote}>
            huono
        </button>

        <h1>statistiikka</h1>
        <p>hyva {this.state.hyva}</p>
        <p>neutraali {this.state.neutraali}</p>
        <p>huono {this.state.huono}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
