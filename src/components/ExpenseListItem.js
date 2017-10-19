import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

// NOTE: you are passing an object into props.dispatch below
export const ExpenseListItem = (props) => (
    <Link className="list-item" to={`/edit/${props.expense.id}`}>
        <div>
            <h3 className="list-item__title">{props.expense.description}</h3>
            <span className="list-item__sub-title">{moment(props.expense.createdAt).format('MMMM Do, YYYY')}</span>
        </div>
        <h3 className="list-item__data">{numeral(props.expense.amount / 100).format('$0,0.00')}</h3>
    </Link>
)

// NO need to provide first argument set of connect since you are not drawing new data from state,
// you are using the prop.expense.id passed to the component above
export default ExpenseListItem