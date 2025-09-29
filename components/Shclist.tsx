// /* eslint-disable */
// // @ts-nocheck
// "use client";

// import React, { useEffect, useState } from "react";
// import { MdOutlineAddCircle, MdDelete, MdWarning, MdCheckCircle } from "react-icons/md";
// import AddSchedule from "./Addschedule";
// import { AxiosInStance } from "@/lib/axios";
// import { programs } from "@/data/programs";

// const categories = ["general", "senior", "junior", "subjunior", "premier", "minor"];
// const stages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const Shclist = () => {
//   const [date, setDate] = useState("Oct-03 Friday");
//   const [stage, setStage] = useState(1);
//   const [schedule, setSchedule] = useState<any[]>([]);
//   const [addschedule, setAddschedule] = useState(false);
//   const [conflicts, setConflicts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const getDate = (dateStr) => {
//     switch (dateStr) {
//       case "Oct-03 Friday":
//         return "2025-10-03";
//       case "Oct-04 Saturday":
//         return "2025-10-04";
//       case "Oct-05 Sunday":
//         return "2025-10-05";
//       default:
//         return "2025-10-03";
//     }
//   };

//   const checkConflicts = (scheduleData) => {
//     const conflictsList: any[] = [];

//     scheduleData.forEach((item, index) => {
//       if (!item.program_name || !item.start || !item.end || !item.date) return;

//       // Duplicate check
//       const duplicates = scheduleData.filter(
//         (other, otherIndex) =>
//           otherIndex !== index &&
//           other.program_name === item.program_name &&
//           other.date === item.date &&
//           other.stage === item.stage
//       );

//       if (duplicates.length > 0) {
//         conflictsList.push({
//           type: "duplicate",
//           message: `Duplicate program "${item.program_name}" on ${item.date}`,
//           index,
//         });
//       }

//       // Overlap check
//       const overlaps = scheduleData.filter(
//         (other, otherIndex) =>
//           otherIndex !== index &&
//           other.date === item.date &&
//           other.stage === item.stage &&
//           other.start &&
//           other.end &&
//           ((item.start >= other.start && item.start < other.end) ||
//             (item.end > other.start && item.end <= other.end) ||
//             (item.start <= other.start && item.end >= other.end))
//       );

//       if (overlaps.length > 0) {
//         conflictsList.push({
//           type: "overlap",
//           message: `Time conflict: "${item.program_name}" overlaps with "${overlaps[0].program_name}"`,
//           index,
//         });
//       }

//       // Invalid time
//       if (item.start >= item.end) {
//         conflictsList.push({
//           type: "invalid_time",
//           message: `Invalid time for "${item.program_name}": Start time must be before end time`,
//           index,
//         });
//       }
//     });

//     setConflicts(conflictsList);
//     return conflictsList;
//   };

//   const fetchData = () => {
//     setLoading(true);
//     AxiosInStance.get(
//       `/schedule/actions.php?api=b1daf1bbc7bbd214045af&stage=${stage}&date=${getDate(date)}`
//     )
//       .then((res) => {
//         const data = res?.data?.data || [];
//         setSchedule(data);
//         checkConflicts(data);
//       })
//       .catch(() => {
//         setSchedule([]);
//         setConflicts([]);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const updateScheduleItem = (index, field, value) => {
//     const newSchedule = [...schedule];
//     newSchedule[index] = { ...(newSchedule[index] || {}), [field]: value };

//     if (field === "category") {
//       newSchedule[index].program_name = "";
//     }

//     setSchedule(newSchedule);
//     checkConflicts(newSchedule);
//   };

//   const removeScheduleItem = (index) => {
//     const newSchedule = schedule.filter((_, i) => i !== index);
//     setSchedule(newSchedule);
//     checkConflicts(newSchedule);
//   };

//   const addScheduleItem = () => {
//     const newItem = {
//       category: "",
//       stage: stage,
//       program_name: "",
//       start: "",
//       end: "",
//       date: getDate(date) || "",
//     };

