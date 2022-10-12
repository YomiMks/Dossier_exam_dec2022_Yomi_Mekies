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
  const [permissionsData, setPermissionsData] = useState([])
  useEffect(() => {
    fetchApiGetPermissions()
  }, []);

  useEffect(() => {
    setIsLogged(isLogged)

  }, [localStorage.getItem('auth')]);

  const fetchApiGetPermissions = async () => {
    const response = await fetch('http://localhost:8343/api/permission', {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const result = await response.json()
      setPermissionsData(result)
      return true
    } else {
      return false
    }
  }
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
              <Route path={"/structures"} element={<Structures  permissionsData={permissionsData}/>} />
              <Route path={"/partners"} element={<Partners permissionsData={permissionsData}/>} />
              <Route path={"/permissions"} element={<Permissions permissionsData={permissionsData}/>} />
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
