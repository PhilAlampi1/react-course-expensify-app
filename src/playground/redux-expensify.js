// NOTE - AS OF OCT 2017, array spread operator (...) is in ES6 officially,
// object spread operator (...) has not, so Babel needs to be customized to 
// compile it

import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ***ACTIONS***
// ADD_EXPENSE
const addExpense = (
    { description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}) => ({
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    })

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

// ***REDUCERS***
// Expense Reducer
const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            // return [
            //     ...state.filter(expense => expense.id !== action.id)
            // ]
            // OR COULD DO THE BELOW: (retrun state.filter() and destructure expense into just the { id } item)
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    // Spread out the expense and action.updates objects
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default:
            return state
    }
}

// Filter Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

// NOTE - you can't use just "action.text" below, it needs to be "text: action.text",
// this is because destructuring won't work on action.text (not the same as text inherantly)
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = !text || expense.description.toString().toLowerCase().includes(text.toLowerCase()) 
        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })
}



// ***CREATE STORE***
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

// ***SUBSCRIBE TO STORE***
store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log('visible expenses', visibleExpenses)
})

// ***DISPATCH SOME ACTIONS***
const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: -11000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -1000 }))
// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))
// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter(''))
// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())
// store.dispatch(setStartDate(2000)) 

// store.dispatch(setStartDate(0)) // sets startDate to undefined
// store.dispatch(setEndDate(2000))


// ***NOT SURE IF YOU NEED THIS***
const demoState = {
    expenses: [{
        id: 'abcd',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}
