import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import { login, logout} from './actions/auth'
import { firebase } from './firebase/firebase'
import 'normalize.css/normalize.css' // Used to reset browser settings so styles can be applied fresh on next line
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
//***TEST IMPORTS***/
// import { setTextFilter} from './actions/filters'
// import getVisibleExpenses from './selectors/expenses'
// import './playground/promises'
// END TEST IMPORTS

const store = configureStore()
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid))
        store.dispatch(startSetExpenses()).then(() => {
            renderApp()
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        })
    } else {
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})



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
