"use client";
import React, { useState } from "react";
import { Tabs, Tab, Box, createTheme, ThemeProvider } from "@mui/material";
import StoreTable from "./StoreTable";
import MaintenanceTable from "./MaintenanceTable";

// Create a theme with the Tajawal font
const theme = createTheme({
  typography: {
    fontFamily: "Tajawal, sans-serif",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const PreviousRequestsTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          aria-label="product tabs"
          textColor="inherit"
          TabIndicatorProps={{
            style: { backgroundColor: "#02A09B" },
          }}
          sx={{
            "& .MuiTab-root": {
              fontSize: "1.1rem",
              color: "#0D0D0D",
            },
            "& .Mui-selected": {
              color: "black",
              fontWeight: "bold",
            },
          }}
        >
          <Tab label="المتجر" />
          <Tab label="الصيانة" />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <StoreTable />
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <MaintenanceTable />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default PreviousRequestsTabs;
