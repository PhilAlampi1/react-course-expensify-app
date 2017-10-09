import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

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
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('addExpense() sets up expense action object with default values', () => {
    const expenseDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseDefaults,
            id: expect.any(String)
        }
    })
})