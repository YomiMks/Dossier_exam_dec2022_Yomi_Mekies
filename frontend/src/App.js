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
import {
  URL,
  PORT,
  ENDPOINT_API,
  ENDPOINT_PERMISSION,
  ENDPOINT_PARTNERS_PERMISSIONS,
  ENDPOINT_USER,
  ENDPOINT_PARTNERS,
  ENDPOINT_STRUCTURE
} from "./constant";
import CustomizedSnackbars from "./components/feedBack/SnackBarNotif";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
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
  const [partnersData, setPartnersData] = useState([]);
  const [structureData, setStructureData] = useState([]);
  const [partnersPermissionsData, setPartnersPermisisonsData] = useState([]);
  const [structuresPermissionsData, setStructuressPermisisonsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [openSnackBars, setOpenSnackBars] = useState(false);

  useEffect(() => {
    setIsLogged(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).isLogged)
    setUser(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).user)
  }, [localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).isLogged]);
  useEffect(() => {
    setLoading(true)
    fetchApiGetPermissions()
    fetchApiGetPartners()
    fetchApiGetUser()
    fetchApiGetPartnersPermissions()
    fetchApiGetStructure()
    fetchApiGetStructuresPermissions()
    setLoading(false)
  }, []);
// 'http://localhost:5545/api/permission'
  const fetchApiGetPermissions = async () => {
    const response = await fetch(`${URL  +  ENDPOINT_API + ENDPOINT_PERMISSION}`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
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
  const fetchApiGetPartners = async () => {
    const response = await fetch(`${URL +  ENDPOINT_API + ENDPOINT_PARTNERS}`,{
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if(response.ok){
      const result = await response.json()
      setPartnersData(result)
      return true
    }else{
      return false
    }
  }
  const fetchApiGetUser = async () => {
    const response = await fetch(`${URL  +  ENDPOINT_API + ENDPOINT_USER}`,{
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if(response.ok){
      const result = await response.json()
      setUsersData(result)
      return true
    }else{
      return false
    }
  }
  const fetchApiGetPartnersPermissions = async () => {
    const response = await fetch(`${URL +  ENDPOINT_API + ENDPOINT_PARTNERS_PERMISSIONS}`,{
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if(response.ok){
      const result = await response.json()
      setPartnersPermisisonsData(result)
      return true
    }else{
      return false
    }
  }
  const fetchApiGetStructuresPermissions = async () => {
    const response = await fetch(`${URL +  ENDPOINT_API + ENDPOINT_PARTNERS_PERMISSIONS}`,{
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if(response.ok){
      const result = await response.json()
      setStructuressPermisisonsData(result)
      return true
    }else{
      return false
    }
  }
  const fetchApiGetStructure = async () => {
    const response = await fetch(`${URL  +  ENDPOINT_API + ENDPOINT_STRUCTURE}`,{
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if(response.ok){
      const result = await response.json()
      setStructureData(result)
      return true
    }else{
      return false
    }
  }
  return (
      <div className="App">
        <CssBaseline />
        {
          loading &&
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
        }
        {
          isLogged
              ?
              <div>
                <ResponsiveAppBar user={user} />
                <Routes>
                  <Route index element={
                    <Dashboard
                        structuresData={structureData}
                        partnersData={partnersData}/>} />
                  <Route path={"/structures"} element={
                    <Structures
                        setStructureData={setStructureData}
                        structuresData={structureData}
                        permissionsData={permissionsData}
                        structuresPermissionsData={structuresPermissionsData}
                        usersData={usersData}
                        structureData={structureData}
                        loading={loading}
                        setLoading={setLoading}
                        msgSuccess={msgSuccess}
                        setMsgSuccess={setMsgSuccess}
                        severity={severity}
                        setMsg={setMsg}
                        setSeverity={setSeverity}
                        error={error}
                        setError={setError}
                        partnersData={partnersData}
                        setPartnersData={setPartnersData}
                        openSnackBars={openSnackBars}
                        setOpenSnackBars={setOpenSnackBars}
                    />} />
                  <Route path={"/partners"} element={
                    <Partners
                        partnersPermissionsData={partnersPermissionsData}
                        usersData={usersData}
                        loading={loading}
                        setLoading={setLoading}
                        msgSuccess={msgSuccess}
                        setMsgSuccess={setMsgSuccess}
                        severity={severity}
                        setMsg={setMsg}
                        setSeverity={setSeverity}
                        error={error}
                        setError={setError}
                        partnersData={partnersData}
                        setPartnersData={setPartnersData}
                        permissionsData={permissionsData}
                        openSnackBars={openSnackBars}
                        setOpenSnackBars={setOpenSnackBars}
                    />} />
                  <Route path={"/permissions"} element={
                    <Permissions
                        permissionsData={permissionsData}/>} />
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
                          openSnackBars={openSnackBars}
                          setOpenSnackBars={setOpenSnackBars}
                          setSeverity={setSeverity}
                      />} />
                <Route path={'*'} element={<Error />} />
              </Routes>
        }
        <CustomizedSnackbars msg={msg} severity={severity} open={openSnackBars} setOpen={setOpenSnackBars}/>
      </div>
  );
}

export default App;
