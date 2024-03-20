import axios from 'axios'
import moment from 'moment'
import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Image } from 'primereact/image'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert'

function Business() {

    const [loading, setloading] = useState(true);
    const [BusinessAccount, setBusiness] = useState([])
    const history = useHistory();

    useEffect(() => {
        axios.get(`/api/BusinessAccount`).then(res => {
            if(res.data.status === 200) {
                setBusiness(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning')
            }
        })
    },[])

    const dateformat = (BusinessAccount) => {
        return (
            <span>{moment(BusinessAccount.created_at).format('MMM DD YYYY')}</span>
        )
    }

    const logo_format = (BusinessAccount) => {
        return (
            <div>
                <Image src={`http://127.0.0.1:8000/${BusinessAccount.logo_img}`} width='70' preview />
            </div>
        )
    }

    const actionbutton = (BusinessAccount) => {
        return (
            <>
                <Button className='p-button-sm p-button-info' label='Details' icon={PrimeIcons.EYE} />
            </>
        )
    }

    const form_status = (BusinessAccount) => {
        return (
            <>
                {
                    BusinessAccount.status_form === 1 ? <Badge severity={'success'} value={'Yes'} />
                    :
                    <Badge severity={'danger'} value={'No'} />
                }
            </>
        )
    }

    return (
        <div className='container-fluid'>
            <Panel header="Business Account">
                <div className="d-flex justify-content-end align-items-center">
                    <Button onClick={() => history.push(`/admin/accounts/register`)} className='p-button-sm p-button-info' icon={PrimeIcons.PLUS} label='Register Account' />
                </div>
                <div className="mt-2">
                    <DataTable value={BusinessAccount} paginator paginatorLeft rows={10} loading={loading}>
                        <Column field='logo_img' body={logo_format} header="Business Logo"></Column>
                        <Column field='business_name' header="Business Name"></Column>
                        <Column field='email' header="Business Email"></Column>
                        <Column field='contact_number' header="Business Phone"></Column>
                        <Column field='status_form' body={form_status} header="Business Status"></Column>
                        <Column field='created_at' body={dateformat} header="Register Date"></Column>
                        <Column field='id' body={actionbutton} header="Action"></Column>
                    </DataTable>
                </div>
            </Panel>
        </div>
    )
}

export default Business