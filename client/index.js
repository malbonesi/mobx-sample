import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import UserStore from './UserStore'
import UserPage from './pages/UserPage'

import './css/index.css'

const App = (props) => {
    return (
        <Provider store={props.store}>
            <UserPage />
        </Provider>
    )
}

let store = new UserStore()

ReactDOM.render(<App store={store} />, document.getElementById('app'))