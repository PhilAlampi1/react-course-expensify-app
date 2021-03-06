import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startAddExpense } from '../actions/expenses'

// AddExpensePage needs to be a class-based component to avoid inline function (onSubmit)
// If you didn't do this, onSubmit would need to get recalculated on every render and re-render
// See commented out code below for old way.
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense) // new way
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        )
    }
}

// OLD WAY - created an inline function situation on Submit when changed for enzyme testing
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm 
//             onSubmit={(expense) => {
//                 {/* props.dispatch(addExpense(expense)) */} // old way, prior to test consideration, see below.
//                 props.onSubmit(expense) // new way
//                 props.history.push('/')
//             }}
//         />
//     </div>
// )

// Because addExpense() is an imported function above, it's going to be hard to test as a 
// "spy" in enzyme. Instead, define and pass in the "mapDispatchToProps" argument to connect as shown below:
const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage)