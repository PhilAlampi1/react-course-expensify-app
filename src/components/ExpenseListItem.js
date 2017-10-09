import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

// NOTE: you are passing an object into props.dispatch below
export const ExpenseListItem = (props) => (
    <div>
        <Link to={`/edit/${props.expense.id}`}>
            <h3>{props.expense.description}</h3>
        </Link>
        <p>
            {numeral(props.expense.amount / 100).format('$0,0.00')}
            -
            {moment(props.expense.createdAt).format('MMMM Do, YYYY')}
        </p>
    </div>
)

// NO need to provide first argument set of connect since you are not drawing new data from state,
// you are using the prop.expense.id passed to the component above
export default ExpenseListItem