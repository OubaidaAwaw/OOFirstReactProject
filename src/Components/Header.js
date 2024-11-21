import { useState } from "react";
import {Link} from "react-router-dom"

export default function Header() {
  const [IsUser , SetIsUser] = useState(window.localStorage.getItem("Email"));
  function ResetLocal(){
    SetIsUser(null)
    window.localStorage.clear()
  }
  return (
    <header className="Header">
      <div className="Container">
        <ul className="Link-Pages">
          <li><Link className="Link-to-Page" to="/">Home</Link></li>
          <li><Link className="Link-to-Page" to="/DashBoard">DashBoard</Link></li>
          <li>OtherThing</li>
        </ul>
        <div className="Btns-Reg-Sign">
          { IsUser === null ?<>
          <Link className="Btn-Link" to={"/SignUp"}>SignUp</Link>
          <Link className="Btn-Link" to={"/SignIn"}>SignIn</Link>
          </> :
          <Link className="Btn-Link" onClick={ResetLocal}>Logout</Link>}
        </div>
      </div>
    </header>
  )
}