import axios from 'axios';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert'

function Login() {

    const [LoginData, setLogin] = useState({
        email: "",
        password: "",
        error: [],
    });
    const [btnloading, setBtnloading] = useState(false);
    const history = useHistory();    

    const handleInput = (e) => {
        e.persist();
        setLogin({...LoginData, [e.target.name] : e.target.value})
    }

    const LoginForm = (e) => {
        e.preventDefault();
        setBtnloading(true)
        const data ={
            email: LoginData.email,
            password: LoginData.password,
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/Login`,data).then(res => {
                if(res.data.status === 200) {
                    if(res.data.role === 1){
                        localStorage.setItem("auth_token", res.data.token);
                        localStorage.setItem("auth_id", res.data.id);
                        localStorage.setItem('auth_name', res.data.name);
                        history.push('/admin');
                        swal('Success', res.data.message, 'success')
                    }
                    else if(res.data.role === 2){

                    }
                    setBtnloading(false)
                }
                else{
                    setBtnloading(false)
                    setLogin({...LoginData, error: res.data.error});
                }
            }).catch((error) => {
                if(error.response.status === 500) {
                    swal("Warning",error.response.statusText,'warning');
                    setBtnloading(false)
                }
            })
        });
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center vh-100">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-5">
                        <form onSubmit={LoginForm}>
                            <div className="container">
                                <h1 className="text-center">Login</h1>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <label htmlFor="" className="form-label">
                                            Email
                                        </label>
                                        <InputText type='email' className='w-100 p-inputtext-sm' placeholder='Email Address' name='email' onChange={handleInput} />
                                        <span className='text-danger'>{LoginData.error.email}</span>
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <label htmlFor="" className="form-label">
                                            Password
                                        </label>
                                        <InputText type='password' className='w-100 p-inputtext-sm' placeholder='Password' name='password' onChange={handleInput} />
                                        <span className='text-danger'>{LoginData.error.password}</span>
                                    </div>
                                    <div className="mt-3">
                                        <Button loading={btnloading} className='w-100 p-button-info p-button-sm' label='Login' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login