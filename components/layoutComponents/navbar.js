// components/Navbar.js
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./sidebar";
import CodeIcon from "@mui/icons-material/Code";

export default function Navbar() {
  return (
    <>
      <nav>
        <div className="nav-wrapper bg-red-500">
          <Link href="/" className="brand-logo ml-5">
            Contesto
          </Link>
          <Sidebar />
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/calendar">Calendar</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
