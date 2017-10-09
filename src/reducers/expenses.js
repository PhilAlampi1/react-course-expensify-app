// REDUCERS - They take in an action and spit out what the modified state should be

// Expense Reducer
// Default State is the starting point for state in the app
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

export default expensesReducer