import React from 'react'
import { shallow } from 'enzyme'
// import toJSON from 'enzyme-to-json'
import { Header } from '../../components/header'

// *react-test-renderer - renders something from JSX and lets you "assert" or expect against it
// *Use snapshots to test components (easier than trying to compare JSX)
// *Using shallow rendering below vs. full DOM rendering (use in lifecycle events, when you want to render child, etc.)
// *First time a snapshot test case runs, the original snapshot is created. Second time a snapshot test case runs, it can 
// compare the new snapshot with the original
// *When a snapshot test fails you have 2 choices: (1) make changes to code and rerun test OR (2) accept change and take a new 
// snapshot to compare future tests against
// HOWEVER - use enzyme instead of react-test-renderer (more robust and uses RTR on its own)

test('should render Header correctly', () => {
    // *** USING ReactShallowRenderer instead of Enzyme: ***
    // const renderer = new ReactShallowRenderer()
    // renderer.render(<Header />) // output we are trying to test
    // expect(renderer.getRenderOutput()).toMatchSnapshot()

    // *** USING Enzyme ***
    const wrapper = shallow(<Header startLogout={() => ({ })} />)
    // //Example:
    // expect(wrapper.find('h1').text()).toBe('Expensify')

    // toJSON ensures the snapshot only captures UI, not enzyme "stuff" that is added additionally
    // To prove this, remove to JSON below and look at header.test.js.snap ... there's extra crap there
    // expect(toJSON(wrapper)).toMatchSnapshot()
    // This version of the "expect" call is after we set up the jest.config.json to include:
    // "snapshotSerializers": [
    //     "enzyme-to-json/serializer"
    // ]
    expect(wrapper).toMatchSnapshot()
})

test('should call startLogout on button click', () => {
    const startLogout = jest.fn()
    const wrapper = shallow(<Header startLogout={startLogout} />)
    wrapper.find('button').simulate('click')
    expect(startLogout).toHaveBeenCalled()
})