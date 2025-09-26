// 'use client'
// import React from "react";
// import { BiSolidMessageSquareEdit } from "react-icons/bi";
// import { PiNewspaperClippingFill} from "react-icons/pi";
// import { RiCalendarScheduleFill} from "react-icons/ri";
// import Image from "next/image";


// import { usePathname } from "next/navigation";
// import { GrCafeteria } from "react-icons/gr";
// import { SiEclipseadoptium } from "react-icons/si";
// import { GiRolledCloth } from "react-icons/gi";
// import { FaBookBookmark } from "react-icons/fa6";

// function SideMenu(active:any) {
//   const pathname = usePathname()
  
//   const NAV_ITEMS: any = [
//     {
//       link: "/events",
//       icon: <BiSolidMessageSquareEdit />      ,
//       label: "Events",
//     },
//     {
//         link: "/schedule",
//         icon: <RiCalendarScheduleFill />,
//         label: "Schedule",
//       },
//          {
//         link: "/shops/tajammul-mart",
//         icon: <GiRolledCloth />,
//         label: "Tajammul Mart",
//       },
//        {
//         link: "/shops/cafe",
//         icon: <GrCafeteria />   ,
//         label: "MG Cafe",
//       },
//        {
//         link: "/shops/papyrus",
//         icon: <FaBookBookmark  />   ,
//         label: "Papyrus",
//       },
//       {
//         link: "/shops/vr-hub",
//         icon:<SiEclipseadoptium />     ,
//         label: "VR Hub",
//       },
//       {
//         link: "/shops/cafe",
//         icon: <GrCafeteria />   ,
//         label: "MG Cafe",
//       },
    
//   ];
//   return  <main className="sideWidth-bn h-screen relative">
//   <div className="z-20 sideWidth fixed top-0 left-0 h-screen  bg-zinc-900 p-10 text-white flex flex-col items-center justify-start gap-10">
//     <div className="flex items-center h-60 w-60 justify-center bg-zinc-800  rounded-2xl p-10 mt-10 group">

// <Image src="/images/Secondary_Logo.png" alt="Sidebar Image" width={150} height={500} className="h-[100%] w-[100%] object-contain" priority/>

//       {/* <img src="prism logo light dd.png" alt="" className="h-40 duration-300 group-hover:scale-105"/> */}
//       </div>
//     <div className="flex gap-2 flex-col w-full">{NAV_ITEMS.map((item:any,index:number)=>(
//     <a href={item.link} key={index} className={`flex items-center gap-3 rounded-xl p-3 px-5 ${pathname == item.link && "bg-zinc-800"} hover:bg-zinc-800`}>
//         <p className="text-xl">{item.icon}</p>
//     <p  className="text-base text-white font-medium">{item.label}</p></a>
//     ))}</div>
    
//     {/* <Logout/> */}
//   </div>
//   </main>
// }

// export default SideMenu;
'use client'
import React, { useState, useEffect } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { PiNewspaperClippingFill} from "react-icons/pi";
import { RiCalendarScheduleFill} from "react-icons/ri";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { GrCafeteria } from "react-icons/gr";
import { SiEclipseadoptium } from "react-icons/si";
import { GiRolledCloth } from "react-icons/gi";
import { FaBookBookmark } from "react-icons/fa6";

function SideMenu(active:any) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Redirect to events page if on root path
  useEffect(() => {
    if (pathname === '/') {
      router.push('/events');
    }
  }, [pathname, router]);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close mobile menu on desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  const NAV_ITEMS: any = [
    {
      link: "/events",
      icon: <BiSolidMessageSquareEdit />,
      label: "Events",
    },
    {
      link: "/schedule",
      icon: <RiCalendarScheduleFill />,
      label: "Schedule",
    },
    {
      link: "/shops/tajammul-mart",
      icon: <GiRolledCloth />,
      label: "Tajammul Mart",
    },
    {
      link: "/shops/cafe",
      icon: <GrCafeteria />,
      label: "MG Cafe",
    },
    {
      link: "/shops/papyrus",
      icon: <FaBookBookmark />,
      label: "Papyrus",
    },
    {
      link: "/shops/vr-hub",
      icon: <SiEclipseadoptium />,
      label: "VR Hub",
    },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Helper function to check if current path matches the events page or root
  const isEventsActive = pathname === '/events' || pathname === '/';

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-menu-button fixed top-4 left-4 z-50 p-3 bg-zinc-900 text-white rounded-lg md:hidden"
        >
          {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" />
      )}

      {/* Desktop Sidebar */}
      <main className={`${isMobile ? 'hidden' : 'block'} sideWidth-bn h-screen relative`}>
        <div className="z-20 sideWidth fixed top-0 left-0 h-screen bg-zinc-900 p-10 text-white flex flex-col items-center justify-start gap-10">
          <div className="flex items-center h-60 w-60 justify-center bg-zinc-800 rounded-2xl p-10 mt-10 group">
            <Image 
              src="/images/Secondary_Logo.png" 
              alt="Sidebar Image" 
              width={150} 
              height={500} 
              className="h-[100%] w-[100%] object-contain" 
              priority
            />
          </div>
          <div className="flex gap-2 flex-col w-full">
            {NAV_ITEMS.map((item: any, index: number) => (
              <a 
                href={item.link} 
                key={index} 
                className={`flex items-center gap-3 rounded-xl p-3 px-5 ${
                  item.link === '/events' ? 
                    (isEventsActive ? "bg-zinc-800" : "") : 
                    (pathname === item.link ? "bg-zinc-800" : "")
                } hover:bg-zinc-800 transition-colors duration-200`}
              >
                <p className="text-xl">{item.icon}</p>
                <p className="text-base text-white font-medium">{item.label}</p>
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Dropdown Menu */}
      {isMobile && (
        <div className={`mobile-menu fixed top-0 left-0 h-screen w-80 bg-zinc-900 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}>
          <div className="p-6 pt-20">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center bg-zinc-800 rounded-2xl p-6 mb-8">
              <Image 
                src="/images/Secondary_Logo.png" 
                alt="Sidebar Image" 
                width={120} 
                height={120} 
                className="h-24 w-24 object-contain" 
                priority
              />
            </div>
            
            {/* Mobile Navigation Items */}
            <div className="flex gap-2 flex-col">
              {NAV_ITEMS.map((item: any, index: number) => (
                <a 
                  href={item.link} 
                  key={index}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 rounded-xl p-4 px-5 ${
                    item.link === '/events' ? 
                      (isEventsActive ? "bg-zinc-800" : "") : 
                      (pathname === item.link ? "bg-zinc-800" : "")
                  } hover:bg-zinc-800 transition-colors duration-200`}
                >
                  <p className="text-xl">{item.icon}</p>
                  <p className="text-base text-white font-medium">{item.label}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add some CSS classes if not already defined */}
      <style jsx>{`
        .sideWidth-bn {
          /* Add your existing sideWidth-bn styles here */
        }
        .sideWidth {
          /* Add your existing sideWidth styles here */
        }
        
        /* Prevent body scroll when mobile menu is open */
        ${isOpen && isMobile ? 'body { overflow: hidden; }' : ''}
      `}</style>
    </>
  );
}

export default SideMenu;