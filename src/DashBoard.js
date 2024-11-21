import { Outlet } from "react-router-dom"
import SideBar from "./Components/SideBar"
import TopBar from "./Components/TopBar"
import './DashBoard.css'
export default function DashBoard() {
  return (
    <>
      <TopBar />
      <div className="ContainSideBarView">
        <SideBar />
        <Outlet />
      </div>
    </>
  )
}
