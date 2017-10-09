import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'

//***TEST IMPORTS***/
// import { addExpense } from './actions/expenses'
// import { setTextFilter} from './actions/filters'
// import getVisibleExpenses from './selectors/expenses'
// END TEST IMPORTS

import 'normalize.css/normalize.css' // Used to reset browser settings so styles can be applied fresh on next line
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

// TEST CALLS
// const expenseOne = store.dispatch(addExpense({ description: 'Water Bill', amount: 500, createdAt: -11000 }))
// const expenseTwo = store.dispatch(addExpense({ description: 'Gas Bill', amount: 300, createdAt: 2000 }))
// const expenseThree = store.dispatch(addExpense({ description: 'Rent', amount: 19500, createdAt: 1000 }))
// store.dispatch(setTextFilter('water'))
// store.dispatch(sortByDate())
// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'))
// }, 3000)
// const state = store.getState()
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
// console.log('visible expenses', visibleExpenses)
// END TEST CALLS


const jsx = (
    <Provider store={store}> 
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))
