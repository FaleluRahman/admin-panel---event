// "use client";

// import { useEffect, useState, useRef } from "react";
// import AdminLayout from "@/components/layouts/AdminLayout";
// import { AxiosInStance } from "@/lib/axios";
// import Link from "next/link";
// import { ChevronsRight, SquarePen, Trash2, QrCode, CircleX, ImageOff } from 'lucide-react';
// import QRCode from 'qrcode';

// export default function Page() {
//   const [events, setEvents] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [dateString, setDateString] = useState("");
//   const [showQRModal, setShowQRModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<any>(null);
//   const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

//   const fetchEvents = async () => {
//     try {
//       const res = await AxiosInStance.get(
//         "/events/actions.php?api=b1daf1bbc7bbd214045af"
//       );
//       setEvents(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//     setDateString(new Date().toLocaleDateString());
//   }, []);

//   // Handle image load errors
//   const handleImageError = (eventId: number) => {
//     setImageErrors(prev => new Set(prev).add(eventId));
//   };

//   // Delete event function
//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this event?")) return;

//     try {
//       setLoading(true);
//       await AxiosInStance.delete(
//         `/events/actions.php?id=${id}&api=b1daf1bbc7bbd214045af`
//       );
//       setEvents((prev) => prev.filter((evt) => evt.id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Failed to delete event.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show QR Modal
//   const handleShowQR = (event: any) => {
//     setSelectedEvent(event);
//     setShowQRModal(true);
//   };

//   // Helper function to truncate description
//   const truncateDescription = (text: string, maxLength: number = 80) => {
//     if (!text || text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   };

// const QRModal = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // Generate simple QR Code
//   const generateQRCode = async () => {
//     if (!canvasRef.current || !selectedEvent) {
//       return;
//     }
    
//     try {
//       // Simple QR data format: event=123
//       const qrData = `event=${selectedEvent.id}`;
//       console.log("Generating QR with data:", qrData);
      
//       // Generate visual QR code
//       await QRCode.toCanvas(canvasRef.current, qrData, {
//         width: 280,
//         margin: 3,
//         color: {
//           dark: '#1F2937',
//           light: '#FFFFFF'
//         },
//         errorCorrectionLevel: 'M'
//       });
      
//       console.log("QR Code generated successfully");
//     } catch (error) {
//       console.error('QR Code generation failed:', error);
//     }
//   };

//   useEffect(() => {
//     if (showQRModal && selectedEvent) {
//       console.log('QR Modal opened for event:', selectedEvent);
//       generateQRCode();
//     }
//   }, [showQRModal, selectedEvent]);

//   const handleCloseModal = () => {
//     console.log('Closing QR modal...');
//     setShowQRModal(false);
//     setSelectedEvent(null);
//   };

//   if (!showQRModal || !selectedEvent) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl w-full max-w-sm sm:max-w-md shadow-2xl relative overflow-hidden">
//         {/* Close Button */}
//         <button
//           onClick={handleCloseModal}
//           className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
//         >
//          <CircleX className="w-5 h-5 text-white" />
//         </button>

//         {/* Top accent gradient */}
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DD0F19] via-purple-600 to-[#EC5914] rounded-t-3xl"></div>
        
//         {/* Header */}
//         <div className="px-6 pt-8 pb-4">
//           <div className="text-center">
//             <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#DD0F19] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//               <QrCode className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
//               {selectedEvent.title}
//             </h2>
           
//           </div>
//         </div>

//         {/* QR Code Container */}
//         <div className="px-6 pb-4">
//           <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-4">
//             {/* QR Code */}
//             <div className="relative flex justify-center">
//               <div className="relative p-4 bg-white rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
//                 <canvas 
//                   ref={canvasRef}
//                   className="max-w-full h-auto block transition-all duration-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Event Details */}
//           {selectedEvent.time && (
//             <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
//               <div className="flex items-center space-x-1">
//                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span>{selectedEvent.time}</span>
//               </div>
//               {selectedEvent.type && (
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                   <span>{selectedEvent.type} • {handleOption(selectedEvent.type)} Points</span>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Bottom accent */}
//         <div className="h-1 bg-gradient-to-r from-[#DD0F19] via-purple-600 to-[#EC5914] rounded-b-3xl"></div>
//       </div>
//     </div>
//   );
// };

