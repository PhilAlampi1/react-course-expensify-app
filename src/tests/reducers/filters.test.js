import moment from 'moment'
import filtersReducer from '../../reducers/filters'


// Ensure defaults get set correction
// Redux uses @@INIT to initiate the default upon startup

// Set default values
test ('should set up default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

// sortBy Amount
test ('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'})
    expect(state.sortBy).toBe('amount')
})

// sortBy Date
test ('should set sortBy to date', () => {
    const defaultState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const action = { type: 'SORT_BY_DATE'}
    const state = filtersReducer(defaultState, action)
    expect(state.sortBy).toBe('date')
})

// text filter
test ('should set text filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text: 'sup'})
    expect(state.text).toBe('sup')
})

// set startDate
test ('should set startDate filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate: moment(0)})
    expect(state.startDate).toEqual(moment(0))
})

test ('should set end date filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_END_DATE', endDate: moment(0)})
    expect(state.endDate).toEqual(moment(0))
})

// test ('', () => {
    
// })