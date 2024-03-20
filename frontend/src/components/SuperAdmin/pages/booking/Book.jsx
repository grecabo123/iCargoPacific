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
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert'

function Book() {

    const [loading, setloading] = useState(true);
    const [City, setCity] = useState([])
    const [Business, setBusiness] = useState([])
    const [Branch, setBranch] = useState([]);

    // Register State
     // Dropdown
   
    const [servicepick, setServicepick] = useState([])
    const [citypick, setCityPick] = useState([])
    const [InsuranceType, setInsurance] = useState([])
    const [BusinessPick, setBusinessPick] = useState([])
    const [BranchPick, setBranchPick] = useState([])
    const [CityDelivery, setDeliveryCity] = useState([])

    // Time
    const [Time, setTime] = useState(0)
    const [Timecheck, setTimeCheck] = useState(false);
    const toast = useRef(null);
    // Edible
    const [Edibledata, setEdibledata] = useState(0)
    const [Edibledatacheck, setEdibledatacheck] = useState(false);

    // Holiday
    const [HolidayData, setHoliday] = useState(0)
    const [Holidaycheck, setHolidayCheck] = useState(false);

    // Fragile
    const [FragileData, setFragile] = useState(0)
    const [FragileCheck, setFragileCheck] = useState(false);
    const [BookformData, setBook] = useState({
        pickup_name: "",
        pickup_email: "",
        pickup_contact: "",
        pickup_national: "",
        pickup_address: "",

        delivery_name: "",
        delivery_email: "",
        delivery_contact: "",
        delivery_national: "",
        delivery_address: "",

        ship_item: "",
        ship_special: "",
        ship_reference: "",
        ship_order: "",
        ship_pieces: "",
        ship_weight: "",
        ship_insured: "",
        ship_amount: "",
    });

    const [DeliveryAmt, setDelivery] = useState(null)
    const [Extra, setExtra] = useState(null)


   


    const handleinput = (e) => {
        e.persist();
        setBook({...BookformData, [e.target.name] : e.target.value})
    }

   


    const AddBook = (e) => {
        e.preventDefault();

        const data = {
            // Dropdown data
            customer: BusinessPick,
            branch: BranchPick,
            service_type: servicepick,
            city: citypick,
            insurance: InsuranceType,

            // pickup details
            pickup_name: BookformData.pickup_name,
            pickup_email: BookformData.pickup_email,
            pickup_national: BookformData.pickup_national,
            pickup_address: BookformData.pickup_address,
            pickup_city: citypick,
            pickup_contact: BookformData.pickup_contact,

            // Delivery
            delivery_name: BookformData.delivery_name,
            delivery_email: BookformData.delivery_email,
            delivery_contact: BookformData.delivery_contact,
            delivery_national: BookformData.delivery_national,
            delivery_address: BookformData.delivery_address,
            delivery_city: CityDelivery,
            // Ship
            ship_item: BookformData.ship_item,
            ship_special: BookformData.ship_special,
            ship_reference: BookformData.ship_reference,
            ship_order: BookformData.ship_order,
            ship_pieces: BookformData.ship_pieces,
            ship_weight: BookformData.ship_weight,
            ship_insured: BookformData.ship_insured,
            ship_amount: BookformData.ship_amount,
            ship_insurance: InsuranceType,

            // Price
            fuel_charge: (Time * 0.1) + (Edibledata * 0.1) + (HolidayData * 0.1) + (FragileData * 0.1) + (DeliveryAmt * 0.1) + (Extra * 0.1),
            timeamount: Time,
            edible: Edibledata,
            holiday: HolidayData,
            fragile: FragileData,
            deliver_charges: DeliveryAmt,
            special_charge: Time + Edibledata + HolidayData + FragileData,
            // user
            user_fk: localStorage.getItem('auth_id'),
        }


        axios.post(`/api/RegisterBook`,data).then(res => {
            if(res.data.status === 200) {
                document.getElementById('form').reset();
                toast.current.show({
                    severity: "success",
                    summary: "Book Form Added",
                    detail: "Successfully",
                });
                setBusinessPick([])
                setBranchPick([])
                setServicepick([])
                setCityPick([])
                setDeliveryCity([])
                setInsurance([])
                setDelivery()
                setExtra()
                setTimeCheck(false)
                setEdibledatacheck(false)
                setHolidayCheck(false)
                setFragileCheck(false)
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
     
    }


    useEffect(() => {
        axios.get(`/api/BookFetchData`).then(res => {
            if (res.data.status === 200) {
                setCity(res.data.data);
                setBusiness(res.data.business)
                setBranch(res.data.branch)
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
    const list_business = Business.map((data) => {
        return (
            { label: data.business_name, value: data.business_id }
        )
    })

    const list_branch = Branch.map((data) => {
        return (
            { label: data.branch_name, value: data.id }
        )
    })

    const list_service = [
        {label: "COD" , value: 1},
    ];

    const TimeChange = (e) => {
        setTimeCheck(e.checked)
        setTime(!Timecheck ? 150 : 0)
    }

    const Edible = (e) => {
        setEdibledatacheck(e.checked)
        setEdibledata(!Edibledatacheck ? 150 : 0)
    }

    const Holiday = (e) => {
        setHolidayCheck(e.checked)
        setHoliday(!Holidaycheck ? 150 : 0)
    }

    const Fragile = (e) => {
        setFragileCheck(e.checked)
        setFragile(!FragileCheck ? 150 : 0)
    }


   

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            {
                loading ? <Skeleton />
                    :
                    <form onSubmit={AddBook} id='form'>
                        <Panel header="Booking Form">
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 mb-2">
                                    <div className="mb-2">
                                        <Panel>
                                            <div className="row">
                                                <div className="col-lg-4 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Customer
                                                    </label>
                                                    <Dropdown  value={BusinessPick} onChange={(e) => setBusinessPick(e.value)} filter options={list_business} className='w-100 p-inputtext-sm' placeholder='Choose Customer' />
                                                </div>
                                                <div className="col-lg-4 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Branch
                                                    </label>
                                                    <Dropdown value={BranchPick} onChange={(e) => setBranchPick(e.value)} filter options={list_branch} className='w-100 p-inputtext-sm' placeholder='Choose Branch' />
                                                </div>
                                                <div className="col-lg-4 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Service Type
                                                    </label>
                                                    <Dropdown value={servicepick} options={list_service} onChange={(e) => setServicepick(e.value)} className='w-100 p-inputtext-sm' placeholder='Choose Serice Type' />
                                                </div>
                                            </div>
                                        </Panel>
                                    </div>
                                    <Panel header="Pickup Details">
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Name
                                                </label>
                                                <InputText  className='w-100 p-inputtext-sm' name='pickup_name' onChange={handleinput} />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Email
                                                </label>
                                                <InputText type='email'  className='w-100 p-inputtext-sm' name='pickup_email' onChange={handleinput} />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Contact Number
                                                </label>
                                                <InputText keyfilter={'pint'} maxLength={11} className='w-100 p-inputtext-sm' name='pickup_contact' onChange={handleinput} />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>National ID
                                                </label>
                                                <InputText keyfilter={'pint'}  className='w-100 p-inputtext-sm' name='pickup_national' onChange={handleinput} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>City
                                                </label>
                                                <Dropdown value={citypick} onChange={(e) => setCityPick(e.value)} placeholder='Choose City' className='w-100 p-inputtext-sm' options={list_city} filter />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Address
                                                </label>
                                                <InputText  className='p-inputtext-sm w-100' name='pickup_address' onChange={handleinput} />
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
                                                <InputText className='w-100 p-inputtext-sm' name='delivery_name' onChange={handleinput} />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Email
                                                </label>
                                                <InputText type='email' className='w-100 p-inputtext-sm' name='delivery_email' onChange={handleinput} />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Contact Number
                                                </label>
                                                <InputText keyfilter={'pint'} maxLength={11} className='w-100 p-inputtext-sm' name='delivery_contact' onChange={handleinput} />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>National ID
                                                </label>
                                                <InputText keyfilter={'pint'} maxLength={11} className='w-100 p-inputtext-sm' name='delivery_national' onChange={handleinput} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>City
                                                </label>
                                                <Dropdown value={CityDelivery} onChange={(e) => setDeliveryCity(e.value)} className='w-100 p-inputtext-sm' options={list_city} placeholder='Choose City' filter />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Address
                                                </label>
                                                <InputText className='p-inputtext-sm w-100' name='delivery_address' onChange={handleinput} />
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
                                        <InputTextarea className='w-100' rows={3} cols={3} style={{ resize: 'none' }} name='ship_item' onChange={handleinput} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Special Instruction
                                        </label>
                                        <InputTextarea className='w-100' rows={3} cols={3} style={{ resize: 'none' }} name='ship_special' onChange={handleinput} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Reference No.
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} name='ship_reference' onChange={handleinput} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Order No.
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} name='ship_order' onChange={handleinput} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>No. of Pieces
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} name='ship_pieces' onChange={handleinput} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Weight (Kg)
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} name='ship_weight' onChange={handleinput} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Insurance Type
                                        </label>
                                        <Dropdown value={InsuranceType} onChange={(e) => setInsurance(e.value)} options={list_service} className='w-100 p-inputtext-sm' />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>Insured Items Declared Value
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} name='ship_insured' onChange={handleinput} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            <span className='text-danger'>*</span>COD Amount
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' keyfilter={'pint'} name='ship_amount' onChange={handleinput} />
                                    </div>
                                </div>
                            </Panel>

                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <Panel className='mt-2' header="Price Information">
                                        <div className="row">
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Delivery Charges
                                                </label>
                                                <InputNumber value={DeliveryAmt} onValueChange={(e) => setDelivery(e.value)} className='w-100 p-inputtext-sm'  name='price_delivery' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            {/* <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Special Charges
                                                </label>
                                                <InputNumber readOnly  className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div> */}
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Extra Charges
                                                </label>
                                                <InputNumber value={Extra} onValueChange={(e) => setExtra(e.value)} className='w-100 p-inputtext-sm' />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Insurance Premium
                                                </label>
                                                <InputNumber readOnly className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Fuel Surcharge (10%)
                                                </label>
                                                <InputNumber value={(Time * 0.1) + (Edibledata * 0.1) + (HolidayData * 0.1) + (FragileData * 0.1) + (DeliveryAmt * 0.1) + (Extra * 0.1)} readOnly className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Sales tax
                                                </label>
                                                <InputNumber readOnly className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Special Charge
                                                </label>
                                                <InputNumber value={Time + Edibledata + HolidayData + FragileData} readOnly className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                        </div>
                                    </Panel>

                                </div>
                                <div className="col-lg-12 mb-2 mt-2">
                                    <Panel header="Charges">
                                        <div className="row">
                                            <div className="col-lg-12 mb-2">
                                                <div className="col-12">
                                                    <Checkbox value={150} onChange={TimeChange} checked={Timecheck} inputId="cb1" className='me-2'></Checkbox>
                                                    <label htmlFor="cb1" className="p-checkbox-label">Time Definite</label>
                                                </div>

                                                <div className="col-12">
                                                    <Checkbox value={150} inputId="cb2" onChange={Edible} checked={Edibledatacheck} className='me-2'  ></Checkbox>
                                                    <label htmlFor="cb2" className="p-checkbox-label">Edible</label>
                                                </div>
                                                <div className="col-12">
                                                    <Checkbox value={150} inputId="cb3" onChange={Holiday} checked={Holidaycheck} className='me-2' ></Checkbox>
                                                    <label htmlFor="cb3" className="p-checkbox-label">Holiday</label>
                                                </div>
                                                <div className="col-12">
                                                    <Checkbox value={150} inputId="cb4" onChange={Fragile} checked={FragileCheck} className='me-2'  ></Checkbox>
                                                    <label htmlFor="cb4" className="p-checkbox-label">Fragile</label>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Time Definite
                                                </label>
                                                <InputNumber value={Time} readOnly className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Edible
                                                </label>
                                                <InputNumber value={Edibledata} readOnly className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Holiday
                                                </label>
                                                <InputNumber value={HolidayData} readOnly className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Fragile
                                                </label>
                                                <InputNumber value={FragileData} readOnly className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                                            </div>
                                            
                                        </div>
                                        Net Amount: ₱{(Time + Edibledata + HolidayData + FragileData + DeliveryAmt + (Time * 0.1) + (Edibledata * 0.1) + (HolidayData * 0.1) + (FragileData * 0.1) + (DeliveryAmt * 0.1) + (Extra * 0.1) + Extra).toFixed(2) }
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