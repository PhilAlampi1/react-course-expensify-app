import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, startRemoveExpense } from '../actions/expenses'

// NOTE - need to add this. in front of all props for this to work
export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense)
        // this.props.dispatch(editExpense(this.props.expense.id, expense)) // inline function (bad)
        this.props.history.push('/')
    }
    onRemove = () => {
        this.props.removeExpense({ 
            id: this.props.expense.id 
        })
        // this. props.dispatch(removeExpense({ id: this.props.expense.id })) // inline function (bad)
        this.props.history.push('/')
    } 
    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>Remove</button>
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
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)