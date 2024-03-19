import axios from 'axios'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Divider } from 'primereact/divider'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Panel } from 'primereact/panel'
import { Skeleton } from 'primereact/skeleton'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'

function Book() {

    const [loading, setloading] = useState(true);
    const [City, setCity] = useState([])

    useEffect(() => {
        axios.get(`/api/Cities`).then(res => {
            if (res.data.status === 200) {
                setCity(res.data.data);
            }
            else {

            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const list_city = City.map((data) => {
        return (
            { label: data.cities, value: data.id }
        )
    });

    return (
        <div className='container-fluid'>
            {
                loading ? <Skeleton />
                    :
                    <form>
                        <Panel header="Booking Form">
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 mb-2">
                                    <div className="mb-2">
                                    <Panel>
                                        
                                        </Panel>
                                    </div>
                                    <Panel header="Pickup Details">
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Name
                                                </label>
                                                <InputText className='w-100 p-inputtext-sm' name='name' />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Email
                                                </label>
                                                <InputText type='email' maxLength={11} className='w-100 p-inputtext-sm' name='name' />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Contact Number
                                                </label>
                                                <InputText keyfilter={'pint'} maxLength={11} className='w-100 p-inputtext-sm' name='name' />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>National ID
                                                </label>
                                                <InputText keyfilter={'pint'} maxLength={11} className='w-100 p-inputtext-sm' name='name' />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>City
                                                </label>
                                                <Dropdown placeholder='Choose City' className='w-100 p-inputtext-sm' options={list_city} filter />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Address
                                                </label>
                                                <InputText className='p-inputtext-sm w-100' name='address' />
                                            </div>

                                        </div>
                                    </Panel>
                                </div>
                                <div className="col-lg-12 col-sm-12 mb-2">
                                    <Panel header="Delivery Details">
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Name
                                                </label>
                                                <InputText className='w-100 p-inputtext-sm' name='name' />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Email
                                                </label>
                                                <InputText type='email' maxLength={11} className='w-100 p-inputtext-sm' name='name' />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Contact Number
                                                </label>
                                                <InputText keyfilter={'pint'} maxLength={11} className='w-100 p-inputtext-sm' name='name' />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>National ID
                                                </label>
                                                <InputText keyfilter={'pint'} maxLength={11} className='w-100 p-inputtext-sm' name='name' />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>City
                                                </label>
                                                <Dropdown className='w-100 p-inputtext-sm' options={list_city} placeholder='Choose City' filter />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Address
                                                </label>
                                                <InputText className='p-inputtext-sm w-100' name='address' />
                                            </div>
                                        </div>
                                    </Panel>
                                </div>
                            </div>
                            <Panel header="Shipment Details">
                                <div className="row">
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Item Details
                                        </label>
                                        <InputTextarea className='w-100' rows={3} cols={3} style={{ resize: 'none' }} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Special Instruction
                                        </label>
                                        <InputTextarea className='w-100' rows={3} cols={3} style={{ resize: 'none' }} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Reference No.
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Order No.
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>No. of Pieces
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Weight (Kg)
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Insurance Type
                                        </label>
                                        <Dropdown className='w-100 p-inputtext-sm' />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Insured Items Declared Value
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>COD Amount
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} />
                                    </div>
                                </div>
                            </Panel>

                            <div className="row">
                                <div className="col-lg-6 mb-2">
                                    <Panel className='mt-2' header="Price Information">
                                        <div className="row">
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Delivery Charges
                                                </label>
                                                <InputNumber className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Special Charges
                                                </label>
                                                <InputNumber disabled className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Extra Charges
                                                </label>
                                                <InputNumber className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Insurance Premium
                                                </label>
                                                <InputNumber className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Fuel Surcharge (10%)
                                                </label>
                                                <InputNumber className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Sales tax
                                                </label>
                                                <InputNumber className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Net Amount
                                                </label>
                                                <InputNumber className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                        </div>
                                    </Panel>

                                </div>
                                <div className="col-lg-6 mb-2 mt-2">
                                    <Panel header="Charges">
                                        <div className="row">
                                            <div className="col-lg-12 mb-2">
                                                <div className="col-12">
                                                    <Checkbox inputId="cb1" className='me-2' value="New York"></Checkbox>
                                                    <label htmlFor="cb1" className="p-checkbox-label">Time Definite</label>
                                                </div>
                                                <div className="col-12">
                                                    <Checkbox inputId="cb2" value="San Francisco" className='me-2'  ></Checkbox>
                                                    <label htmlFor="cb2" className="p-checkbox-label">Edible</label>
                                                </div>
                                                <div className="col-12">
                                                    <Checkbox inputId="cb3" className='me-2' value="Los Angeles" ></Checkbox>
                                                    <label htmlFor="cb3" className="p-checkbox-label">Holiday</label>
                                                </div>
                                                <div className="col-12">
                                                    <Checkbox inputId="cb3" className='me-2' value="Los Angeles" ></Checkbox>
                                                    <label htmlFor="cb3" className="p-checkbox-label">Fragile</label>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Special Charge
                                                </label>
                                                <InputNumber disabled className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Special Charge
                                                </label>
                                                <InputNumber disabled className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Special Charge
                                                </label>
                                                <InputNumber disabled className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Special Charge
                                                </label>
                                                <InputNumber disabled className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Special Charge
                                                </label>
                                                <InputNumber disabled className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                        </div>
                                    </Panel>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Button className='p-button-sm p-button-info' label='Save Book' />
                            </div>
                        </Panel>
                    </form>
            }
        </div>
    )
}

export default Book