import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import getVisibleExpenses from '../selectors/expenses'

// Unconnected component
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                    props.expenses.map((e) => (
                        <ExpenseListItem key={e.id} expense={e} />
                    ))
                )
        }

    </div>
)

// Map state to props
const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    }
}

// Put them together using "connect"
// Connected components are automatically reactive
export default connect(mapStateToProps)(ExpenseList)
