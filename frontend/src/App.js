import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import React from "react";


function App() {
  return (
    <div className="App">
      <h1>navbar</h1>
        <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/login"} element={<SignIn />}/>
            <Route path={'*'} element={<Error />}/>
        </Routes>
        <p>footer</p>
    </div>
  );
}

export default App;