//     const newSchedule = [...schedule, newItem];
//     setSchedule(newSchedule);
//     checkConflicts(newSchedule);
//   };

//   const syncSchedule = async () => {
//     if (conflicts.length > 0) {
//       alert("Please resolve all conflicts before syncing!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await AxiosInStance.post(
//         "/schedule/actions.php?api=b1daf1bbc7bbd214045af",
//         { stage: stage, data: schedule }
//       );

//       if (res?.data?.success) {
//         alert("Schedule synced successfully!");
//         fetchData();
//       } else {
//         const errorMessage =
//           res?.data?.conflicts?.join("\n") || res?.data?.message || "Failed to sync";
//         alert(`Sync failed:\n${errorMessage}`);
//       }
//     } catch (error) {
//       console.error("Sync error:", error);
//       alert("Network error occurred while syncing!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const hasConflict = (index) => conflicts.some((conflict) => conflict.index === index);

//   const filteredSchedule = schedule.filter((row) =>
//     (row.program_name || "").toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (row.category || "").toString().toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(() => {
//     fetchData();
//   }, [date, stage]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
//       <div className="w-full px-5 py-6">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2 animate-fade-in">
//             Schedule Management
//           </h1>
//           <p className="text-gray-600 text-lg">Organize and manage event schedules efficiently</p>
//         </div>

//         {/* Search and Add Controls */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-slide-up">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="relative flex-1 max-w-md">
//               <input
//                 type="text"
//                 placeholder="Search programs..."
//                 className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>

//             <button
//               className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl px-6 py-2 text-lg font-semibold flex items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
//               onClick={addScheduleItem}
//             >
//               <MdOutlineAddCircle className="text-xl" />
//               Add Schedule
//             </button>
//           </div>
//         </div>

//         {/* Date Selection */}
//         <div className="flex gap-6 w-full mb-6 justify-center text-center">
//           {["Oct-03 Friday", "Oct-04 Saturday", "Oct-05 Sunday"].map((item) => (
//             <div
//               onClick={() => setDate(item)}
//               key={item}
//               className={`flex py-3 px-4 w-full justify-center rounded-xl text-center font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//                 date === item
//                   ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg animate-pulse"
//                   : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
//               }`}
//             >
//               {item}
//             </div>
//           ))}
//         </div>

//         {/* Stage Selection */}
//         <div className="flex overflow-x-auto gap-2 w-full py-2 mb-6">
//           {stages.map((stageNum) => (
//             <div
//               key={stageNum}
//               className={`px-4 py-2 rounded-lg flex w-full text-center justify-center font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 ${
//                 stage === stageNum
//                   ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105"
//                   : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
//               }`}
//               onClick={() => setStage(stageNum)}
//             >
//               Stage {stageNum}
//             </div>
//           ))}
//         </div>

//         {/* Conflicts Alert */}
//         {conflicts.length > 0 && (
//           <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 animate-bounce">
//             <div className="flex items-center gap-2 mb-3">
//               <MdWarning className="text-red-600 text-xl" />
//               <h3 className="font-bold text-red-800 text-lg">Scheduling Conflicts Detected!</h3>
//             </div>
//             <ul className="text-red-700 space-y-1">
//               {conflicts.map((conflict, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   <span className="text-red-500">•</span>
//                   <span>{conflict.message}</span>
//                 </li>
//               ))}
//             </ul>
//             <p className="text-red-600 text-sm mt-2 font-medium">Please resolve these conflicts before syncing.</p>
//           </div>
//         )}

//         {/* Loading Indicator */}
//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
//             <p className="text-gray-600 mt-2">Loading...</p>
//           </div>
//         )}

