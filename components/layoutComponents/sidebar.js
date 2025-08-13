"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Info } from "@mui/icons-material";
export default function Sidebar() {
  useEffect(() => {
    // Make sure Materialize JS is initialized after the component is mounted
    if (typeof window !== "undefined") {
      const M = require("materialize-css");
      var elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems);
    }
  }, []);

  return (
    <>
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <Image
                src="/background.jpg"
                alt="background"
                width={300}
                height={30}
                priority
              />
            </div>
            <a href="#user">
              <Image
                className="circle"
                src="/Jeethendra.jpg"
                alt="Jeethendra"
                width={180}
                height={38}
                priority
              />
            </a>
            <a href="#name">
              <span className="white-text name">Jeethendra</span>
            </a>
            <a href="#email">
              <span className="white-text email">jeethendrajeethu8@gmail.com</span>
            </a>
          </div>
        </li>

        <li>
          <Link href="/"> <HomeIcon /> Home</Link>
        </li>
        <li>
          <Link href="/calendar"> <CalendarMonthIcon /> Calendar</Link>
        </li>
        <li>
          <Link href="/admin"> <AdminPanelSettingsIcon /> Admin</Link>
        </li>
        <li>
          <Link href="/about" className="waves"> <InfoIcon /> About</Link>
        </li>
      </ul>
      <a href="#" data-target="slide-out" className="sidenav-trigger">
        <MenuIcon />
      </a>
    </>
  );
}
