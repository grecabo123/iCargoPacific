import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Business() {

    const [loading, setloading] = useState(true);

    const history = useHistory();

    return (
        <div className='container-fluid'>
            <Panel header="Business Account">
                <div className="d-flex justify-content-end align-items-center">
                    <Button onClick={() => history.push(`/admin/accounts/register`)} className='p-button-sm p-button-info' icon={PrimeIcons.PLUS} label='Register Account' />
                </div>
                <div className="mt-2">
                    <DataTable paginator paginatorLeft rows={10} loading={loading}>

                    </DataTable>
                </div>
            </Panel>
        </div>
    )
}

export default Business