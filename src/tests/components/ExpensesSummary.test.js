import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'

test('should render ExpensesSummary with no values passed', () => {
    const wrapper = shallow(<ExpensesSummary />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary with one item', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={9500} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary with multiple items', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={2} expensesTotal={9500} />)
    expect(wrapper).toMatchSnapshot()
})

// test('', () => {
    
// })