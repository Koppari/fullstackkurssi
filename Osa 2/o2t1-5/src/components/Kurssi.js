import React from 'react'

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
    return (
        <div>
            Yhteensa {osat
                .reduce(function (sum, osa) {
                    return sum + osa.tehtavia
                }, 0)}
            tehtavaa
        </div>
    )
}

export default Kurssi
