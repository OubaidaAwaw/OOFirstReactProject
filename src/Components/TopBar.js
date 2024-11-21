import { Link } from "react-router-dom";
export default function TopBar() {
  return (
    <>
      <nav className="Top-Bar-Navigation-Container Header">
        <h1>Store</h1>
        <Link className="Btn-Link" to="/">Go To Web Site</Link>
      </nav>
    </>
    )
}