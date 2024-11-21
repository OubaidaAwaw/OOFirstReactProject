import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import axios from 'axios' 
import { User } from "./Context/Context";

export default function Users() {
  const jak = useRef()
  const MoveDown = () =>{
    return jak.current.scrollIntoView({
      behavior: "smooth",
    })
  }
  const [UsersData , SetUsersData] = useState([])
  const [ReloaData ,SetReloaData] = useState(0)
  const Token = useContext(User).Auth.Token
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/user/show",null,{
      headers:{
        Accept: 'application/json',
        Authorization:`bearer ${Token}`,
      },
    })
    .then((Response) => {
      SetUsersData(Response.data)
      console.log(Response.data)
    })
    .catch((ErrRes) => console.log(ErrRes))
  } ,[ReloaData]) 

  function DeleteUser(IdUser){
    axios.delete(`http://127.0.0.1:8000/api/user/delete/${IdUser}`,{
      header:{
        Authorization:`bearer ${Token}`,
      },
    })
    .then((Res) => {
      if(Res.statusText === "OK")
      SetReloaData(Prev => Prev +1)
    })
    .catch((ErrRes)=> console.log(ErrRes))
  }
  return (
    <>
      <div className="ContainUsersTable">
        <table border="red">
          <thead>
            <tr>
              <td onClick={MoveDown}>Id</td>
              <td>user</td>
              <td>email</td>
              <td> Edit / Del</td>
            </tr>
          </thead>
          <tbody>
            {
              UsersData.map((UserData, Index) => {
                if(Index+1 === UsersData.length)
                {
                  return(
                    <tr ref={jak} key={Index}>
                      <td>{Index + 1}</td>
                      <td>{UserData.name}</td>
                      <td>{UserData.email}</td>
                      <td>
                        <span><Link className="Link-to-Page" to={`${UserData.id}`}>Edit</Link></span>
                          &#160;&#160;&#160;
                        <span style={{color:"red",}} onClick={() => DeleteUser(UserData.id)}>Del</span>
                      </td>
                    </tr>
                  )
                }
                return(
                  <tr key={Index}>
                    <td>{Index + 1}</td>
                    <td>{UserData.name}</td>
                    <td>{UserData.email}</td>
                    <td>
                      <span><Link className="Link-to-Page" to={`${UserData.id}`}>Edit</Link></span>
                        &#160;&#160;&#160;
                      <span style={{color:"red",}} onClick={() => DeleteUser(UserData.id)}>Del</span>
                    </td>
                  </tr>
              )})
            }
          </tbody>
        </table>
      </div>
    </>
  )
}