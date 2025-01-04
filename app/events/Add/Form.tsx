"use client";

import { AxiosInStance } from "@/lib/axios";
import { useRouter } from "next/navigation";

function Form() {
  const router = useRouter();
  const types = [
    { label: "Expert Convos", value: "expert" },
    { label: "Edu Login", value: "edu" },
    { label: "WriteWell Clinic", value: "write" },
    { label: "Pro Chat", value: "pro" },
    { label: "Tranquil wellness hub", value: "tranquil" },
  ];
  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj: any = {};
    formData.forEach((value, key) => {
    console.log(value);

      formDataObj[key] = value;
    });
    try {
      const res = await AxiosInStance.post(
        "events/actions.php?api=b1daf1bbc7bbd214045af",
        formDataObj
      );
      if (res.data.success) {
        alert("Event added succesfully");
        router.push("/events");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full max-w-72 text-black">
      <h1 className="text-3xl font-bold">Add Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Title</label>
          <input type="text" name="title" required />
        </div>
        <div>
          <label htmlFor="">Place</label>
          <input type="text" name="place" required />
        </div>
        <div>
          <label htmlFor="">Time</label>
          <input type="time" name="time" required />
        </div>
        <div>
          <label htmlFor="">Date</label>
          <select name="type" id="" required>
            <option value="">Select a Type</option>
            {types.map((item, index) => (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-green-600 rounded-xl px-2 py-1 font-bold text-white mt-5 ">Submit</button>
      </form>
    </div>
  );
}

export default Form;
