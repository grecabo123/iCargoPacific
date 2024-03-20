import React, { useRef } from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import swal from 'sweetalert'
import { Menubar } from 'primereact/menubar'
import { PrimeIcons } from 'primereact/api'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import SuperAdminRoutes from '../../routes/SuperAdminRoutes'
import {FcBookmark, FcBriefcase, FcBusiness, FcFile, FcFolder, FcHome, FcOpenedFolder, FcPlus} from 'react-icons/fc'
import {GoReport} from 'react-icons/go'
import logo from '../../assets/logo/icargo.png'
import {FaCartArrowDown, FaCodeBranch, FaDesktop, FaHome, FaMoneyBill, FaUsers} from 'react-icons/fa'

function Admin() {

    const menu = useRef(null);

    const Logout = () => {
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_id');
                localStorage.removeItem('auth_name');
                swal('Success', res.data.message, 'success');
                history.push('/login');
            }
        });
    }

    const items = [
        {
            label: 'Instruction',
            icon: 'pi pi-home',
            command: () => {
                history.push(`/admin`);
            }
        },
   
    
      
   
    ];

    let items_list = [
        { label: 'Settings', icon: 'pi pi-fw pi-cog', command: () => {
            history.push(`/admin/settings/config`)
        } },
        { label: 'My Account', icon: 'pi pi-fw pi-user', command: () => {
            history.push(`admin/myaccount`)
        } },
        { label: <span className='text-danger fw-bold' onClick={Logout}>Logout</span>, icon: 'pi pi-fw pi-power-off' },
    ];


    const history = useHistory();




    return (
        <>
            <div className="sidebar sidebar-dark sidebar-fixed" id="sidebar">
                <div className="sidebar-brand d-none d-md-flex">
                    <h5 className='text-center'>ADMINISTRATOR </h5>
                </div>
                {/* <div className="text-center mt-4">
                    <img src={logo} alt="" width={100} />
                </div> */}
                <ul className="sidebar-nav" data-coreui="navigation" data-simplebar="">
                    <li className="nav-item"><a className="nav-link fs-5">
                    </a></li>

                    <li className="nav-title">Pages</li>
                    <li className="nav-item"><a className="nav-link" href="/admin">
                        <FcHome className='nav-icon' /> Dashboard</a></li>
                    

                    <li className="nav-group"><a className="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        <FcBookmark className='nav-icon' /> Booking</a>
                    
                    </li>
                    <div className="collapse" id='collapseOne'>
                        <li className="nav-item"><Link className="nav-link" to="/admin/booking/form"><FcFile className='nav-icon' /> Form</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/booking/list"><FcOpenedFolder className='nav-icon' />List of Booking</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/booking/view"><FaCartArrowDown className='nav-icon' />View Orders</Link></li>
                    </div>

                    <li className="nav-group"><a className="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#payment">
                        <FaMoneyBill className='nav-icon' /> Payments</a>
                    
                    </li>
                    <div className="collapse" id='payment'>
                        <li className="nav-item"><Link className="nav-link" to="/admin/booking/form"><FcFile className='nav-icon' /> Form</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/booking/view"><FaCartArrowDown className='nav-icon' />View Orders</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/booking/orders"><FcFolder className='nav-icon' />My Orders</Link></li>
                    </div>
                    <li className="nav-group"><a className="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#accounts">
                        <FaUsers  className='nav-icon' />Accounts</a>
                    </li>
                    <div className="collapse" id='accounts'>
                        <li className="nav-item"><Link className="nav-link" to="/admin/accounts/business"><FcBusiness className='nav-icon' />Business Account</Link></li>
                    </div>
                    <li className="nav-group"><a className="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#reports">
                        <GoReport  className='nav-icon' /> Reports</a>
                    </li>
                    <div className="collapse" id='reports'>
                        <li className="nav-item"><Link className="nav-link" to="/admin/booking/form"><FcFile className='nav-icon' /> Shipment Report</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/booking/view"><FaCartArrowDown className='nav-icon' />Order Report</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/booking/orders"><FcFolder className='nav-icon' />Comment Report</Link></li>
                    </div>

                    <li className="nav-group"><a className="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#branch">
                        <FaCodeBranch className='nav-icon' /> Branch</a>
                    
                    </li>
                    <div className="collapse" id='branch'>
                        <li className="nav-item"><Link className="nav-link" to="/admin/branch/add"><FcPlus className='nav-icon' /> Add Branch</Link></li>
                    </div>
                    <li className="nav-group"><a className="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#product">
                        <FcBriefcase className='nav-icon' /> Product</a>
                    
                    </li>
                    <div className="collapse" id='product'>
                        <li className="nav-item"><Link className="nav-link" to="/admin/product/list"><span className='nav-icon' /> Add Product Type</Link></li>
                    </div>



                    {/* History */}
                    <li class="nav-title">History</li>
                    <li class="nav-item"><Link class="nav-link" to="/admin/logs">
                        <FaDesktop className='nav-icon' /> Activity Logs</Link></li>


                </ul>
            </div>
            <div className=" wrapper d-flex flex-column min-vh-100">
                
                <Menu model={items_list} popup ref={menu} id="popup_menu_left" />
                <Menubar model={items} end={
                    <>
                        <Avatar className='text-dark fw-bold' onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup shape='square' label='A' size='large' />
                    </>
                } />
                <div className="mt-2">
                    <Switch>
                        {
                            SuperAdminRoutes.map((routes, id) => {
                                return (
                                    routes.component && (
                                        <Route
                                            key={id}
                                            path={routes.path}
                                            exact={routes.exact}
                                            name={routes.name}
                                            render={(props) => <routes.component {...props} />}
                                        />
                                    )
                                )
                            })
                        }
                        <Redirect from='/admin' to="/admin/dashboard" />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default Admin