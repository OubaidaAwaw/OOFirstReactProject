import { useContext, useState } from "react"
import axios from 'axios'
import { User } from "./Context/Context"
import { useNavigate } from "react-router-dom"

export default function SignIn() {
  const [Email , SetEmail] = useState("")
  const [Pass , SetPass] = useState("")
  const [Accept , ] = useState(false)
  const Authintication = useContext(User)
  const [EmailTakedBefore , SetEmailTakedBefore] = useState("")
  const first = useNavigate()
  function Submit(e){
    e.preventDefault()
    // SetAccept(true)
    if(Pass.length >= 8){
      axios.post("http://localhost:8000/api/login",{
        email: Email,
        password: Pass,
      })
      .then((res) => {
        if(res.statusText === "OK"){
          Authintication.SetAuth({Token : res.data.data.token,UserDetails: res.data.data.user})
          localStorage.setItem("Email",Email)
          Reset(e)
          first('/DashBoard',{state:{form: -1}})
        }
      })
      .catch((ErrRes) => SetEmailTakedBefore(ErrRes.response.data.message))
    }
  }
  function Reset(e){
    e.preventDefault()
    SetEmail("")
    SetPass("")
    SetEmailTakedBefore("");
  }
  return (
    <>
    <div className="Contain-Form">
      <form onSubmit={Submit} onReset={Reset} className="Form-SignUp">
        <div className="Input-Item">
          <label htmlFor="Email">Email</label>
          <input id="Email" type="email" value={Email} onChange={(e) => SetEmail(e.target.value)} required/>
        </div>
        {EmailTakedBefore.length !== 0 && <div style={{width:"100%",textAlign:"center",}}><h2  style={{color:"red",}}>{EmailTakedBefore}</h2></div>}
        <div className="Input-Item">
          <label htmlFor="Pass">Password</label>
          <input id="Pass" type="password" value={Pass} onChange={(e) => SetPass(e.target.value)}/>
        </div>
        {Pass.length < 8 && Pass.length > 0 && Accept && <div style={{width:"100%",textAlign:"center",}}><h2  style={{color:"red",}}>The password should be above 8 chars</h2></div>}
        <div className="Buttons-Form">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
  </div>
    </>
  )
}