//         {/* Schedule Table */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
//                   <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Category</th>
//                   <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Program</th>
//                   <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Date</th>
//                   <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Start</th>
//                   <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">End</th>
//                   <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSchedule?.map((row, index) => (
//                   <tr
//                     key={index}
//                     className={`border-b hover:bg-gray-50 transition-all duration-200 ${hasConflict(index) ? "bg-red-50 border-red-200 animate-pulse" : ""}`}
//                   >
//                     <td className="px-6 py-4">
//                       <select
//                         value={row.category || ""}
//                         onChange={(e) => updateScheduleItem(index, "category", e.target.value)}
//                         className={`w-full p-2 border text-black rounded-lg focus:outline-none focus:ring-2 transition-all ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((item, i) => (
//                           <option key={i} value={item}>
//                             {item.toUpperCase()}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={row.program_name || ""}
//                         disabled={!row.category}
//                         onChange={(e) => updateScheduleItem(index, "program_name", e.target.value)}
//                         className={`w-full p-2 border text-black rounded-lg focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
//                       >
//                         <option value="">Select Program</option>
//                         {row.category &&
//                           programs
//                             .filter((prgrm) => prgrm.category === row.category)
//                             ?.map((item, i) => (
//                               <option key={i} value={item.name}>
//                                 {item.name}
//                               </option>
//                             ))}
//                       </select>
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="date"
//                         value={row.date && /^\d{4}-\d{2}-\d{2}$/.test(row.date) ? row.date : ""}
//                         onChange={(e) => updateScheduleItem(index, "date", e.target.value)}
//                         className={`w-full p-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition-all ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="time"
//                         value={row.start || ""}
//                         onChange={(e) => updateScheduleItem(index, "start", e.target.value)}
//                         className={`w-full p-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition-all ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="time"
//                         value={row.end || ""}
//                         onChange={(e) => updateScheduleItem(index, "end", e.target.value)}
//                         className={`w-full p-2 border text-black rounded-lg focus:outline-none focus:ring-2 transition-all ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => removeScheduleItem(index)}
//                         className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
//                         title="Remove this schedule item"
//                       >
//                         <MdDelete className="text-xl" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}

//                 {filteredSchedule.length === 0 && !loading && (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
//                       <div className="flex flex-col items-center gap-4">
//                         <div className="text-6xl opacity-20">📅</div>
//                         <div>
//                           <p className="text-xl font-semibold mb-2">No schedule items found</p>
//                           <p className="text-sm">Click "Add Schedule" to create your first entry</p>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Sync Button */}
//         {schedule.length > 0 && (
//           <div className="text-center">
//             <button
//               onClick={syncSchedule}
//               disabled={conflicts.length > 0 || loading}
//               className={`px-8 py-3 rounded-xl text-lg font-bold flex items-center gap-2 mx-auto transform transition-all duration-200 shadow-lg ${
//                 conflicts.length > 0 || loading
//                   ? "bg-gray-400 cursor-not-allowed text-white"
//                   : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:scale-105"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                   Syncing...
//                 </>
//               ) : (
//                 <>
//                   <MdCheckCircle className="text-xl" />
//                   Sync Schedule
//                 </>
//               )}
//             </button>

//             {conflicts.length > 0 && (
//               <p className="text-red-600 text-sm mt-2 font-medium">Resolve conflicts above to enable sync</p>
//             )}
//           </div>
//         )}
//       </div>

//       {addschedule && <AddSchedule close={setAddschedule} />}

//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes slide-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }

//         .animate-slide-up {
//           animation: slide-up 0.8s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Shclist;



/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineAddCircle, MdDelete, MdWarning, MdCheckCircle } from "react-icons/md";
import AddSchedule from "./Addschedule";
import { AxiosInStance } from "@/lib/axios";
import { programs } from "@/data/programs";

