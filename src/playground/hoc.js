// Higher Order Component (HOC)
// - A React component (HOC) that renders another component (regular component)
// HOCs are about reusing code, doing render hijacking, prop manipulation and abstract state

import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
)

// HOC to add a warning when the user is viewing sensitive info
// Pass ...props to WrappedComponent (needs to be spread out)
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info.</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {!!props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login</p>}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info="This is the detail" />, document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthenticated={false} info="This is the detail" />, document.getElementById('app'))