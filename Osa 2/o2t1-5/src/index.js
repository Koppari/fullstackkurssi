import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

const Otsikko = (props) => <h1>{props.kurssi}</h1>

const Sisalto = ({osat}) => osat.map(osa => (
  <div>
    <p>{osa.nimi} {osa.tehtavia}</p>
  </div>
));

const Yhteensa = ({osat}) => {
  const yhteensa = () => osat.reduce(function (sum, osa) {
    return sum + osa.tehtavia
  }, 0);

  return (
  <div > 
    Yhteensa {yhteensa()} tehtavaa
  </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      }, {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      }, {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }, {
        nimi: 'Esimerkki',
        tehtavia: 5,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi}/ > </div>)
}

ReactDOM
.render(
  <App/>, document.getElementById('root'))
