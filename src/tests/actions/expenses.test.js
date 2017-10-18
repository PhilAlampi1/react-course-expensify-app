import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense,
    startEditExpense
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = 'TEST_UID_123'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

// .toBe will not work below. Use of "===" will never make strings / objects equal 
// Use toEqual() on objects or arrays
// Use toBe() on booleans, numbers and strings

// *** removeExpense() Test ***
test('removeExpense() sets up expense action object', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

// *** updateObject() Test ***
const updateObject = {
    description: 'yo you description',
    note: 'note this up',
    amount: 2032,
    createdAt: 1000
}

test('editExpense() sets up action object', () => {
    const action = editExpense('123abc', updateObject)
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: updateObject
    })
})

// *** addExpense() Tests ***
// NOTE: for id being returned below, it's a uuid, so use "expect.any(String)"
test('addExpense() sets up expense action object with provided values', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

// Add "done" as an argument to test when testing asynch (such as startAddExpense() below)
// This will make jest wait until "done()" is called below
test('should add expense to database and store', (done) => {
    // In startAddExpenses (in expenses.js actions file) we care about:
    // 1 - database call was successful
    // 2 - dispach of addExpense was successful (need mock-store to test this in redux)
    const store = createMockStore(defaultAuthState)
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseDefault = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        })
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault)
        done()
    })
})

test('should set up set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done()
    })
})

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[1].id
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        })
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy()
        done()
    })
})

// startEditExpense
test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[2].id
    const updates = {
        description: 'TEST DEBIT Card',
        note: 'EDIT TEST',
        amount: 10000000,
        createdAt: 1500
    }
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(updates)
        done()
    })
})

// test('addExpense() sets up expense action object with default values', () => {
//     const expenseDefaults = {
//         description: '',
//         note: '',
//         amount: 0,
//         createdAt: 0
//     }
//     const action = addExpense()
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseDefaults,
//             id: expect.any(String)
//         }
//     })
// })