import { login, logout } from '../../actions/auth'

test('login() creates action object correctly with passed in uid', () => {
    const uid = '123'
    const action = login(uid)
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    })
})

test('logout() creates action object correctly', () => {
    const action = logout()
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})