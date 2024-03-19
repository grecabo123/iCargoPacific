import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { Ripple } from 'primereact/ripple';


import '../node_modules/primereact/resources/themes/viva-light/theme.css';
import '../node_modules/primereact/resources/primereact.min.css';
import '../node_modules/primeicons/primeicons.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)