//   // Helper function to get points (same as PHP)
//   const handleOption = (value: string): number => {
//     const pointsMap: { [key: string]: number } = {
//       "Expert Convos": 14,
//       "Edu Login": 14,
//       "WriteWell Clinic": 10,
//       "Pro Chat": 6,
//       "Tranquil Wellness Hub": 10,
//     };
//     return pointsMap[value] || 0;
//   };

//   return (
//     <AdminLayout active={"Articles"}>
//       <div className="min-h-screen bg-[#EEFBOE] p-4 sm:p-6 lg:p-8">
//         {/* Header Section */}
//         <div className="max-w-7xl mx-auto mb-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//             <div className="space-y-2">
//               <h1 className="text-3xl sm:text-4xl font-bold text-[#000000]">
//                 Event Management
//               </h1>
//               <p className="text-[#8B8C8C] text-sm sm:text-base">
//                 Manage events of Rendezvous Silver Edition
//               </p>
//             </div>

//             {/* Add Event Button */}
//             <Link
//               href="/events/Add"
//               className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-out bg-[#DD0F19] rounded-xl shadow-lg hover:shadow-xl hover:bg-[#b80d16] transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#DD0F19] focus:ring-offset-2"
//             >
//               <svg
//                 className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-90"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//               Add New Event
//             </Link>
//           </div>

