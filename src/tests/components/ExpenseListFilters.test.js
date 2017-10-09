import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper
beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />)
})

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters with altFilters correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
    wrapper.find('input').simulate('change', {target: {value: altFilters.text}})
    expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text)
})

test('should sort by date', () => {
    wrapper.setProps({ // set sort by amount first
        filters: altFilters
    })
    wrapper.find('select').simulate('change', {target: {value: filters.sortBy}})
    expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
    wrapper.find('select').simulate('change', {target: {value: altFilters.sortBy}})
    expect(sortByAmount).toHaveBeenCalled()
})

// NOTE: you need to access the function on the prop of DateRangePicker,
// so you need a .prop() in there (vs. using simulate)
test('should handle date change', () => {
    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate: altFilters.startDate,
        endDate: altFilters.endDate
    })
    expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate)
})

test('should handle date focus changes', () => {
    // could test on null 'endDate' or 'startDate' (see DateRangePicker documentation)
    wrapper.find('DateRangePicker').prop('onFocusChange')('endDate')
    expect(wrapper.state('calendarFocused')).toBe('endDate')
})