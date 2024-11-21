import axios from "axios"
import { useState } from "react"

export default function CreateUser() {
  const [Name , SetName] = useState("")
  const [Email , SetEmail] = useState("")
  const [Pass , SetPass] = useState("")
  const [RePass , SetRePass] = useState("")
  const [Accept , SetAccept] = useState(false)
  const [EmailTakedBefore , SetEmailTakedBefore] = useState("")
  const [UserCreated, SetUserCreated] = useState(false);
  function Submit(e){
    e.preventDefault()
    SetAccept(true)
    if(Name !== "" && Pass === RePass && Pass.length >= 8){
      axios.post("http://127.0.0.1:8000/api/register",{
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
          SetUserCreated(true)
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
          <input id="Name" type="text" value={Name} onChange={function(e){SetName(e.target.value);SetUserCreated(false)}} required/>
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
          <button type="submit">Create</button>
          <button type="reset">Reset</button>
        </div>
      {UserCreated && <div style={{width:"100%",textAlign:"center",}}><h2  style={{color:"green",fontSize:"50px",}}>The user is created</h2></div>}
      </form>
  </div>
    </>
  )
}
