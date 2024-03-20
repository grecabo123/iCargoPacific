import axios from 'axios';
import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import QRCode from "qrcode.react";
import Barcode from 'react-barcode'


function ListBooking() {



    const [loading, setLoading] = useState(true);
    const [business, setBusiness] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilter] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        tracking_number: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        // specific_role: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    })


    useEffect(() => {
        axios.get(`/api/BookingList`).then(res => {
            if (res.data.status === 200) {
                setBusiness(res.data.data);
            }
            setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }, []);



    const dateformat = (business) => {
        return (
            <span>{moment(business.created_at).format('MMMM DD YYYY')}</span>
        )
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilter(_filters);
        setGlobalFilterValue(value);
    };

    const header = () => {
        return (
            <div className="d-flex justify-content-end">
                {/* <h4>Employee Data</h4> */}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                </span>
            </div>
        );
    };

    const status_book = (business) => {
        return (
            <QRCode
                id={business.id}
                value={`${business.id}`}
                size={100}
                level={"H"}
                includeMargin={true}
            />
        )
    }

    const payment_status = (business) => {
        return (
            <Barcode value={business.id} width={2} height={60} />
        )
    }

    return (
        <div className='container-fluid'>
            <Panel header="List of Booking">
                <DataTable value={business} dataKey='id' filters={filters} globalFilterFields={['tracking_number']} header={header} loading={loading} paginator paginatorLeft rows={10}>
                    <Column field='tracking_number' filterField="tracking_number" header="Tracking Number"></Column>
                    <Column field='id' body={payment_status} header=""></Column>
                    <Column field='id' body={status_book} header=""></Column>
                    <Column field='created_at' body={dateformat} header="Book Registered"></Column>
                </DataTable>
            </Panel>
        </div>
    )
}

export default ListBooking