const categories = ["general", "senior", "junior", "subjunior", "premier", "minor"];
const stages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Shclist = () => {
  const [date, setDate] = useState("Oct-02 Thursday");
  const [stage, setStage] = useState(1);
  const [schedule, setSchedule] = useState([]);
  const [addschedule, setAddschedule] = useState(false);
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getDate = (dateStr) => {
    switch (dateStr) {
      case "Oct-02 Thursday":
        return "2025-10-02";
      case "Oct-03 Friday":
        return "2025-10-03";
      case "Oct-04 Saturday":
        return "2025-10-04";
      case "Oct-05 Sunday":
        return "2025-10-05";
      default:
        return "2025-10-03";
    }
  };

  // Function specifically for cross-stage conflict checking
  const checkCrossStageConflicts = (currentStageData, allStagesData) => {
    const conflictsList = [];

    currentStageData.forEach((item, index) => {
      if (!item.program_name || !item.start || !item.end || !item.date || !item.category) {
        return;
      }

      // Check within current stage for duplicates
      const sameStageDuplicates = currentStageData.filter(
        (other, otherIndex) =>
          otherIndex !== index &&
          other.program_name === item.program_name &&
          other.date === item.date
      );

      if (sameStageDuplicates.length > 0) {
        conflictsList.push({
          type: "duplicate",
          message: `Duplicate program "${item.program_name}" in Stage ${stage} on ${item.date}`,
          index,
        });
      }

      // Check across all stages for the same program on same date
      const crossStageConflicts = allStagesData.filter(
        (other) =>
          other.program_name === item.program_name &&
          other.date === item.date &&
          other.stage !== stage // Different stage
      );

      if (crossStageConflicts.length > 0) {
        const conflictStages = crossStageConflicts.map(c => c.stage).join(', ');
        conflictsList.push({
          type: "cross_stage",
          message: `Program "${item.program_name}" already scheduled on Stage ${conflictStages} for ${item.date}`,
          index,
        });
      }

      // Time validation
      if (item.start >= item.end) {
        conflictsList.push({
          type: "invalid_time",
          message: `Invalid time for "${item.program_name}": Start time must be before end time`,
          index,
        });
      }

      // Date format validation
      if (item.date && !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
        conflictsList.push({
          type: "invalid_date",
          message: `Invalid date format for "${item.program_name}"`,
          index,
        });
      }
    });

    return conflictsList;
  };

  // Basic conflict checking for local updates (without cross-stage data)
  const checkConflicts = (scheduleData) => {
    const conflictsList = [];

    scheduleData.forEach((item, index) => {
      if (!item.program_name || !item.start || !item.end || !item.date || !item.category) {
        return; // Skip incomplete items
      }

      // Check for duplicate programs on same date and stage
      const duplicates = scheduleData.filter(
        (other, otherIndex) =>
          otherIndex !== index &&
          other.program_name === item.program_name &&
          other.date === item.date &&
          other.stage === item.stage
      );

      if (duplicates.length > 0) {
        conflictsList.push({
          type: "duplicate",
          message: `Duplicate program "${item.program_name}" on ${item.date} Stage ${item.stage}`,
          index,
        });
      }

      // Basic time validation (start must be before end)
      if (item.start >= item.end) {
        conflictsList.push({
          type: "invalid_time",
          message: `Invalid time for "${item.program_name}": Start time must be before end time`,
          index,
        });
      }

      // Date format validation
      if (item.date && !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
        conflictsList.push({
          type: "invalid_date",
          message: `Invalid date format for "${item.program_name}"`,
          index,
        });
      }
    });

    setConflicts(conflictsList);
    return conflictsList;
  };

  // Updated fetchData function with cross-stage validation
  const fetchData = () => {
    setLoading(true);
    
    // Fetch current stage data
    const currentStagePromise = AxiosInStance.get(
      `/schedule/actions.php?api=b1daf1bbc7bbd214045af&stage=${stage}&date=${getDate(date)}`
    );
    
    // Fetch all stages data for the selected date for cross-validation
    const allStagesPromise = AxiosInStance.get(
      `/schedule/actions.php?api=b1daf1bbc7bbd214045af&date=${getDate(date)}&all_stages=true`
    );

    Promise.all([currentStagePromise, allStagesPromise])
      .then(([currentRes, allRes]) => {
        const currentData = currentRes?.data?.data || [];
        const allData = allRes?.data?.data || [];
        
        setSchedule(currentData);
        
        // For conflict checking, we need to consider both current stage data and cross-stage conflicts
        const conflictsWithCrossStage = checkCrossStageConflicts(currentData, allData);
        setConflicts(conflictsWithCrossStage);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        
        // Fallback: try to fetch just current stage data if cross-stage fetch fails
        AxiosInStance.get(
          `/schedule/actions.php?api=b1daf1bbc7bbd214045af&stage=${stage}&date=${getDate(date)}`
        )
          .then((res) => {
            const data = res?.data?.data || [];
            setSchedule(data);
            checkConflicts(data);
          })
          .catch(() => {
            setSchedule([]);
            setConflicts([]);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateScheduleItem = (index, field, value) => {
    const newSchedule = [...schedule];
    
    // Ensure the item exists
    if (!newSchedule[index]) {
      newSchedule[index] = {};
    }
    
    newSchedule[index] = { ...newSchedule[index], [field]: value };

    // Reset program_name when category changes
    if (field === "category") {
      newSchedule[index].program_name = "";
    }

    // Ensure stage is always set
    if (!newSchedule[index].stage) {
      newSchedule[index].stage = stage;
    }

    setSchedule(newSchedule);
    // Use basic conflict checking for local updates (cross-stage will be checked on next fetch)
    checkConflicts(newSchedule);
  };

  const removeScheduleItem = (index) => {
    const newSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(newSchedule);
    checkConflicts(newSchedule);
  };

  const addScheduleItem = () => {
    const newItem = {
      category: "",
      stage: stage,
      program_name: "",
      start: "",
      end: "",
      date: getDate(date) || "",
    };

    const newSchedule = [...schedule, newItem];
    setSchedule(newSchedule);
    checkConflicts(newSchedule);
  };

  const syncSchedule = async () => {
    // Filter out completely empty items
    const filteredSchedule = schedule.filter(item => 
      item.program_name || item.category || item.start || item.end || item.date
    );

    if (filteredSchedule.length === 0) {
      alert("No schedule items to sync!");
      return;
    }

    if (conflicts.length > 0) {
      alert("Please resolve all conflicts before syncing!");
      return;
    }

    setLoading(true);
    try {
      // Prepare data with proper stage values
      const dataToSync = filteredSchedule.map(item => ({
        ...item,
        stage: stage, // Ensure stage is consistent
        date: item.date || getDate(date) // Fallback date if missing
      }));

      const res = await AxiosInStance.post(
        "/schedule/actions.php?api=b1daf1bbc7bbd214045af",
        { stage: stage, data: dataToSync }
      );

      if (res?.data?.success) {
        alert(`Schedule synced successfully! ${res.data.items_processed || filteredSchedule.length} items processed.`);
        fetchData(); // Refresh data
      } else {
        const errorMessage =
          res?.data?.conflicts?.join("\n") || 
          res?.data?.message || 
          "Failed to sync schedule";
        alert(`Sync failed:\n${errorMessage}`);
      }
    } catch (error) {
      console.error("Sync error:", error);
      let errorMessage = "Network error occurred while syncing!";
      
      if (error.response?.data) {
        errorMessage = error.response.data.message || 
                      error.response.data.conflicts?.join("\n") || 
                      errorMessage;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const hasConflict = (index) => conflicts.some((conflict) => conflict.index === index);

  const filteredSchedule = schedule.filter((row) =>
    (row.program_name || "").toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    (row.category || "").toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, [date, stage]);

  return (
    <div className="min-h-screen ">
      <div className="w-full px-5 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2 animate-fade-in">
            Schedule Management
          </h1>
          <p className="text-gray-600 text-lg">Organize and manage event schedules efficiently</p>
        </div>

        {/* Search and Add Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search programs..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl px-6 py-2 text-lg font-semibold flex items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
              onClick={addScheduleItem}
            >
              <MdOutlineAddCircle className="text-xl" />
              Add Schedule
            </button>
          </div>
        </div>

        {/* Date Selection */}
        <div className="flex gap-6 w-full mb-6 justify-center text-center">
          {["Oct-02 Thursday","Oct-03 Friday", "Oct-04 Saturday", "Oct-05 Sunday"].map((item) => (
            <div
              onClick={() => setDate(item)}
              key={item}
              className={`flex py-3 px-4 w-full justify-center rounded-xl text-center font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                date === item
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg animate-pulse"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Stage Selection */}
        <div className="flex overflow-x-auto gap-2 w-full py-2 mb-6">
          {stages.map((stageNum) => (
            <div
              key={stageNum}
              className={`px-4 py-2 rounded-lg flex w-full text-center justify-center font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 ${
                stage === stageNum
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
              onClick={() => setStage(stageNum)}
            >
              Stage {stageNum}
            </div>
          ))}
        </div>

        {/* Conflicts Alert */}
        {conflicts.length > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 animate-bounce">
            <div className="flex items-center gap-2 mb-3">
              <MdWarning className="text-red-600 text-xl" />
              <h3 className="font-bold text-red-800 text-lg">Validation Issues Detected!</h3>
            </div>
            <ul className="text-red-700 space-y-1">
              {conflicts.map((conflict, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>{conflict.message}</span>
                </li>
              ))}
            </ul>
            <p className="text-red-600 text-sm mt-2 font-medium">Please resolve these issues before syncing.</p>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        )}

        {/* Schedule Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Category</th>
                  <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Program</th>
                  <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Date</th>
                  <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Start</th>
                  <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">End</th>
                  <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedule?.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-50 transition-all duration-200 ${hasConflict(index) ? "bg-red-50 border-red-200 animate-pulse" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <select
                        value={row.category || ""}
                        onChange={(e) => updateScheduleItem(index, "category", e.target.value)}
                        className={`w-full p-2 border text-black rounded-lg focus:outline-none focus:ring-2 transition-all ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
                      >
                        <option value="">Select Category</option>
                        {categories.map((item, i) => (
                          <option key={i} value={item}>
                            {item.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={row.program_name || ""}
                        disabled={!row.category}
                        onChange={(e) => updateScheduleItem(index, "program_name", e.target.value)}
                        className={`w-full p-2 border text-black rounded-lg focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
                      >
                        <option value="">Select Program</option>
                        {row.category &&
                          programs
                            .filter((prgrm) => prgrm.category === row.category)
                            ?.map((item, i) => (
                              <option key={i} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="date"
                        value={row.date && /^\d{4}-\d{2}-\d{2}$/.test(row.date) ? row.date : ""}
                        onChange={(e) => updateScheduleItem(index, "date", e.target.value)}
                        className={`w-full p-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition-all ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="time"
                        value={row.start || ""}
                        onChange={(e) => updateScheduleItem(index, "start", e.target.value)}
                        className={`w-full p-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition-all ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="time"
                        value={row.end || ""}
                        onChange={(e) => updateScheduleItem(index, "end", e.target.value)}
                        className={`w-full p-2 border text-black rounded-lg focus:outline-none focus:ring-2 transition-all ${hasConflict(index) ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeScheduleItem(index)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="Remove this schedule item"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSchedule.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-4">
                        <div className="text-6xl opacity-20">📅</div>
                        <div>
                          <p className="text-xl font-semibold mb-2">No schedule items found</p>
                          <p className="text-sm">Click "Add Schedule" to create your first entry</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sync Button */}
        {schedule.length > 0 && (
          <div className="text-center">
            <button
              onClick={syncSchedule}
              disabled={conflicts.length > 0 || loading}
              className={`px-8 py-3 rounded-xl text-lg font-bold flex items-center gap-2 mx-auto transform transition-all duration-200 shadow-lg ${
                conflicts.length > 0 || loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:scale-105"
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <MdCheckCircle className="text-xl" />
                  Sync Schedule
                </>
              )}
            </button>

            {conflicts.length > 0 && (
              <p className="text-red-600 text-sm mt-2 font-medium">Resolve issues above to enable sync</p>
            )}
          </div>
        )}
      </div>

      {addschedule && <AddSchedule close={setAddschedule} />}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Shclist;