import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
	return (
	    <div>
		    <h1>{props.kurssi}</h1>
	    </div>
	)	
}

const Sisalto = ({osat}) => {
    return osat.map(osa => (
	    <div>
            <p>{osa.nimi} {osa.tehtavia}</p>
        </div>
	));	
}

const Yhteensa = ({osat}) => {
    return (
	    <div>
		    <p>Yhteens‰ {osat[0].tehtavia+osat[1].tehtavia+osat[2].tehtavia} teht‰v‰‰</p>
	    </div>
	)	
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonv‰litys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
		<div>
			<Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
		</div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)