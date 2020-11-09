import React from 'react'
import ReactDOM from 'react-dom'
import { TemplateProvider, RoutesProvider } from './context'
import App from './App'

ReactDOM.render(
    <TemplateProvider>
        <RoutesProvider>
            <App />
        </RoutesProvider>
    </TemplateProvider>,
    document.getElementById('root')
)
