import React, { useContext } from 'react'
import { User } from '../Context/Context'
import {Outlet , Navigate, useLocation} from "react-router-dom"

export default function ReqAuth() {
  const location = useLocation()
  console.log(location)
  const user = useContext(User)
  return (
    user.Auth.Token  ? <Outlet/> : <Navigate state={{from: location}} replace={true} to="/SignIn"/>
  )
}