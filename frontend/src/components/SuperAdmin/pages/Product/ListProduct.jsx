import axios from 'axios';
import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';

function ListProduct() {

    const [loading, setLoading] = useState(true);

    const [ProductList, setProduct] = useState([])
    const [visible, setVisible] = useState(false);
    const [DetailsProductdata, setDetails] = useState({
        product_name: "",
        user_fk: "",
        id: "",
        indicator: "",
    })
    const [detailsvisible, setDetailsVisible] = useState(false);
    const [Add, setAdd] = useState({
        product: "",
        error: [],
    });

    const toast = useRef(null);

    useEffect(() => {
        ProductType();
        return () => {
            setLoading(true);
        }
    }, []);


    const ProductType = () => {
        axios.get(`/api/ProductType`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.data);
            }
            else {

            }
            setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning')
            }
        })
    }
    const hanldeinput = (e) => {
        e.persist();
        setAdd({ ...Add, [e.target.name]: e.target.value });
    }

    const RegisterProduct = (e) => {
        e.preventDefault();
        const data = {
            product: Add.product,
            user_fk: localStorage.getItem('auth_id'),
        }
        axios.post(`/api/AddProduct`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Added Product",
                    detail: "Successfully",
                });
                document.getElementById('form').reset();
                setVisible(false);
                ProductType();
            }
            else {
                setAdd({ ...Add, error: res.data.error });
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const statusproduct = (ProductList) => {
        return (
            <>
                {
                    ProductList.status == 1 ? <Badge value={"Active"} severity={'success'} />
                        :
                        <Badge value={'Deactivate'} severity={'danger'} />
                }
            </>
        )
    }

    const ActionProduct = (ProductList) => {
        return (
            <>
                <Button data-id={ProductList.id}
                    data-name={ProductList.product_name}
                    onClick={DetailsProduct}
                    className='p-button-sm p-button-success m-2' icon={PrimeIcons.PENCIL} label='Edit' />
                {
                    ProductList.status == 1 ?
                        <Button data-id={ProductList.id} data-status={ProductList.status} onClick={Deactivate} className='p-button-sm p-button-danger m-2' icon={PrimeIcons.POWER_OFF} label='Deactivate' />
                        :
                        <Button data-id={ProductList.id} data-status={ProductList.status} onClick={Deactivate} className='p-button-sm p-button-info m-2' icon={PrimeIcons.POWER_OFF} label='Active' />

                }
            </>
        )
    }

    const Deactivate = (e) => {

        const data = {
            status: e.currentTarget.getAttribute('data-status'),
            id: e.currentTarget.getAttribute('data-id'),
             
        }

        axios.put(`/api/Deactivate`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Product Changed Status",
                    detail: "Successfully",
                });
                ProductType();  
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const DetailsProduct = (e) => {
        setDetailsVisible(true)
        setDetails({
            product_name: e.currentTarget.getAttribute('data-name'),
            id: e.currentTarget.getAttribute('data-id'),
            user_fk: localStorage.getItem('auth_id'),
        })
    }

    const handleupdate = (e) => {
        e.persist();
        setDetails({ ...DetailsProductdata, [e.target.name]: e.target.value });
    }

    const UpdateProduct = (e) => {
        e.preventDefault();
        const data = DetailsProductdata;
        axios.put(`/api/ProductUpdate`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Product Updated",
                    detail: "Successfully",
                });
                document.getElementById('form').reset();
                setDetailsVisible(false);
                ProductType();
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <Panel header="Add Product">
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setVisible(true)} className='p-button-sm p-button-info' label='Add Product' icon={PrimeIcons.PLUS} />
                </div>
                <div className="mt-2">
                    <DataTable value={ProductList} loading={loading} paginatorLeft paginator rows={10}>
                        <Column field='product_name' header="Product Name"></Column>
                        <Column field='status' body={statusproduct} header="Product Status"></Column>
                        <Column field='id' body={ActionProduct} header="Action"></Column>
                    </DataTable>
                </div>

                <Dialog header="Add Product Type" onHide={() => setVisible(false)} visible={visible} draggable={false} position='top' style={{ width: "50vw" }}>
                    <form onSubmit={RegisterProduct} id='form'>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        Product Name
                                    </label>
                                    <InputText onChange={hanldeinput} name='product' className='w-100 p-inputtext-sm' />
                                </div>
                                <div className="mt-2">
                                    <Button className='w-100' label='Register Product' />
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog>

                <Dialog header="Edit Details Product" visible={detailsvisible} draggable={false} position='top' style={{ width: "50vw" }} breakpoints={{ '960px': '75vw', '640px': '100vw' }}>
                    <form onSubmit={UpdateProduct} id='form'>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        Product Name
                                    </label>
                                    <InputText className='w-100 p-inputtext-sm' name='product_name' onChange={handleupdate} value={DetailsProductdata.product_name} />
                                </div>
                                <div className="mt-2">
                                    <Button className='w-100 p-button-success' label='Update Product' />
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog>
            </Panel>
        </div>
    )
}

export default ListProduct