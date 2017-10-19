import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import getExpensesTotal from '../selectors/expenses.total'
import getVisibleExpenses from '../selectors/expenses'

export const ExpensesSummary = (props) => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    Viewing <span>{props.expensesCount}</span> expense{(props.expensesCount > 1 || props.expensesCount === 0) && 's'} totalling <span>{props.expensesTotal}</span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    expensesCount: getVisibleExpenses(state.expenses, state.filters).length,
    expensesTotal: numeral((getExpensesTotal(getVisibleExpenses(state.expenses, state.filters))) / 100).format('$0,0.00')
})

export default connect(mapStateToProps)(ExpensesSummary)