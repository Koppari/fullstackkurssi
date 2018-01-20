import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({rivit}) => {
    return rivit.map(rivi => (
        <div>
            <Statistic nimi={rivi.nimi} statistiikka={rivi.statistiikka} />
        </div>       
    ));
}

const Statistic = ({nimi, statistiikka}) => (
    <div>
        <p>{nimi} {statistiikka}</p>
    </div>
)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      huono: 0,
      neutraali: 0,
      keskiarvo: 0,
      yhteensa: 0,
    }
  }

  hyvaVote = () => {
    this.setState({
      hyva: this.state.hyva + 1,
      keskiarvo: this.state.keskiarvo + 1,
      yhteensa: this.state.yhteensa + 1
    })
  }

  neutraaliVote = () => {
    this.setState({
      neutraali: this.state.neutraali + 1,
      yhteensa: this.state.yhteensa + 1
    })
  }

  huonoVote = () => {
    this.setState({
      huono: this.state.huono + 1,
      keskiarvo: this.state.keskiarvo - 1,
      yhteensa: this.state.yhteensa + 1
    })
  }

  render() {
    const rivit = [
    {
        nimi:"hyva",
        statistiikka:this.state.hyva
    },
    {
        nimi:"neutraali",
        statistiikka:this.state.neutraali
    },
    {
        nimi:"huono",
        statistiikka:this.state.huono
    },
    {
        nimi:"keskiarvo",
        statistiikka:this.state.keskiarvo
    },
    {
        nimi:"prosentti",
        statistiikka:(((this.state.hyva/this.state.yhteensa)*100)).toFixed(1)
    }
    ]

    return (
      <div>
        <h1>anna palautetta</h1>

        <Button
            handleClick={this.hyvaVote}
            text="hyva"
        />
        <Button
            handleClick={this.neutraaliVote}
            text="neutraali"
        />
        <Button
            handleClick={this.huonoVote}
            text="huono"
        />

        <h1>statistiikka</h1>

        <Statistics
            rivit={rivit}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
