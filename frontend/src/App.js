import {Route, Routes, useNavigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import React, {useEffect, useState} from "react";
import Permissions from "./pages/Permissions";
import Partners from "./pages/Partners";
import Structures from "./pages/Structures";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./components/surface/ResponsiveAppBar";
import CircularIndeterminate from "./components/feedBack/CircularIndeterminate";

function App() {
  const navigation = useNavigate();

  const [isLogged, setIsLogged] = useState(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).isLogged)

  const [user, setUser] = useState(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).user)
  const [permissionsData, setPermissionsData] = useState([])
  const [loading, setLoading] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);

  const [severity, setSeverity] = useState('');
  useEffect(() => {
    setIsLogged(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).isLogged)
    setIsLogged(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).user)
    console.log("useEffect isLogged ===>>",isLogged)
  }, [localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).isLogged]);
  useEffect(() => {
    fetchApiGetPermissions()
  }, []);



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
                  <Route index element={<Dashboard />} />
                  <Route path={"/structures"} element={<Structures  permissionsData={permissionsData}/>} />
                  <Route path={"/partners"} element={<Partners permissionsData={permissionsData}/>} />
                  <Route path={"/permissions"} element={<Permissions permissionsData={permissionsData}/>} />
                  <Route path={'*'} element={<Error />} />
                </Routes>
              </div>
              :
              <Routes>
                <Route
                    index
                    element={
                      <SignIn
                          loading={loading}
                          setLoading={setLoading}
                          msg={msg}
                          setMsg={setMsg}
                          severity={severity}
                          setSeverity={setSeverity}
                          error={error}
                          setError={setError}
                      />} />
                <Route path={'*'} element={<Error />} />
              </Routes>
        }
      </div>
  );
}

export default App;
