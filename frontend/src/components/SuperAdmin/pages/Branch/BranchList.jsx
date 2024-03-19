import axios from 'axios';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';
import moment from 'moment'

function BranchList() {

    const [loading, setLoading] = useState(true);
    const [branchdata, setBranch] = useState([]);
    const [visible, setVisible] = useState(false)
    const [DetailsDataVisible, setDetailsVisible] = useState(false)
    const [btnloading, setbtnloading] = useState(false);
    const [DetailsData, setDetails] = useState({
        branch_name: "",
        indicator: "",
        id: "",
        user_fk: "",
    });
    const [addbranch, setAdd] = useState({
        branch: "",
        error: [],
    });
    const toast = useRef(null);

    useEffect(() => {
        BranchFtech();
        return  () => {
            setLoading(true);
        }
    },[]);

    const BranchFtech = () => {
        axios.get(`/api/BranchName`).then(res => {
            if(res.data.status === 200) {
                setBranch(res.data.data)
            }
            setLoading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const handleinput = (e) => {
        e.persist();
        setAdd({...addbranch, [e.target.name] : e.target.value});
    }

    const AddBranch = (e) => {
        e.preventDefault();
        setbtnloading(true)
        const data = {
            user_fk: localStorage.getItem('auth_id'),
            branch: addbranch.branch,
        };

        axios.post(`/api/AddBranch`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Branch Added",
                    detail: "Successfully",
                });
                document.getElementById('form').reset();
                setVisible(false);
                BranchFtech();
        setbtnloading(true)

            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
                setbtnloading(false)

            }
        })
    }
    const buttonAction = (branchdata) => {
        return (
            <>
                <Button className='p-button-sm p-button-success m-2' icon={PrimeIcons.PENCIL} label='Edit' 
                    data-indicator={1}
                    data-name={branchdata.branch_name}
                    data-id={branchdata.id}
                    onClick={Details}
                />
                <Button className='p-button-sm p-button-danger m-2' icon={PrimeIcons.TRASH} label='Remove' 
                    data-indicator={2}
                    data-name={branchdata.branch_name}
                    data-id={branchdata.id}
                    onClick={Details}
                />
            </>
        )
    }

    const Details = (e) => {
        setDetailsVisible(true)
        setDetails({
            indicator: e.currentTarget.getAttribute('data-indicator'),
            branch_name: e.currentTarget.getAttribute('data-name'),
            id: e.currentTarget.getAttribute('data-id'),
            user_fk: localStorage.getItem('auth_id'),
        })
    }



    const dateformat = (branchdata) => {
        return (
            <span>{moment(branchdata.created_at).format('MMM DD YYYY')}</span>
        )
    }

    const handleupdate = (e) => {
        e.persist();
        setDetails({...DetailsData, [e.target.name] : e.target.value});
    }

    const UpdateBranch = (e) => {
        e.preventDefault();
        setbtnloading(true)
        const data = DetailsData;

        DetailsData.indicator == 1 ? 
        axios.put(`/api/UpdateBranch`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Branch has been Removed",
                    detail: "Successfully",
                });
                BranchFtech();
                document.getElementById('form').reset();
                setDetailsVisible(false);
                setbtnloading(false)

            }
            else{

            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
                setbtnloading(false)

            }
        })
        :
        axios.delete(`/api/RemoveBranch/${DetailsData.id}`).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Branch has been Removed",
                    detail: "Successfully",
                });
                setbtnloading(false)
                BranchFtech();
                document.getElementById('form').reset();
                setDetailsVisible(false);
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
                setbtnloading(false)

            }
        })
    }

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <Panel header="List of Branch">
                <div className="d-flex justify-content-end">
                    <Button onClick={(e) => setVisible(true)} className='p-button-sm p-button-info' icon={PrimeIcons.PLUS} label='Register Branch' />
                </div>

                <div className="mt-2">
                    <DataTable value={branchdata} rows={10} paginator paginatorLeft loading={loading}>
                        <Column field='branch_name' header="Branch Name"></Column>
                        <Column field='created_at' body={dateformat} header="Date Created"></Column>
                        <Column field='id' body={buttonAction} header="Actions"></Column>
                    </DataTable>
                </div>
            </Panel>

            <Dialog onHide={() => setVisible(false)} header="Register Branch" breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}  position='top' draggable={false} visible={visible} >
                <form onSubmit={AddBranch} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Branch Name
                                </label>
                                <InputText onChange={handleinput} className='w-100 p-inputtext-sm' name='branch' />
                            </div>
                            <div className="mt-2">
                                <Button className='w-100 p-button-sm p-button-info' loading={btnloading} label='Register'   />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>

            <Dialog visible={DetailsDataVisible} onHide={() => setDetailsVisible(false)} header={DetailsData.indicator == 1 ? "Edit Branch " : "Remove Branch"} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}  position='top' draggable={false}>
                <form onSubmit={UpdateBranch} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Branch Name
                                </label>
                                <InputText onChange={handleupdate} className='w-100 p-inputtext-sm' name='branch_name' value={DetailsData.branch_name} />
                            </div>
                            <div className="mt-2">
                                <Button loading={btnloading} className={`w-100 p-button-sm ${DetailsData.indicator == 1 ? 'Update Branch' : 'p-button-danger'}`} label={DetailsData.indicator == 1 ? "Update Branch Name" : "Remove Branch"} />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default BranchList