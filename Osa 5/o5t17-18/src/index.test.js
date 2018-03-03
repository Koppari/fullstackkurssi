import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('reducer', () => {
    const initialState = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
        yhteensa: 0,
        keskiarvo: 0
    }

    it('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    it('hyva gets incremented', () => {
        const action = {
            type: 'HYVA'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({hyva: 1, neutraali: 0, huono: 0, yhteensa: 1, keskiarvo: 1})
    })

    it('huono and keskiarvo works', () => {
       const action = {
            type: 'HUONO'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({hyva: 0, neutraali: 0, huono: 1, yhteensa: 1, keskiarvo: -1}) 
    })
})
