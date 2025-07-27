import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import './index.css'

// Polyfill for Buffer
import { Buffer } from 'buffer'
window.Buffer = Buffer

// Polyfill for global
window.global = window

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
) 