"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import AddSchedule from "./Addschedule";
import { AxiosInStance } from "@/lib/axios";
import { PiNutFill } from "react-icons/pi";
import { programs } from "@/data/programs";

const categories = [
  "general",
  "senior",
  "junior",
  "subjunior",
  "premier",
  "minor",
];
const rowIndex = [
  {
    time: "09:30-11:00 AM",
    item: "History Talk",
    category: "Senior",
    Duration: "1.5 hrs",
  },
  {
    time: "11:30-01:00 PM",
    item: "Geography Quiz",
    category: "Junior",
    Duration: "30 minutes",
  },
  {
    time: "01:30-03:00 PM",
    item: "Debate Competition",
    category: "Senior",
    Duration: "30 minutes",
  },
  {
    time: "10:00-11:00 AM",
    item: "Yoga Session",
    category: "Junior",
    Duration: "30 minutes",
  },
  {
    time: "11:30-12:30 PM",
    item: "Music Performance",
    category: "Senior",
    Duration: "30 minutes",
  },
  {
    time: "01:00-02:00 PM",
    item: "Dance Practice",
    category: "Junior",
    Duration: "30 minutes",
  },
];
const stages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Shclist = () => {
  const [date, setDate] = useState<string>("Jan-04 Saturday");
  const [stage, setStage] = useState(1);
  const [schedule, setSchedule] = useState<any>([]);

  const [addschedule, setAddschedule] = useState<any>(false);
  const getDate = (date: string): string | null => {
    switch (date) {
      case "Jan-04 Saturday":
        return "2025-01-04";
      case "Jan-05 Sunday":
        return "2025-01-05";
      default:
        return null;
    }
  };
  const fetchData = () => {
    const res = AxiosInStance.get(
      "/schedule/actions.php?api=b1daf1bbc7bbd214045af&stage=" +
        stage +
        "&date=" +
        getDate(date)
    )
      .then((res) => {
        setSchedule(res?.data?.data || []);
      })
      .catch((err: any) => {
        console.log(err);
        setSchedule([]);
      });
  };
  useEffect(() => {
    fetchData();
  }, [date, stage]);
  return (
    <div>
      <div className="bg-orange-50 w-full ">
        <div className="w-full px-5 ">
          <h1 className="text-zinc-500 rounded-xl text-5xl  font-mono font-bold">
            {" "}
            Schedule Management
          </h1>
          <div className="flex w-full justify-end">
            <div className="jsx-bf6cc301a9c5c476 relative flex-1 md:w-80">
              <input
                type="text"
                placeholder="Search programs..."
                className="jsx-bf6cc301a9c5c476 w-[50%] ml-96 px-2 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                value=""
                onChange={() => {}}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <button
              className="bg-red-800 text-white rounded-xl p-2 text-xl ml-10 font-bold flex cursor-pointer"
              onClick={() => {
                setSchedule((prev: any) => [
                  ...prev,
                  {
                    category: "",
                    stage: "",
                    program: "",
                    start: "",
                    end: "",
                    date: "",
                  },
                ]);
              }}
            >
              <MdOutlineAddCircle className="mt-1" />
              Add Schedule
            </button>
          </div>

          <div className="flex gap-1 w-11/12 mx-auto overflow-x-auto py-2 text-xl">
            {["Jan-04 Saturday", "Jan-05 Sunday"].map((item: any) => (
              <div
                onClick={() => setDate(item)}
                key={item}
                className={`py-1 rounded-lg text-white text-md text-center w-full my-4 ${
                  date === item
                    ? "bg-red-700 text-md font-bold"
                    : "bg-zinc-500 font-sans"
                } cursor-pointer`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="flex overflow-x-auto no-scrollbar w-11/12 py-2 m-auto justify-between">
            {stages.map((stageNum, i) => (
              <div
                key={i}
                className={`${
                  stage == stageNum
                    ? "bg-red-700 text-white w-full text-center font-sans font-bold "
                    : "bg-zinc-700 w-full text-center"
                } py-1 px-3 font-medium rounded mx-1.5 text-nowrap cursor-pointer`}
                onClick={() => setStage(stageNum)}
              >
                Stage {stageNum}
              </div>
            ))}
          </div>

          <table className="table-auto mx-auto w-full mt-4 text-zinc-700 border border-zinc-800">
            <thead>
              <tr>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Program</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Start</th>
                <th className="border px-4 py-2">End</th>
              </tr>
            </thead>
            <tbody>
              {schedule?.map((row: any, index: number) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <select
                      name="category"
                      id=""
                      onChange={(e) => {
                        const prev = [...schedule];
                        prev[index].category = e.target.value;
                        setSchedule(prev);
                      }}
                      value={row.category}
                    >
                      <option value="">Select Category</option>

                      {categories.map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="category"
                      id=""
                      onChange={(e) => {
                        const prev = [...schedule];
                        prev[index].program = e.target.value;
                        setSchedule(prev);
                      }}
                      value={row.program}
                      disabled={row.category === "" ? true : false}
                    >
                      <option value="">Select Category</option>

                      {row.category !== "" &&
                        programs
                          .filter((prgrm) => prgrm.category == row.category)
                          ?.map((item, i) => (
                            <option key={i} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => {
                        const prev = [...schedule];
                        prev[index].date = e.target.value;
                        setSchedule(prev);
                      }}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="time"
                      value={row.start}
                      onChange={(e) => {
                        const prev = [...schedule];
                        prev[index].start = e.target.value;
                        setSchedule(prev);
                      }}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="time"
                      value={row.end}
                      onChange={(e) => {
                        const prev = [...schedule];
                        prev[index].end = e.target.value;
                        setSchedule(prev);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={async () => {
              const res = await AxiosInStance.post(
                "/schedule/actions.php?api=b1daf1bbc7bbd214045af",
                { stage: stage, data: JSON.stringify(schedule) }
              );
              if (res?.data?.success) {
                alert("Synced Successfully");
                fetchData();
              } else {
                alert("Failed to Sync");
              }
            }}
            className="bg-red-800 text-white rounded-xl p-2 text-xl ml-10 font-bold flex cursor-pointer"
          >
            Sync
          </button>
        </div>
      </div>

      {addschedule && <AddSchedule close={setAddschedule} />}
    </div>
    // {AddSchedule&&<AddSchedule/>}
  );
};

export default Shclist;
