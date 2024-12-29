'use client'
import React from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { GrUser } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { PiNewspaperClippingFill, PiUserCircleFill } from "react-icons/pi";
import { RiCalendarScheduleFill, RiSettings4Fill } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import classNames from "classnames";
import Image from "next/image";
// import Logout from "../../app/(admin)/login/logout";
import { usePathname } from "next/navigation";

function SideMenu(active:any) {
  const pathname = usePathname()
  
  const NAV_ITEMS: any = [
    {
      link: "/news/",
      icon: <PiNewspaperClippingFill />      ,
      label: "News",
    },
   
    {
      link: "/events",
      icon: <BiSolidMessageSquareEdit />      ,
      label: "events",
    },
    {
        link: "/schedule",
        icon: <RiCalendarScheduleFill />,
        label: "Schedule",
      },
    
  ];
  return  <main className="sideWidth-bn h-screen relative">
  <div className="z-20 sideWidth fixed top-0 left-0 h-screen  bg-zinc-900 p-10 text-white flex flex-col justify-between">
    <div className="flex items-center justify-center bg-zinc-800  rounded-2xl p-10 mt-10 group">

<Image src="/logo.png" alt="Sidebar Image" width={150} height={500} className="h-[100%] duration-300 z-50 group-hover:scale-105" priority/>

      {/* <img src="prism logo light dd.png" alt="" className="h-40 duration-300 group-hover:scale-105"/> */}
      </div>
    <div className="flex gap-2 flex-col w-full">{NAV_ITEMS.map((item:any,index:number)=>(
    <a href={item.link} key={index} className={`flex items-center gap-3 rounded-xl p-3 px-5 ${pathname == item.link && "bg-zinc-800"} hover:bg-zinc-800`}>
        <p className="text-xl">{item.icon}</p>
    <p  className="text-base text-white font-medium">{item.label}</p></a>
    ))}</div>
    
    {/* <Logout/> */}
  </div>
  </main>
}

export default SideMenu;
