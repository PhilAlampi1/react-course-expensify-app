import { createStore, combineReducers } from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

// "window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()" line
// is in order to use redux dev tools extension with the app you are making

export default () => {
    // ***CREATE STORE***
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}
