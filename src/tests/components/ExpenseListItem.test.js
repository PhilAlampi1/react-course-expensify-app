import React from 'react'
import {shallow} from 'enzyme'
import { ExpenseListItem } from '../../components/ExpenseListItem'
import expenses from '../fixtures/expenses'

test('should render one expense in ExpenseListItem', () => {
    const wrapper = shallow(<ExpenseListItem id={expenses[0].id} expense={expenses[0]}/>)
    expect(wrapper).toMatchSnapshot()
})