const initialState = {
    hyva: 0,
    neutraali: 0,
    huono: 0,
    yhteensa: 0,
    keskiarvo: 0
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HYVA':
            return {
                ...state,
                hyva: state.hyva + 1,
                yhteensa: state.yhteensa + 1,
                keskiarvo: state.keskiarvo + 1
            }
        case 'NEUTRAALI':
            return {
                ...state,
                neutraali: state.neutraali + 1,
                yhteensa: state.yhteensa + 1
            }
        case 'HUONO':
            return {
                ...state,
                huono: state.huono + 1,
                yhteensa: state.yhteensa + 1,
                keskiarvo: state.keskiarvo - 1
            }
        default:
            return state
    }
}

export default counterReducer