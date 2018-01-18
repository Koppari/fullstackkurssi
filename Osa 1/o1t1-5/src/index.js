import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
	return (
	    <div>
		    <h1>{props.kurssi}</h1>
	    </div>
	)	
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.nimi} {props.maara}</p>
        </div>
            
    )
}

const Sisalto = () => {
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonv‰litys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

	return (
	    <div>
            <Osa nimi={osa1} maara={tehtavia1}/>
            <Osa nimi={osa2} maara={tehtavia2}/>
            <Osa nimi={osa3} maara={tehtavia3}/>
		</div>
	)	
}

const Yhteensa = (props) => {
    return (
	    <div>
		    <p>Yhteens‰ {props.yhteensa} teht‰v‰‰</p>
	    </div>
	)	
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const tehtavia1 = 10
    const tehtavia2 = 7
    const tehtavia3 = 14

	return (
		<div>
			<Otsikko kurssi={kurssi} />
            <Sisalto />
            <Yhteensa yhteensa={tehtavia1+tehtavia2+tehtavia3}/>
		</div>
	)
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
