import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import React from "react";
import Permissions from "./pages/Permissions";
import Partners from "./pages/Partners";
import Structures from "./pages/Structures";
import CssBaseline from "@mui/material/CssBaseline";


function App() {

  return (
    <div className="App">
        <CssBaseline />
        <Routes>
            <Route path={"/"} element={<SignIn />}/>
            <Route path={"/dashboard"} element={<Dashboard />}/>
            <Route path={"/structures"} element={<Structures />}/>
            <Route path={"/partners"} element={<Partners />}/>
            <Route path={"/permissions"} element={<Permissions />}/>
            <Route path={'*'} element={<Error />}/>
        </Routes>
    </div>
  );
}

export default App;
