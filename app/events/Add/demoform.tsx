// "use client";
// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { uploadArticle } from "./func";
// import { Categories } from "./Form";
// import { ArraytoString } from "@/components/decodeTags";
// import FormInput, { FormTextArea } from "@/components/FormAssets";
// import Button from "@/components/Button";

// function UploadForm() {
//   const router = useRouter();
//   const sizes: any = [
//     { label: "S", value: "s" },
//     { label: "M", value: "m" },
//     { label: "L", value: "l" },
//     { label: "XL", value: "xl" },
//     { label: "XX", value: "xx" },
//   ];
//   const [loading, setLoading] = useState(false);
//   const [cat, setCat] = useState<any>(null);
//   const formik = useFormik({
//     initialValues: {
//         // file: "",
//         image: "",
//         title: "",
//         body: "",
//         type: "",
//         url: "",
//         tags: [],
//         status: "active",
//     },
//     validationSchema: Yup.object({
//        // file: Yup.mixed().required("Image is required"),
//        title: Yup.string().required("Title is required"),
//        body: Yup.string().required("Content is required"),
//        type: Yup.string().required("Category is required"),
//        author: Yup.string().required("Author is required"),
//        url: Yup.string().required("URL is required"),
//       //  tags: Yup.array().min(1, "At least one tag is required"),
//     }),
//     onSubmit: async (values) => {
//         try {
//           setLoading(true);
//           console.log("true");
          
//           // const imageUploadResult = await uploadImage(values.file);
//           // if (imageUploadResult?.success) {
//           //   console.log("Image Added");
//             const image = "prism.jpg"
//             const newsUploadResult = await uploadArticle(
//               values.title,
//               values.body,
//               image,
//               values.type,
//               values.url,
//               ArraytoString(values.tags),
//               values.status
//             );
//             if (newsUploadResult) {
//               toast.success("News uploaded successfully");
//               router.replace("/admin/articles/");
//               router.refresh();
//             } else {
//               toast.error("Something went wrong!");
//             }
//           // }
//         } catch (error) {
//           toast.error("Something went wrong!");
//         } finally {
//           setLoading(false);
//         }
//       },
//   });


//   return (
//     <div className="flex justify-center py-10 bg-white mt-10 rounded-3xl">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-10"
//       >
//         <div>
//           {/* <FormUpload
//             formik={formik}
//             label="Image (optional)"
//             name="file"
//             placeholder="Image"
//             fileTypes=".png,.jpg,.jpeg,.webp"
//           /> */}
//           <FormInput
//             formik={formik}
//             label=" title"
//             name="title"
//             placeholder="title"
//           />
//           <FormInput
//             formik={formik}
//             label=" body"
//             name="body"
//             placeholder="body"
//           />
//           <div className="py-2">
//       <div className="text-sm text-primary-600 my-1">{"category"}</div>
// <select
//           name="type"
//           id="cars"
//           onChange={formik.handleChange}
//           value={formik.values["type"]}
//         >
//           <option value="" disabled>select one</option>
//           {Categories.map((item:any,index:number)=>(<option key={index} value={item.value}>{item.label}</option>))}
//         </select>
//         {/* <AutoComplete value={formik.values["type"]} suggestions={Categories} onChange={formik.handleChange}  /> */}
//       <div>
//         {formik.errors["type"] && formik.touched["type"] && (
//           <p className="text-red-600 text-sm my-1 ml-1">
//             {formik.errors["type"]}
//           </p>
//         )}
//       </div>
//     </div>
          
//         </div>
//         <div><FormInput
//             formik={formik}
//             type="text"
//             label="url"
//             name="url"
//             placeholder="url"
//           />
//           <FormTextArea
//             formik={formik}
//             label=" tags"
//             name="tags"
//             placeholder="tags"
//           />
          
//         </div>
//         <div className="flex items-center gap-4 w-full justify-center col-span-2">
//           <Button loading={loading} />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UploadForm;
import React from 'react'

function demoform() {
  return (
    <div>
      
    </div>
  )
}

export default demoform
