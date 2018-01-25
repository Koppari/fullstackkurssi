import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = ({kurssi}) => {
  return (
    <div>
        <Otsikko kurssi={kurssi.nimi} />
        <Sisalto osat={kurssi.osat} />
        <Yhteensa osat={kurssi.osat} />
    </div>
  )	  
}

const Otsikko = (props) => <h1>{props.kurssi}</h1>

const Sisalto = ({osat}) => osat.map(osa => (
	    <div>
            <p>{osa.nimi} {osa.tehtavia}</p>
      </div>
));	

const Yhteensa = ({osat}) => 
      <div>
		        <p>Yhteens� {osat[0].tehtavia+osat[1].tehtavia+osat[2].tehtavia} teht�v��</p>
	    </div>
	
const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
        <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
