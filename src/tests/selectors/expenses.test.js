import moment from 'moment'
import selectExpenses from '../../selectors/expenses'
import expenses from '../fixtures/expenses'

// selectExpenses()
test('should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[1]])
})

// Need to use moment.js start and end dates
// Test startDate
test('should filter by start date', () => {
    const filters = {
        test: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[0]])
})

// Test endDate
test('should filter by end date', () => {
    const filters = {
        test: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[0], expenses[1]])
})

test('should sort by date', () => {
    const filters = {
        test: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
})

test('should sort by amount', () => {
    const filters = {
        test: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]])
})