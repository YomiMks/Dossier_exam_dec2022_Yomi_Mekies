import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import React, {useEffect, useState} from "react";
import Permissions from "./pages/Permissions";
import Partners from "./pages/Partners";
import Structures from "./pages/Structures";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./components/surface/ResponsiveAppBar";

function App() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).isLogged)
  const [user, setUser] = useState(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).user)
  console.log("isLogged", isLogged)
  useEffect(() => {
    console.log('islogd')
    setIsLogged(isLogged)

  }, [localStorage.getItem('auth')]);

  return (
    <div className="App">
      <CssBaseline />
      {
        isLogged
          ?
          <div>
            <ResponsiveAppBar user={user} />
            <Routes>
              <Route path={"/dashboard"} element={<Dashboard />} />
              <Route path={"/structures"} element={<Structures />} />
              <Route path={"/partners"} element={<Partners />} />
              <Route path={"/permissions"} element={<Permissions />} />
              <Route path={'*'} element={<Error />} />
            </Routes>
          </div>
          :
          <Routes>
            <Route path={"/"} element={<SignIn />} />
            <Route path={'*'} element={<Error />} />
          </Routes>
      }
    </div>
  );
}

export default App;
