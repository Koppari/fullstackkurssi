import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({rivit}) => {
    return rivit.map(rivi => (
        <tbody>
            <tr> 
                <td>
                    <Statistic nimi={rivi.nimi} />
                </td>
                <td>
                    <Statistic statistiikka={rivi.statistiikka} />
                </td>
            </tr>
        </tbody>
    ));
}

const Statistic = ({nimi, statistiikka}) => (
    <div>
        {nimi} {statistiikka}
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

  vote = (arvo) => {
      return () => {
        if (arvo==="hyva") {
            this.setState({hyva: this.state.hyva+1})
            this.setState({keskiarvo: this.state.keskiarvo+1})
            this.setState({yhteensa: this.state.yhteensa+1})
        } else if (arvo==="neutraali") {
            this.setState({neutraali: this.state.neutraali+1})
            this.setState({yhteensa: this.state.yhteensa+1})
        } else if (arvo==="huono") {
            this.setState({huono: this.state.huono+1})
            this.setState({keskiarvo: this.state.keskiarvo-1})
            this.setState({yhteensa: this.state.yhteensa+1})
        } 
      }
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
        statistiikka:(((this.state.hyva/this.state.yhteensa)*100)).toFixed(1)+" %"
    }
    ]

    const ehdollinenRenderointi = () => {
         if (this.state.hyva+this.state.neutraali+this.state.huono === 0) {
            return (
                <div>
                    <p>ei yhtaan palautetta annettu</p>
                </div>
            )
         }
         return (
         <table>
            <Statistics
                rivit={rivit}
            />
         </table>
         )

    }

    return (
      <div>
        <h1>anna palautetta</h1>

        <Button
            handleClick={this.vote("hyva")}
            text="hyva"
        />
        <Button
            handleClick={this.vote("neutraali")}
            text="neutraali"
        />
        <Button
            handleClick={this.vote("huono")}
            text="huono"
        />

        <h1>statistiikka</h1>

        {ehdollinenRenderointi()}

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
