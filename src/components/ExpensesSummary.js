import React from 'react'
import { connect } from 'react-redux'
import getExpensesTotal from '../selectors/expenses.total'
import getVisibleExpenses from '../selectors/expenses'
import numeral from 'numeral'

export const ExpensesSummary = (props) => (
    <div>
        {props.expensesCount > 0 &&
        <p>Viewing {props.expensesCount} expense{props.expensesCount > 1 && 's'} totalling {props.expensesTotal}</p>
        }
    </div>
)

const mapStateToProps = (state) => ({
    expensesCount: getVisibleExpenses(state.expenses, state.filters).length,
    expensesTotal: numeral((getExpensesTotal(getVisibleExpenses(state.expenses, state.filters))) / 100).format('$0,0.00')
})

export default connect(mapStateToProps)(ExpensesSummary)