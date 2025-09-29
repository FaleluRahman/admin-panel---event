'use client'
import React, { useState, useEffect } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { PiNewspaperClippingFill} from "react-icons/pi";
import { RiCalendarScheduleFill} from "react-icons/ri";
import { HiMenuAlt3, HiX, HiChevronDown, HiChevronRight } from "react-icons/hi";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { GrCafeteria } from "react-icons/gr";
import { SiEclipseadoptium } from "react-icons/si";
import { GiRolledCloth } from "react-icons/gi";
import { FaBookBookmark } from "react-icons/fa6";
import { Award, Store } from "lucide-react";

function SideMenu(active:any) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = useState<{[key: string]: boolean}>({});

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

  // Auto-expand dropdown if current path matches a child item
  useEffect(() => {
    const newExpanded = { ...expandedDropdowns };
    NAV_ITEMS.forEach((item: any, index: number) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child: any) => pathname === child.link);
        if (hasActiveChild) {
          newExpanded[`dropdown-${index}`] = true;
        }
      }
    });
    setExpandedDropdowns(newExpanded);
  }, [pathname]);
  
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
      link: "/award_point",
      icon: <Award />,
      label: "Award point",
    },
    {
      label: "Shops",
      icon: <Store />,
      isDropdown: true,
      children: [
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
      ]
    },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = (dropdownKey: string) => {
    setExpandedDropdowns(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Helper function to check if current path matches the events page or root
  const isEventsActive = pathname === '/events' || pathname === '/';

  // Helper function to check if dropdown has active child
  const hasActiveChild = (children: any[]) => {
    return children?.some((child: any) => pathname === child.link);
  };

  const renderNavItem = (item: any, index: number) => {
    const dropdownKey = `dropdown-${index}`;
    const isExpanded = expandedDropdowns[dropdownKey];
    const itemHasActiveChild = item.children && hasActiveChild(item.children);

    if (item.isDropdown) {
      return (
        <div key={index} className="w-full">
          {/* Dropdown Header */}
          <button
            onClick={() => toggleDropdown(dropdownKey)}
            className={`flex items-center justify-between w-full gap-3 rounded-xl p-3 px-5 ${
              itemHasActiveChild ? "bg-zinc-800" : ""
            } hover:bg-zinc-800 transition-colors duration-200`}
          >
            <div className="flex items-center gap-3">
              <p className="text-xl">{item.icon}</p>
              <p className="text-base text-white font-medium">{item.label}</p>
            </div>
            <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
              <HiChevronRight className="text-lg" />
            </div>
          </button>
          
          {/* Dropdown Children */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="ml-6 mt-1 border-l border-zinc-700 pl-4">
              {item.children?.map((child: any, childIndex: number) => (
                <a
                  href={child.link}
                  key={childIndex}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 rounded-xl p-2 px-3 my-1 ${
                    pathname === child.link ? "bg-zinc-800" : ""
                  } hover:bg-zinc-800 transition-colors duration-200`}
                >
                  <p className="text-lg">{child.icon}</p>
                  <p className="text-sm text-white font-medium">{child.label}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Regular nav item
    return (
      <a 
        href={item.link} 
        key={index} 
        onClick={handleLinkClick}
        className={`flex items-center gap-3 rounded-xl p-3 px-5 ${
          item.link === '/events' ? 
            (isEventsActive ? "bg-zinc-800" : "") : 
            (pathname === item.link ? "bg-zinc-800" : "")
        } hover:bg-zinc-800 transition-colors duration-200`}
      >
        <p className="text-xl">{item.icon}</p>
        <p className="text-base text-white font-medium">{item.label}</p>
      </a>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="mobile-menu-button fixed top-4 left-4 z-50 p-3 bg-zinc-900 text-white rounded-lg shadow-lg"
        >
          <HiMenuAlt3 size={24} />
        </button>
      )}

      {/* Desktop Toggle Button - Shows when sidebar is collapsed */}
      {!isMobile && isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 bg-zinc-900 text-white rounded-lg shadow-lg hover:bg-zinc-800 transition-colors"
        >
          <HiMenuAlt3 size={24} />
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
      )}

      {/* Desktop Sidebar */}
      <main className={`${isMobile ? 'hidden' : 'block'} ${isCollapsed ? 'sideWidth-collapsed' : 'sideWidth-bn'} h-screen relative transition-all duration-300`}>
        <div className={`z-20 ${isCollapsed ? 'sideWidth-collapsed' : 'sideWidth'} fixed top-0 left-0 h-screen bg-zinc-900 text-white flex flex-col items-center justify-start overflow-y-auto transition-all duration-300 ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}`}>
          {/* Close Button - Desktop */}
          <button
            onClick={toggleSidebar}
            className="absolute top-6 right-6 p-2 bg-red-700 hover:bg-red-800 rounded-lg transition-colors z-30"
          >
            <HiX size={24} />
          </button>

          <div className="p-6 w-full">
            <div className="flex items-center h-48 w-48 justify-center bg-zinc-800 rounded-2xl p-6 mt-6 group flex-shrink-0 mx-auto">
              <Image 
                src="/images/Secondary_Logo.png" 
                alt="Sidebar Image" 
                width={150} 
                height={500} 
                className="h-[100%] w-[100%] object-contain" 
                priority
              />
            </div>
            <div className="flex gap-2 flex-col w-full flex-1 min-h-0 mt-6">
              {NAV_ITEMS.map((item: any, index: number) => renderNavItem(item, index))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile/Tablet Dropdown Menu */}
      {isMobile && (
        <div className={`mobile-menu fixed top-0 left-0 h-screen w-80 bg-zinc-900 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}>
          {/* Close Button - Mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 bg-red-700 hover:bg-red-800 rounded-lg transition-colors z-30"
          >
            <HiX size={24} />
          </button>

          <div className="p-6 pt-20">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center bg-zinc-800 rounded-2xl p-6 mb-6 flex-shrink-0">
              <Image 
                src="/images/Secondary_Logo.png" 
                alt="Sidebar Image" 
                width={120} 
                height={120} 
                className="h-20 w-20 object-contain" 
                priority
              />
            </div>
            
            {/* Mobile Navigation Items */}
            <div className="flex gap-2 flex-col">
              {NAV_ITEMS.map((item: any, index: number) => renderNavItem(item, index))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced CSS with responsive breakpoints */}
      <style jsx>{`
        .sideWidth-bn {
          width: 280px;
        }
        .sideWidth {
          width: 280px;
        }
        .sideWidth-collapsed {
          width: 0px;
        }
        
        /* Tablet specific styles */
        @media (min-width: 768px) and (max-width: 1024px) {
          .sideWidth-bn {
            width: 260px;
          }
          .sideWidth {
            width: 260px;
          }
        }
        
        /* Large desktop styles */
        @media (min-width: 1200px) {
          .sideWidth-bn {
            width: 320px;
          }
          .sideWidth {
            width: 320px;
          }
        }
        
        /* Prevent body scroll when mobile menu is open */
        ${isOpen && isMobile ? 'body { overflow: hidden; }' : ''}
        
        /* Smooth scrollbar for sidebar */
        .mobile-menu::-webkit-scrollbar,
        .z-20::-webkit-scrollbar {
          width: 4px;
        }
        .mobile-menu::-webkit-scrollbar-track,
        .z-20::-webkit-scrollbar-track {
          background: transparent;
        }
        .mobile-menu::-webkit-scrollbar-thumb,
        .z-20::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .mobile-menu::-webkit-scrollbar-thumb:hover,
        .z-20::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
}

export default SideMenu;