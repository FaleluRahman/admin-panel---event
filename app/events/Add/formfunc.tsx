
// import { ROOT_URL } from "@/components/data/func";
// import { Select } from "antd";
// import Image from "next/image";
// import { useState } from "react";

// const FormInput = ({
//   formik,
//   placeholder,
//   name,
//   label,
//   type,onWheel,
// }: {
//   formik: any;
//   placeholder: string;
//   name: string;
//   label: string;
//   type?: string;onWheel?:any
// }) => {
//   return (
//     <div className="py-2">
//       <div className="text-sm text-primary-600 my-1">{label}</div>
//       <input
//         type={type ?? "text"}
//         className={`w-full p-2 px-5 border  rounded-[10px] ${formik.errors[name] && formik.touched[name] ? "outline-red-500 border-red-500" : "outline-blue-500 border-blue-300"} `}
//         name={name}
//         onWheel={onWheel}
//         onChange={formik.handleChange}
//         value={formik.values[name]}
//         placeholder={placeholder}
//       />
//       <div>
//         {formik.errors[name] && formik.touched[name] && (
//           <p className="text-red-600 text-sm my-1 ml-1">
//             {formik.errors[name]}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormInput;

// export function FormTextArea({
//   formik,
//   placeholder,
//   name,
//   label,
// }: {
//   formik: any;
//   placeholder: string;
//   name: string;
//   label: string;
// }) {
//   return (
//     <div className="py-2">
//       <div className="text-sm text-primary-600 my-1">{label}</div>
//       <textarea
//         className="w-full p-2 px-5 border border-blue-300 rounded-[10px] outline-blue-500"
//         name={name}
//         onChange={formik.handleChange}
//         value={formik.values[name]}
//         placeholder={placeholder}
//       ></textarea>
//       <div>
//         {formik.errors[name] && formik.touched[name] && (
//           <p className="text-red-600 text-sm my-1 ml-1">
//             {formik.errors[name]}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export function FormSelect({
//   formik,
//   placeholder,
//   name,
//   label,
//   items,
// }: {
//   formik: any;
//   placeholder: string;
//   name: string;
//   label: string;
//   items: any[];
// }) {
//   return (
//     <div className="py-2">
//       <div className="text-sm text-primary-600 my-1">{label}</div>

//       <Select
//         options={items}
//         className="w-full"
//         size="large"
//         placeholder={placeholder}
//         value={formik.values[name]}
//         onChange={(value) => formik.setFieldValue(name, value)}
//       ></Select>

//       <div>
//         {formik.errors[name] && formik.touched[name] && (
//           <p className="text-red-600 text-sm my-1 ml-1">
//             {formik.errors[name]}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export function FormUpload({
//   formik,
//   placeholder,
//   name,
//   label,
//   fileTypes,
// }: {
//   formik: any;
//   placeholder: string;
//   name: string;
//   label: string;
//   fileTypes?: string;
// }) {
  
//   const [file, setFile] = useState<string | undefined>(undefined);
//   const formik_image = formik.values.file;
//   return (
//     <div className="py-2">
      
//       <div className="text-sm text-primary-600 my-3"></div>
//       <div className="w-full h-72 rounded-2xl bg-gray-100 relative flex flex-col items-center justify-center group">
//        <input
//           type="file" 
//           className={`absolute w-full h-full  opacity-0`}
//           name={name}
//           onChange={(e) => {
//             setFile(() => {
//               const file = e.target.files![0];
//               formik.setFieldValue(name, file);
//               return URL.createObjectURL(file);
//           });
          
//           }}
//           accept={fileTypes ?? "image/png, image/jpg, image/jpeg"}
//           placeholder={placeholder}
//         /> 
//         {file ? <div className="h-[60%] w-[80%] rounded-xl" style={{
//             backgroundImage: `url(${file})`,
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//           }}></div> : formik.values.file ? <div className="h-[60%] w-[80%] rounded-xl" style={{
//             backgroundImage: `url(${ROOT_URL}/uploads/products/${formik_image})`,
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//           }}></div> : ""
//         //   <Image alt="" width={200} height={200} src="/images/selectimage.png" className="duration-300 h-28 group-hover:-translate-y-1 group-hover:scale-[1.05]" />
//           }
//         <p className="mt-3 text-gray-400">
//           Drag an image here or <span className="text-blue-400">upload a file</span>
//         </p>{formik.errors[name] && formik.touched[name] && (
//             <p className="text-red-600 text-sm my-1 ml-1">
//               {formik.errors[name]}
//             </p>
//           )}

//         <div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

