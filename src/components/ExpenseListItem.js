import React from 'react'
import { Link } from 'react-router-dom'

// NOTE: you are passing an object into props.dispatch below
export const ExpenseListItem = (props) => (
    <div>
        <Link to={`/edit/${props.expense.id}`}>
            <h3>{props.expense.description}</h3>
        </Link>
        <p>{props.expense.amount} - {props.expense.createdAt}</p>
    </div>
)

// NO need to provide first argument set of connect since you are not drawing new data from state,
// you are using the prop.expense.id passed to the component above
export default ExpenseListItem