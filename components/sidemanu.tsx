'use client'
import React from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { PiNewspaperClippingFill} from "react-icons/pi";
import { RiCalendarScheduleFill} from "react-icons/ri";
import Image from "next/image";


import { usePathname } from "next/navigation";
import { GrCafeteria } from "react-icons/gr";
import { SiEclipseadoptium } from "react-icons/si";

function SideMenu(active:any) {
  const pathname = usePathname()
  
  const NAV_ITEMS: any = [
    {
      link: "/events",
      icon: <BiSolidMessageSquareEdit />      ,
      label: "Events",
    },
    {
        link: "/schedule",
        icon: <RiCalendarScheduleFill />,
        label: "Schedule",
      },
      {
        link: "/shops/vr-hub",
        icon:<SiEclipseadoptium />     ,
        label: "VR Hub",
      },
      {
        link: "/shops/cafe",
        icon: <GrCafeteria />   ,
        label: "cafe'25",
      },
    
  ];
  return  <main className="sideWidth-bn h-screen relative">
  <div className="z-20 sideWidth fixed top-0 left-0 h-screen  bg-zinc-900 p-10 text-white flex flex-col items-center justify-start gap-10">
    <div className="flex items-center h-60 w-60 justify-center bg-zinc-800  rounded-2xl p-10 mt-10 group">

<Image src="/images/logo-01.png" alt="Sidebar Image" width={150} height={500} className="h-[100%] w-[100%] object-contain" priority/>

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
