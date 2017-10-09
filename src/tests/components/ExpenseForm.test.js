import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

// This originally failed because ExpenseForm.js calls moment() for createdAt in its state
// and when the second snapshot is taken, the second moment() rendering will not match the first.
// Fixed by creating a mock in __mocks__ for moment.js - that's where Jest will look for moment.js 
// when rendering a component for a test.
test('should render ExpenseForm with NO EXPENSE DATA correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm WITH EXPENSE DATA correctly', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
    expect(wrapper).toMatchSnapshot()
})

// Note, needed to add "preventDefault" to the simulate call because the event (e) wasn't being
// passed as expected in the ExpenseForm component. By passing "preventDefault" as a function
// returning nothing, we can get around what otherwise would have been an error.
test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot() // Ensure error doesn't render before submit
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0) // Checks if error was thrown
    expect(wrapper).toMatchSnapshot() // Ensure error renders after submit
})

// ".at(0)" lets you access the first input on the screen
// "target: { value }" lets you simulate the e.target.value passed into the change handler
test('should set description on input change', () => {
    const value = 'New description'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
    const value = 'New note'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('note')).toBe(value)
})

test('should set amount to a provided VALID value', () => {
    const value = '23.50'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount to a provided INVALID value', () => {
    const value = '12.122'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })
})

// "Spies" are the same as mocked functions
test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendarFocused on focus change', () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused})
    expect(wrapper.state('calendarFocused')).toBe(focused)
})