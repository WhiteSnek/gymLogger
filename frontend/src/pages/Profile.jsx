import React, { useState } from "react";
import { NavBar, Sidebar } from "../components/Profile";
import LogWorkout from "../components/Profile/LogWorkout/LogWorkout";
import Dashboard from "../components/Profile/Dashboard/Dashboard";
import NewPlan from "../components/Profile/NewPlan/NewPlan";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
});

const Profile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "log workout":
        return <LogWorkout changeTab={changeTab} />;
      case "dashboard":
        return <Dashboard />;
      case "new plan":
        return <NewPlan />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="bg-zinc-800 flex justify-end  min-h-screen">
        <div className="col-span-1">
          <Sidebar changeTab={changeTab} activeTab={activeTab} />
        </div>
        <div className="col-span-6 w-full">
          <AppBar position="static" sx={{ backgroundColor: "#1a1919" }}>
            <Toolbar>
              <Typography variant="h6" component="div">
                {activeTab.toUpperCase()}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="min-h-[75vh]">{renderTabContent()}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Profile;
