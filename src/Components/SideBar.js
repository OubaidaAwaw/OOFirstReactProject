import { Link } from 'react-router-dom'
export default function SideBar() {
  return (
    <>
      <aside className="Side-Bar-Container">
        <Link className="Link-to-Page" to={"Users"}>Users Table</Link>
        <Link className="Link-to-Page" to={"CreateUser"}>Create User</Link>
      </aside>
    </>
  )
}
