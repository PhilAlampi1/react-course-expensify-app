import authReducer from '../../reducers/auth'

test ('should set state.uid to action.uid on login', () => {
    const uid = '321'
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer(undefined, action)
    expect(state.uid).toBe(action.uid)
})

test ('should set state.uid to falsy on logout', () => {
    const action = { type: 'LOGOUT' }
    const prevState = { uid: '123' }
    const state = authReducer(prevState, action)
    expect(state.uid).toBeFalsy()
})