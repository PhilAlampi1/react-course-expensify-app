import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

// Set default state
test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT'})
    expect(state).toEqual([])
})

// Remove expense - valid id
test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

// Remove expense - invalid id
test('should not remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

// Add expense
test('should add an expense', () => {
    const expense = {
        id: '4',
        description: 'More Stuff',
        note: 'Good notes',
        amount: 100000,
        createdAt: 0
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, expense])
})

// Edit expense (correct id)
test('should edit an expense with a valid id', () => {
    const amount = 122000
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[1].amount).toBe(amount)
})

// Edit expense (wrong id)
test('should edit an expense with an INVALID id', () => {
    const amount = 122000
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            amount
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})