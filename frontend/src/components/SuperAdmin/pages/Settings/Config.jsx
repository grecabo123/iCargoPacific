import React, { useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';


function Config() {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className='container-fluid'>
            <Panel header="Configuration">
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Company Details">
                        Content I
                    </TabPanel>
                    <TabPanel header="Header II">
                        Content II
                    </TabPanel>
                    <TabPanel header="Header III">
                        Content III
                    </TabPanel>
                </TabView>
            </Panel>
        </div>
    )
}

export default Config