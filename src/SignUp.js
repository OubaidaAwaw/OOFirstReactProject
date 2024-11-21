import { useState } from "react"
// import { useContext} from 'react'
import axios from 'axios'
// import { color } from './Context/Context'

// import { User } from "./Context/Context"

export default function SignUp() {

  const [Name , SetName] = useState("")
  // console.log(useContext(color))
  const [Email , SetEmail] = useState("")
  const [Pass , SetPass] = useState("")
  const [RePass , SetRePass] = useState("")
  const [Accept , SetAccept] = useState(false)
  // const UserNow = useContext(User)

  const [EmailTakedBefore , SetEmailTakedBefore] = useState("")
  function Submit(e){
    e.preventDefault()
    SetAccept(true)
    if(Name !== "" && Pass === RePass && Pass.length >= 8){
      axios.post("http://localhost:8000/api/register",{
        name: Name,
        email: Email,
        password: Pass,
        password_confirmation: RePass,
      })
      .then((res) => {
        if(res.statusText === "OK"){
          localStorage.setItem("Name",Name)
          localStorage.setItem("Email",Email)
          Reset(e)
          // UserNow. SetAuth('stored')
          window.location.pathname = "/"
        }
      })
      .catch((ErrRes) => SetEmailTakedBefore(ErrRes.response.data.message))
    }
  }
  function Reset(e){
    e.preventDefault()
    SetName("")
    SetEmail("")
    SetPass("")
    SetRePass("")
    SetEmailTakedBefore("");
  }
  return (
    <>
    <div className="Contain-Form">
      <form onSubmit={Submit} onReset={Reset} className="Form-SignUp">
        <div className="Input-Item">
          <label htmlFor="Name">Name</label>
          <input id="Name" type="text" value={Name} onChange={(e) => SetName(e.target.value)} required/>
        </div>
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
        <div className="Input-Item">
          <label htmlFor="RePass">RePassword</label>
          <input id="RePass" type="password" value={RePass} onChange={(e) => SetRePass(e.target.value)}/>
        </div>
        {Pass !== RePass && Accept && <div style={{width:"100%",textAlign:"center",}}><h2  style={{color:"red",}}>The passwords no match, Please Retry</h2></div>}
        <div className="Buttons-Form">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
  </div>
    </>
  )
}