// libs
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

// src
import './index.css'
import App from './App'
import store, {history} from './store'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App />
            </div>
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'))

registerServiceWorker()
