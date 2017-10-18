import uuid from 'uuid'
import database from '../firebase/firebase'

// ***NOTES ON ADDING DATABASE CALLS TO ACTIONS***
// 
// OLD WAY (no database call)
//  1 - component calls action generator
//  2 - action generator returns object 
//  3 - component dispatches object
//  4 - redux store changes
//
// NEW WAY (with database call)
//  1 - component calls action generator
//  2 - action generator returns function
//  3 - component dispatches function (using middleware)
//  4 - function runs (has ability to update the DB, then dispatch other actions
//      including those that dispatch objects to update the redux store)

// ADD_EXPENSE
// Why default to {} if no object is passed in?
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
})

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData
        const expense = { description, note, amount, createdAt }
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }))
        })
    }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses/${id}`)
            .update(updates)
            .then(() => {
                dispatch(editExpense(id, updates))
            })
    }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

// 1 - Fetch all expense data once
// 2 - Parse that data into an array
// 3 - Dispatch SET_EXPENSES
export const startSetExpenses = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses`)
            .once('value')
            .then((snapshot) => {
                const existingExpenses = []
                snapshot.forEach((childSnapshot) => {
                    existingExpenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                })
                dispatch(setExpenses(existingExpenses))
            })
    }
}