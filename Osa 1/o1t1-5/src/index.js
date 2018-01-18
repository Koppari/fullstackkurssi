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
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
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

  return (
		<div>
			<Otsikko kurssi={kurssi} />
            <Sisalto osat={osat} />
            <Yhteensa osat={osat} />
		</div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
