import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'

// NOTE - need to add this. in front of all props for this to work
export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense)
        // this.props.dispatch(editExpense(this.props.expense.id, expense)) // inline function (bad)
        this.props.history.push('/')
    }
    onRemove = () => {
        this.props.startRemoveExpense({
            id: this.props.expense.id
        })
        // this. props.dispatch(removeExpense({ id: this.props.expense.id })) // inline function (bad)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>
            </div>
        )
    }
}

// const EditExpensePage = (props) => {
//     return (
//         <div>
//             <ExpenseForm
//                 expense={props.expense}
//                 onSubmit={(expense) => {
//                     props.dispatch(editExpense(props.expense.id, expense))
//                     props.history.push('/')
//                 }}
//             />
//             <button onClick={() => {
//                 props.dispatch(removeExpense({ id: props.expense.id }))
//                 props.history.push('/')
//             }}>Remove</button>
//         </div>
//     )
// }

// props.match.params.id is the URL params passed in
const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
})

// NOTE - below you pass in the arguement reference, not the value (e.g. don't try to call this.props stuff). Take care of the values
// when calling these methods above.
// NOTE - added the props argument because method definitions above required it (I think that's why?)
const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)