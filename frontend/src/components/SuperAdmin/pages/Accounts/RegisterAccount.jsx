import axios from 'axios';
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel'
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert';

function RegisterAccount() {

    const history = useHistory();
    const [loading, setloading] = useState(true)
    const [RegisterData, setRegisterData] = useState({
        business_name: "",
        national_id: "",
        business_address: "",
        contact_person: "",
        mobile_number: "",
        email: "",
        url: "",
        shipments: "",

        // bank
        bank_name: "",
        account_title: "",
        account_number: "",
        branch_name: "",
        branch_code: "",
        swift_code: "",
        ntn: "",
        stn: "",
        iban: "",

        // account
        password: "",
    });

    const [pickcity, setPick] = useState([]);
    const [branchpick, setbranchpick] = useState([])
    const [product_pick, setProductpick] = useState([]);
    const [bookingenable, setBooking] = useState([]);
    const [Cities, setCity] = useState([]);
    const [branch, setBranch] = useState([])
    const [product_type, setProductType] = useState([])
    const [logofile, setLogoFile] = useState([]);
    const [nationalfile, setNationalfile] = useState([]);
    const toast = useRef(null)
    const bool = [
        { label: "Yes", value: 1 },
        { label: "No", value: 2 },
    ]

    useEffect(() => {
        axios.get(`/api/FetchAll`).then(res => {
            if (res.data.status === 200) {
                setCity(res.data.city)
                setBranch(res.data.branch)
                setProductType(res.data.product)
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }, []);

    const citylist = Cities.map((data) => {
        return (
            { label: data.cities, value: data.id }
        )
    })
    const branch_list = branch.map((data) => {
        return (
            { label: data.branch_name, value: data.id }
        )
    })
    const list_product = product_type.map((data) => {
        return (
            {label: data.product_name, value: data.id}
        )
    })

    const handleinput = (e) => {
        e.persist();
        setRegisterData({ ...RegisterData, [e.target.name]: e.target.value });
    }

    const handlenational = (e) => {
        e.persist();
        setNationalfile({ national: e.target.files[0] })
    }


    const handlefile = (e) => {
        e.persist();
        setLogoFile({ file: e.target.files[0] });
    }

    const RegisterBusiness = (e) => {
        e.preventDefault();
        const form = new FormData;

        form.append("business_name",RegisterData.business_name);
        form.append('national_id',RegisterData.national_id);
        form.append('business_address',RegisterData.business_address);
        form.append('contact_person',RegisterData.contact_person);
        form.append('mobile_number',RegisterData.mobile_number);
        form.append('email',RegisterData.email);
        form.append('url',RegisterData.url);
        form.append('shipments',RegisterData.shipments);

        // banks
        form.append('bank_name',RegisterData.bank_name);
        form.append('account_title',RegisterData.account_title);
        form.append('account_number',RegisterData.account_number);
        form.append('branch_name',RegisterData.branch_name);
        form.append('branch_code',RegisterData.branch_code);
        form.append('swift_code',RegisterData.swift_code);
        form.append('ntn',RegisterData.ntn);
        form.append('stn',RegisterData.stn);
        form.append('iban',RegisterData.iban);

        form.append('password',RegisterData.password);

        // files
        form.append('logofile',logofile.file);
        form.append('nationalfile',nationalfile.national);

        form.append('pickcity',pickcity);
        form.append('branchpick',branchpick);
        form.append('product_pick',product_pick);
        form.append('bookingenable',bookingenable);
        form.append('user_fk',localStorage.getItem('auth_id'));


        axios.post(`/api/RegisterBusiness`,form).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Registered Business Account",
                    detail: "Successfully",
                });
                document.getElementById('form').reset();
                setCity([])
                setbranchpick([])
                setBooking([])
                setProductType([])
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
                <div className="d-flex justify-content-end align-items-center mb-2">
                    <Button className='p-button-sm p-button-info' onClick={() => history.push(`/admin/accounts/business`)} label='Return Page' />
                </div>
            <Panel header="Register Account">
                <div className="mt-2">
                    {/* <Panel header="Business Account Information"> */}
                        {
                            loading ? <Skeleton />
                                :
                                <form onSubmit={RegisterBusiness} id='form'>
                                    <div className="row">
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                <span className='text-danger'>*</span>Branch
                                            </label>
                                            <Dropdown value={branchpick}  onChange={(e) => setbranchpick(e.value)} className='w-100 p-inputtext-sm' options={branch_list} filter placeholder='Choose Branch' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                <span className='text-danger'>*</span>Business Name
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='business_name' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                <span className='text-danger'>*</span>City
                                            </label>
                                            <Dropdown value={pickcity}  onChange={(e) => setPick(e.value)} className='w-100 p-inputtext-sm' options={citylist} filter placeholder='Choose City' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                <span className='text-danger'>*</span>Business Address
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='business_address' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                <span className='text-danger'>*</span> National ID
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='national_id' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                <span className='text-danger'>*</span>Customer Type
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Business Logo
                                            </label>
                                            <InputText type='file' className='w-100 p-inputtext-sm' onChange={handlefile} name='file' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                National ID Copy
                                            </label>
                                            <InputText type='file' className='w-100 p-inputtext-sm' name='national' onChange={handlenational} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Enable Booking Form
                                            </label>
                                            <Dropdown value={bookingenable}  onChange={(e) => setBooking(e.value)} className='w-100 p-inputtext-sm' options={bool} placeholder='Pick' />
                                        </div>

                                    </div>
                                    <Divider>
                                        <span>Contact Information</span>
                                    </Divider>
                                    <div className="row">
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Contact Person
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='contact_person' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Contact Number
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='mobile_number' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Email Address
                                            </label>
                                            <InputText type='email' className='w-100 p-inputtext-sm' name='email' onChange={handleinput} />
                                        </div>
                                    </div>
                                    <Divider>
                                        <span>Shipment Details</span>
                                    </Divider>
                                    <div className="row">
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Website URL
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' placeholder='https://' name='url' onChange={handleinput} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Product Type
                                            </label>
                                            <Dropdown value={product_pick}  onChange={(e) => setProductpick(e.value)} options={list_product} filter className='w-100 p-inputtext-sm' placeholder='Choose Product Type' />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Expected Average Shipments / Month
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' placeholder='' name='shipments' onChange={handleinput} />
                                        </div>
                                    </div>
                                    <Divider>
                                        <span>Bank Details</span>
                                    </Divider>
                                    <div className="row">
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Bank Name
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' name='bank_name' onChange={handleinput} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Account Title
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' name='account_title' onChange={handleinput} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Account Number
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' name='account_number' onChange={handleinput} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Branch Name
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' name='branch_name' onChange={handleinput} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Branch Code
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' name='branch_code' onChange={handleinput} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Swift Code
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' name='swift_code' onChange={handleinput} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                NTN
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' name='ntn' onChange={handleinput} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                STN
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' name='stn' onChange={handleinput} />
                                        </div>
                                        <div className="col-lg-4 mb-2">
                                            <label htmlFor="" className="form-label">
                                                IBAN
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' name='iban' onChange={handleinput} />
                                        </div>
                                    </div>
                                    <Divider>
                                        <span>Account Details</span>
                                    </Divider>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">
                                                Password
                                            </label>
                                            <InputText type='password' className='w-100 p-inputtext-sm' name='password' onChange={handleinput} />
                                        </div>
                                    </div>
                                    <Divider>

                                    </Divider>
                                    <div className="mt-2">
                                        <Button className='p-button-sm' label='Register Account' />
                                    </div>
                                </form>
                        }
                    {/* </Panel> */}
                </div>
            </Panel>
        </div>
    )
}

export default RegisterAccount