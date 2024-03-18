import React from 'react'
import axios from 'axios'
import PrimeReact from 'primereact/api';
import { Button } from 'primereact/button';

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})

function App() {

    PrimeReact.ripple = true;

    return (
        <div>
            <Button className='p-button-sm' />
        </div>
    )
}

export default App