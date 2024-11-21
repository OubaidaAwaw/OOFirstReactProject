import { useEffect, useState } from "react"
import axios from 'axios'

export default function UpDateUser() {
  const [Name , SetName] = useState("")
  const [Email , SetEmail] = useState("")
  const [Pass , SetPass] = useState("")
  const [RePass , SetRePass] = useState("")
  const [Accept , SetAccept] = useState(false)
  const [EmailTakedBefore , SetEmailTakedBefore] = useState("")
  const IdUser = window.location.pathname.split('/').slice(-1)[0];
  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/showbyid/${IdUser}`)
    .then((Res) =>{
      if(Res.statusText === "OK")
      {
        SetName(Res.data[0].name)
        SetEmail(Res.data[0].email)
      }
    })
    
  },[])
  function Submit(e){
    e.preventDefault()
    SetAccept(true)
    if(Name !== "" && Pass === RePass && Pass.length >= 8){
      axios.post(`http://127.0.0.1:8000/api/user/update/${IdUser}`,{
        name: Name,
        email: Email,
        password: Pass,
        password_confirmation: RePass,
      })
      .then((res) => {
        if(res.statusText === "OK"){
          Reset(e)
          window.location.pathname = "/DashBoard/Users"
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