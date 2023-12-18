import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { Box, Skeleton, Tab } from "@mui/material";
import React, { useContext } from "react";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import GeneralTab from "@/components/GeneralTab";
import OverviewTab from "@/components/OverviewTab";
import OverviewBivarTab from "@/components/OverviewBivar";
import LegendTab from "@/components/LegendTab";
import MapContext from "@/components/MapContext";
import AuthContext from '@/components/authContext';
import InvalidAuthError from '@/components/InvalidAuthError';

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
    loading: () => <Skeleton></Skeleton>,
    ssr: false,
});

export default function MapEditing() {
    const authContext = React.useContext(AuthContext);
    const [tab, setTab] = React.useState("1");
    const mapContext = useContext(MapContext);

    const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
        setTab(newTab);
    };

    if(!authContext.isLoggedIn) return <InvalidAuthError />;
    return (
        <div>
            <Header />
            <Box
                sx={{
                    height: "calc(100vh - 64px)",
                    display: "flex",
                }}
            >
                <DynamicMap />
                <Box
                    sx={{
                        minWidth: "400px",
                        overflow: "auto",
                    }}
                >
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleTabChange} centered>
                                <Tab label="General" value="1" />
                                <Tab label="Overview" value="2" />
                                <Tab label="Legend" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <GeneralTab />
                        </TabPanel>
                        <TabPanel value="2">
                            {mapContext.mapType === "bivariate-choropleth" ? (
                                <OverviewBivarTab />
                            ) : (
                                <OverviewTab />
                            )}{" "}
                        </TabPanel>
                        <TabPanel value="3">
                            <LegendTab />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </div>
    );
}
