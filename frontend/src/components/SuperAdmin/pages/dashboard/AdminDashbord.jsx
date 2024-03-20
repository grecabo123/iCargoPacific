import React from 'react'
import { motion } from "framer-motion";
import { Card } from 'primereact/card';
import { FcAddressBook } from 'react-icons/fc';


function AdminDashbord() {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-lg-3 col-md-4 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Total Orders">
                            <div className="d-flex justify-content-between">
                                <span><FcAddressBook size={24} /></span>
                                <span>32</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>


            </div>
        </div>
    )
}

export default AdminDashbord