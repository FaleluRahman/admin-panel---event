"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { PiUploadBold } from "react-icons/pi";
import { RiSave3Line } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { uploadArticle, uploadImage } from "./func";
import { AutoComplete } from "primereact/autocomplete";
import { ArraytoString } from "@/components/decodeTags";

function UploadForm() {
  const types = [
    { label: "News", value: "NEWS1" },
    { label: "Event", value: "EVENT1" },
    { label: "News1", value: "NEWS2" },
  ];

  const POST_STATUS = [
    { value: "active", label: "active" },
    { value: "inactive", label: "inactive" },
  ];
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      file: "",
      image: "",
      title: "",
      body: "",
      type: "",
      url: "",
      tags: [],
      status: "active",
    },
    validationSchema: Yup.object({
      // file: Yup.mixed().required("Image is required"),
      title: Yup.string().required("Title is required"),
      body: Yup.string().required("Content is required"),
      type: Yup.string().required("Category is required"),
      author: Yup.string().required("Author is required"),
      url: Yup.string().required("URL is required"),
      tags: Yup.array().min(1, "At least one tag is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // const imageUploadResult = await uploadImage(values.file);
        // if (imageUploadResult?.success) {
        //   console.log("Image Added");
          const image = "prism.jpg"
          const newsUploadResult = await uploadArticle(
            values.title,
            values.body,
            image,
            values.type,
            values.url,
            ArraytoString(values.tags),
            values.status
          );
          if (newsUploadResult) {
            toast.success("News uploaded successfully");
            router.replace("/articles/");
            router.refresh();
          } else {
            toast.error("Something went wrong!");
          }
        // }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <main><form
    onSubmit={formik.handleSubmit}
    className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
  >
      <div className="mt-10 p-2 rounded-lg bg-zinc-200 grid gap-2">
        <input
          type="file"
          className="w-full p-3 px-5 border border-blue-300 rounded-[15px] outline-blue-500"
          name={"file"}
          onChange={formik.handleChange}
          value={formik.values["file"]}
        />
      </div>
      <div className="mt-10 p-2 rounded-lg bg-zinc-200 grid gap-2">
        <input
          type="text"
          className="w-full p-3 px-5 border border-blue-300 rounded-[15px] outline-blue-500"
          name={"title"}
          onChange={formik.handleChange}
          value={formik.values["title"]}
        />
      </div>
      <div className="mt-10 p-2 rounded-lg bg-zinc-200 grid gap-2">
        <textarea
          className="w-full p-3 px-5 border border-blue-300 rounded-[15px] outline-blue-500"
          name={"body"}
          onChange={formik.handleChange}
          value={formik.values["body"]}
        />
      </div>
      <div
        className={` border  rounded-md p-4 grid gap-3 ${
          formik.errors["type"] && formik.touched["type"]
            ? "bg-red-100 border-red-500"
            : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center">
          <p>Select Category</p>
        </div>
        <select
          name="type"
          id="cars"
          onChange={formik.handleChange}
          value={formik.values["type"]}
        >
          <option value="" disabled>select one</option>
          {Categories.map((item:any,index:number)=>(<option key={index} value={item.value}>{item.label}</option>))}
        </select>
      </div>
      <div className="mt-10 p-2 rounded-lg bg-zinc-200 grid gap-2">
        <textarea
          className="w-full p-3 px-5 border border-blue-300 rounded-[15px] outline-blue-500"
          name={"url"}
          onChange={formik.handleChange}
          value={formik.values["url"]}
        />
      </div>
      <div className="mt-10 p-2 rounded-lg bg-zinc-200 grid gap-2">
        <textarea
          className="w-full p-3 px-5 border border-blue-300 rounded-[15px] outline-blue-500"
          name={"tags"}
          onChange={formik.handleChange}
          value={formik.values["tags"]}
        />
      </div>
      <button
              className="bg-zinc-800 hover:bg-black duration-300 rounded-lg text-base font-semibold text-white flex items-center justify-center gap-3 py-3 px-10"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p>Publishing...</p>
                </>
              ) : (
                <>
                  <PiUploadBold className="text-lg ml-2" />
                  <p>Publish</p>
                </>
              )}
            </button>
    </form></main>
  );
}

export default UploadForm;

export const Categories = [
  { label: "General", value: "General" },
  { label: "Education", value: "Education" },
  { label: "Health", value: "Health" },
  { label: "Culture", value: "Culture" },
  { label: "Commerce", value: "Commerce" },
  { label: "Agriculture", value: "Agriculture" },
  { label: "Living", value: "Living" },
];
