// libs
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'

// src
import './index.css'
import App from './App'
import store, {history} from './store'
import registerServiceWorker from './registerServiceWorker'
import theme from './assets/react-toolbox/theme'
import './assets/react-toolbox/theme.css'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>
                <div>
                    <App />
                </div>
            </ThemeProvider>
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'))

registerServiceWorker()