//           {/* Stats Bar */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#8B8C8C]/20 shadow-sm mb-8">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-[#EC5914] rounded-full animate-pulse"></div>
//                 <span className="text-sm text-[#8B8C8C]">
//                   {events.length} Events Found
//                 </span>
//               </div>
//               <div className="text-xs text-[#8B8C8C]">
//                 Last updated: {dateString}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Events Grid */}
//         <div className="max-w-7xl mx-auto">
//           {events.length === 0 ? (
//             // Empty State
//             <div className="text-center py-16 px-4">
//               <div className="w-24 h-24 mx-auto mb-6 bg-[#EEFBOE] border-2 border-[#8B8C8C]/20 rounded-full flex items-center justify-center">
//                 <svg
//                   className="w-12 h-12 text-[#EC5914]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-[#000000] mb-2">
//                 No Events Yet
//               </h3>
//               <p className="text-[#8B8C8C] mb-6">
//                 Get started by creating your first event
//               </p>
//               <Link
//                 href="/events/Add"
//                 className="inline-flex items-center px-4 py-2 bg-[#DD0F19] text-white rounded-lg hover:bg-[#b80d16] transition-colors duration-200"
//               >
//                 Create Event
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {events.map((evt: any, index: number) => (
//                 <div
//                   key={index}
//                   className="group block transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
//                 >
//                   <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#8B8C8C]/20">
//                     {/* Image Section - Fixed */}
//                     <div className="h-32 bg-[#000000] relative overflow-hidden">
//                       {evt.image && !imageErrors.has(evt.id) ? (
//                         <img
//                           src={`${AxiosInStance.defaults.baseURL}/${evt.image}`}
//                           alt={evt.title || "Event"}
//                           className="w-full h-full object-cover"
//                           onError={() => handleImageError(evt.id)}
//                         />
//                       ) : (
//                         <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
//                           <div className="text-center">
//                             <ImageOff className="w-8 h-8 mx-auto mb-1 text-gray-400" />
//                             <span className="text-xs">No Image</span>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Card Content */}
//                     <div className="p-6 space-y-4">
//                       {/* Title */}
//                       <div>
//                         <Link href={"/events/" + evt.id}>
//                           <h3 className="text-lg font-semibold text-[#000000] hover:text-[#DD0F19] transition-colors duration-200 line-clamp-2 cursor-pointer">
//                             {evt.title || "Untitled Event"}
//                           </h3>
//                         </Link>
//                       </div>

//                       {/* Description - Added here with small font */}
//                       {evt.description && (
//                         <div className="mb-3">
//                           <p className="text-xs text-[#8B8C8C] leading-relaxed">
//                             {truncateDescription(evt.description)}
//                           </p>
//                         </div>
//                       )}

//                       {/* Event Details */}
//                       <div className="space-y-3">
//                         {/* Location */}
//                         {evt.place && (
//                           <div className="flex items-center space-x-3">
//                             <div className="flex-shrink-0 w-8 h-8 bg-[#EEFBOE] border border-[#8B8C8C]/20 rounded-lg flex items-center justify-center">
//                               <svg className="w-4 h-4 text-[#DD0F19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                               </svg>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-[#000000]">{evt.place}</p>
//                             </div>
//                           </div>
//                         )}

//                         {/* Time */}
//                         <div className="flex items-center space-x-3">
//                           <div className="flex-shrink-0 w-8 h-8 bg-[#EEFBOE] border border-[#8B8C8C]/20 rounded-lg flex items-center justify-center">
//                             <svg className="w-4 h-4 text-[#EC5914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-[#000000]">{evt.time || 'Not specified'}</p>
//                           </div>
//                         </div>

//                         {/* Type */}
//                         <div className="flex items-center space-x-3">
//                           <div className="flex-shrink-0 w-8 h-8 bg-[#EEFBOE] border border-[#8B8C8C]/20 rounded-lg flex items-center justify-center">
//                             <svg
//                               className="w-4 h-4 text-[#DD0F19]"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
//                               />
//                             </svg>
//                           </div>
//                           <div>
                           
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EC5914]/10 text-[#EC5914] border border-[#EC5914]/20">
//                               {evt.type || "General"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="pt-4 border-t border-[#8B8C8C]/20 flex items-center justify-between">
//                         <div className="flex items-center justify-start gap-2">
//                           <div className="flex space-x-2">
//                             <Link
//                               href={`/events/Edit/${evt.id}`}
//                               className="inline-flex items-center justify-center w-8 h-8 bg-[#EC5914] hover:bg-[#d14f12] text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#EC5914] focus:ring-offset-1"
//                               title="Edit Event"
//                             >
//                               <SquarePen className="w-4 h-4" />
//                             </Link>

//                             {/* Delete Button */}
//                             <button
//                               onClick={() => handleDelete(evt.id)}
//                               disabled={loading}
//                               className="inline-flex items-center justify-center w-8 h-8 bg-[#DD0F19] hover:bg-[#b80d16] text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DD0F19] focus:ring-offset-1 disabled:opacity-50"
//                               title="Delete Event"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleShowQR(evt)}
//                             className="inline-flex items-center justify-center w-9 h-9 bg-stone-700 hover:bg-stone-900 text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-stone-600 focus:ring-offset-1"
//                             title="Show QR Code"
//                           >
//                             <QrCode className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Hover Overlay Effect */}
//                     <div className="absolute inset-0 bg-[#DD0F19]/0 hover:bg-[#DD0F19]/5 transition-all duration-300 pointer-events-none"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <QRModal />
//     </AdminLayout>
//   );
// }

"use client"
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { AxiosInStance } from "@/lib/axios";
import Link from "next/link";
import { SquarePen, Trash2, CircleX, ImageOff, ScanLine, CalendarDays } from "lucide-react";
import { Scanner ,IDetectedBarcode} from "@yudiel/react-qr-scanner";

type EventType = {
  id: number;
  title?: string;
  description?: string;
  image?: string;
  place?: string;
  time?: string;
  type?: string;
};

export default function Page() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateString, setDateString] = useState("");
  const [showScanModal, setShowScanModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [scanStatus, setScanStatus] = useState<"scanning" | "success" | "error">("scanning");
  const [scanMessage, setScanMessage] = useState("");
  const [scanLoading, setScanLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await AxiosInStance.get("/events/actions.php?api=b1daf1bbc7bbd214045af");
      setEvents(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
    setDateString(new Date().toLocaleDateString());
  }, []);

  const handleImageError = (eventId: number) => {
    setImageErrors((prev) => new Set(prev).add(eventId));
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      setLoading(true);
      await AxiosInStance.delete(`/events/actions.php?id=${id}&api=b1daf1bbc7bbd214045af`);
      setEvents((prev) => prev.filter((evt) => evt.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete event.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowScanner = (event: EventType) => {
    setSelectedEvent(event);
    setShowScanModal(true);
    setScanStatus("scanning");
    setScanMessage("");
    setIsProcessing(false);
  };

  const truncateDescription = (text: string, maxLength: number = 80) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleScan = async (jamiaId: string) => {
    if (isProcessing || !selectedEvent || !jamiaId) return;

    try {
      setIsProcessing(true);
      setScanLoading(true);

      const response = await AxiosInStance.get(
        `/qrscans/actions.php?api=b1daf1bbc7bbd214045af&event=${selectedEvent.id}&student=${jamiaId}`
      );

      if (response.data && response.data.success === true) {
        setScanStatus("success");
        setScanMessage(
          `Success! ${jamiaId} earned ${response.data.points} points for ${selectedEvent.title}`
        );
        setTimeout(() => {
          setShowScanModal(false);
          setScanStatus("scanning");
          setScanMessage("");
          setIsProcessing(false);
        }, 2500);
      } else {
        throw new Error(response.data?.message || "Failed to award points");
      }
    } catch (error: any) {
      console.error("Scan Error:", error);
      setScanStatus("error");
      const errorMsg =
        error?.response?.data?.message || error?.message || "Failed to process scan";
      setScanMessage(errorMsg);
      setTimeout(() => {
        setScanStatus("scanning");
        setScanMessage("");
        setIsProcessing(false);
      }, 3000);
    } finally {
      setScanLoading(false);
    }
  };

  const ScannerModal = () => {
    if (!showScanModal || !selectedEvent) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden max-h-[95vh] flex flex-col">
          <button
            onClick={() => {
              setShowScanModal(false);
              setScanStatus("scanning");
              setScanMessage("");
              setIsProcessing(false);
              setScanLoading(false);
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <CircleX className="w-5 h-5 text-white" />
          </button>

          {/* Scanner */}
          {scanStatus === "scanning" ? (
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
              <div className="text-center mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#DD0F19] to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <ScanLine className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Scan Student QR</h2>
                <p className="text-xs sm:text-sm text-gray-600 px-2">
                  <span className="font-semibold">{selectedEvent.title}</span>
                </p>
              </div>

              <div className="relative bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden mb-4 shadow-xl">
                <Scanner
                  onScan={(detectedCodes: IDetectedBarcode[]) => {
                    if (!isProcessing && detectedCodes && detectedCodes.length > 0) {
                      let jamiaId = detectedCodes[0]?.rawValue || "";
                      jamiaId = jamiaId.trim().toUpperCase();

                      const jamiaIdPattern = /^\d{4}[A-Z]{2,3}\d{3,4}$/;
                      if (jamiaId && jamiaIdPattern.test(jamiaId)) {
                        handleScan(jamiaId);
                      } else if (jamiaId) {
                        setScanStatus("error");
                        setScanMessage(
                          `Invalid Jamia ID format: ${jamiaId}. Expected format: 2019ABC123`
                        );
                        setTimeout(() => {
                          setScanStatus("scanning");
                          setScanMessage("");
                        }, 3000);
                      }
                    }
                  }}
                  onError={(error) => {
                    if (!isProcessing) {
                      setScanStatus("error");
                      setScanMessage("Camera access failed. Please allow camera permissions.");
                      setTimeout(() => {
                        setScanStatus("scanning");
                        setScanMessage("");
                      }, 3000);
                    }
                  }}
                  constraints={{ facingMode: "environment", aspectRatio: 1 }}
                  scanDelay={500}
                />
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 text-center flex-1 flex flex-col items-center justify-center">
              <h3
                className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${
                  scanStatus === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {scanStatus === "success" ? "Scan Successful!" : "Scan Failed"}
              </h3>
              <p
                className={`text-sm sm:text-base px-4 ${
                  scanStatus === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {scanMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <AdminLayout active={"Articles"}>
      <div className="min-h-screen bg-[#EEFBOE] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#000000]">
                Event Management
              </h1>
              <p className="text-[#8B8C8C] text-sm sm:text-base">
                Manage events of Rendezvous Silver Edition
              </p>
            </div>

            <Link
              href="/events/Add"
              className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-out bg-[#DD0F19] rounded-xl shadow-lg hover:shadow-xl hover:bg-[#b80d16] transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Event
            </Link>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#8B8C8C]/20 shadow-sm mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#EC5914] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#8B8C8C]">
                  {events.length} Events Found
                </span>
              </div>
              <div className="text-xs text-[#8B8C8C]">
                Last updated: {dateString}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {events.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-24 h-24 mx-auto mb-6 bg-[#EEFBOE] border-2 border-[#8B8C8C]/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-[#EC5914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#000000] mb-2">No Events Yet</h3>
              <p className="text-[#8B8C8C] mb-6">Get started by creating your first event</p>
              <Link href="/events/Add" className="inline-flex items-center px-4 py-2 bg-[#DD0F19] text-white rounded-lg hover:bg-[#b80d16]">
                Create Event
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((evt: any, index: number) => (
                <div key={index} className="group block transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                  <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#8B8C8C]/20">
                    <div className="h-32 bg-[#000000] relative overflow-hidden">
                      {evt.image && !imageErrors.has(evt.id) ? (
                        <img
                          src={`${AxiosInStance.defaults.baseURL}/${evt.image}`}
                          alt={evt.title || "Event"}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(evt.id)}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
                          <div className="text-center">
                            <ImageOff className="w-8 h-8 mx-auto mb-1 text-gray-400" />
                            <span className="text-xs">No Image</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <Link href={"/events/" + evt.id}>
                          <h3 className="text-lg font-semibold text-[#000000] hover:text-[#DD0F19] transition-colors duration-200 line-clamp-2 cursor-pointer">
                            {evt.title || "Untitled Event"}
                          </h3>
                        </Link>
                      </div>

                      {evt.description && (
                        <div className="mb-3">
                          <p className="text-xs text-[#8B8C8C] leading-relaxed">
                            {truncateDescription(evt.description)}
                          </p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {evt.place && (
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-[#EEFBOE] border border-[#8B8C8C]/20 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#DD0F19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#000000]">{evt.place}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#EEFBOE] border border-[#8B8C8C]/20 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#EC5914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#000000]">{evt.time || 'Not specified'}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#EEFBOE] border border-[#8B8C8C]/20 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#DD0F19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EC5914]/10 text-[#EC5914] border border-[#EC5914]/20">
                              {evt.type || "General"}
                            </span>
                          </div>
                        </div>
                          <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#EEFBOE] border border-[#8B8C8C]/20 rounded-lg flex items-center justify-center">
                         <CalendarDays className="text-[#DD0F19] w-4 h-4"/> 
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EC5914]/10 text-[#EC5914] border border-[#EC5914]/20">
                              {evt.date || "n/a"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#8B8C8C]/20 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Link
                            href={`/events/Edit/${evt.id}`}
                            className="inline-flex items-center justify-center w-8 h-8 bg-[#EC5914] hover:bg-[#d14f12] text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                            title="Edit Event"
                          >
                            <SquarePen className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(evt.id)}
                            disabled={loading}
                            className="inline-flex items-center justify-center w-8 h-8 bg-[#DD0F19] hover:bg-[#b80d16] text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleShowScanner(evt)}
                          className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                          title="Scan Student Attendance"
                        >
                          <ScanLine className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Scan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ScannerModal />
    </AdminLayout>
  );
}