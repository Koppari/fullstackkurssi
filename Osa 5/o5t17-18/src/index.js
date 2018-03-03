import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from "./reducer"

const store = createStore(counterReducer)

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
                    <Statistic nimi={rivi.nimi}/>
                </td>
                <td>
                    <Statistic statistiikka={rivi.statistiikka}/>
                </td>
            </tr>
        </tbody>
    ))
}

const Statistic = ({nimi, statistiikka}) => (
    <div>
        {nimi}
        {statistiikka}
    </div>
)

class App extends React.Component {
    render() {
        let rivit = [
            {
                nimi: "hyva",
                statistiikka: store
                    .getState()
                    .hyva
            }, {
                nimi: "neutraali",
                statistiikka: store
                    .getState()
                    .neutraali
            }, {
                nimi: "huono",
                statistiikka: store
                    .getState()
                    .huono
            }, {
                nimi: "yhteensa",
                statistiikka: store
                    .getState()
                    .yhteensa
            }, {
                nimi: "keskiarvo",
                statistiikka: store
                    .getState()
                    .keskiarvo
            }, {
                nimi: "prosentti",
                statistiikka: (((store.getState().hyva / store.getState().yhteensa) * 100)).toFixed(1) + " %"
            }
        ]

        const ehdollinenRenderointi = () => {
            if (store.getState().hyva + store.getState().neutraali + store.getState().huono === 0) {
                return (
                    <div>
                        <p>ei yhtaan palautetta annettu</p>
                    </div>
                )
            }
            return (
                <table>
                    <Statistics rivit={rivit}/>
                </table>
            )

        }

        return (
            <div>
                <h1>anna palautetta</h1>

                <Button handleClick={e => store.dispatch({type: 'HYVA'})} text="hyva"/>
                <Button
                    handleClick={e => store.dispatch({type: 'NEUTRAALI'})}
                    text="neutraali"/>
                <Button handleClick={e => store.dispatch({type: 'HUONO'})} text="huono"/>

                <h1>statistiikka</h1>

                {ehdollinenRenderointi()}

            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(
        <App/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
