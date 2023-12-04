import Header from '@/components/Header';
import dynamic from 'next/dynamic';
import { Box, Tab } from '@mui/material';
import React from 'react';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import GeneralTab from '@/components/GeneralTab';
import OverviewTab from '@/components/OverviewTab';
import LegendTab from '@/components/LegendTab';

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
    loading: () => <p>loading...</p>,
    ssr: false
})

export default function MapEditing() {
    const [tab, setTab] = React.useState('1');
    
    const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
        setTab(newTab);
    };

    return (
        <div>
            <Header />
            <Box sx={{
                height: "calc(100vh - 64px)",
                display: "flex",

            }}>
                <DynamicMap />
                <Box sx={{
                    minWidth: "400px",
                    overflow: "auto",
                }}>
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} centered>
                                <Tab label="General" value="1" />
                                <Tab label="Overview" value="2" />
                                <Tab label="Legend" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><GeneralTab /></TabPanel>
                        <TabPanel value="2"><OverviewTab /></TabPanel>
                        <TabPanel value="3"><LegendTab /></TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </div>
    )
}