import moment from 'moment'
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters'

// setTextFilter #1
// default values
test('should generate setTextFilter default action object', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

// setTextFilter #2
// provided values
test('should generate setTextFilter provided action object', () => {
    const action = setTextFilter('dudical')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'dudical'
    })
})

// sortByDate()
test('should generate sortByDate() provided action object', () => {
    const action = sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})

// sortByAmount()
test('should generate sortByAmount() provided action object', () => {
    const action = sortByAmount()
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

// setStartDate()
test('should generate set start date action object', () => {
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

// setEndDate()
test('should generate set end date action object', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})