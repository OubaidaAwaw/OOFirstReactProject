import { Route, Routes } from "react-router-dom"
// import Header from "./Components/Header"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Home from "./Home"
import DashBoard from "./DashBoard"
import Users from "./Users"
import UpDateUser from "./UpDateUser"
import CreateUser from "./CreateUser"
import ReqAuth from "./Components/ReqAuth"
export default function App() {
  return(
      <>       
        {/* <Header /> */}
          <Routes>
            <Route path="/SignUp" element={<SignUp />}/>
            <Route path="/SignIn" element={<SignIn />}/>
            <Route path="/" element={<Home />}/>
            <Route element={<ReqAuth/>}>
              <Route path="/DashBoard" element={<DashBoard />}>
                <Route path="Users" element={<Users />}/>
                <Route path="Users/:id" element={<UpDateUser />}/>
                <Route path="CreateUser" element={<CreateUser />}/>
              </Route>           
            </Route>
          </Routes>
      </>
  )
}