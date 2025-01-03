import { Select } from "antd";
import {useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BiSolidImageAdd } from "react-icons/bi";
import ImageCrop from "./ImageCrop";
import { ROOT_URL } from "./data/func";

export const TitleInput = ({
  formik,
  placeholder,
  name,hieght
}: {
  formik: any;
  placeholder: string;
  name: string;
  label: string;
  type?: string;hieght?:string
}) => {

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData(); // Get the updated data from the editor
    formik.setFieldValue(name, data); // Update the corresponding Formik field
  };

  return (
    <div className="py-2">
      <textarea
        className={`w-full p-3 px-5 border-b  outline-none focus:border-b-2 rounded ${
          formik.errors[name] && formik.touched[name]
            ? "bg-red-50 border-red-500 border-b-2 "
            : "bg-white border-black"
        } ${hieght?hieght:'h-40'} text-xl font-semibold text-black`}
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        placeholder={placeholder}
      />
      <div>
        {formik.errors[name] && formik.touched[name] && (
          <p className="text-red-600 text-sm my-1 ml-1">
            {formik.errors[name]}
          </p>
        )}
      </div>
    </div>
  );
};

interface BodyInputProps {
  formik: any;
  name: string;
  label: string;
}

// export const BodyInput: React.FC<BodyInputProps> = ({
//   formik,
//   name,
//   label,
// }) => {
//   const handleEditorChange = (event: any, editor: any) => {
//     const data = editor.getData();
//     formik.setFieldValue(name, data);
//   };

//   return (
//     <div className="p-2 bg-white">
//       <div className="text-sm text-blue-600 my-1 "></div>
//       <CKEditor
//   editor={ClassicEditor}
//   data={formik.values[name]} // Use 'data' instead of 'initData'
//   onChange={handleEditorChange}
// />

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

const FormInput = ({
  formik,
  placeholder,
  name,
  label,
  type,
}: {
  formik: any;
  placeholder: string;
  name: string;
  label: string;
  type?: string;
}) => {
  return (
    <div className="py-2">
      <div className="text-sm text-blue-600 my-1">{label}</div>
      <input
        type={type ?? "text"}
        className="w-full p-3 px-5 border border-blue-300 rounded-[15px] outline-blue-500"
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        placeholder={placeholder}
      />
      <div>
        {formik.errors[name] && formik.touched[name] && (
          <p className="text-red-600 text-sm my-1 ml-1">
            {formik.errors[name]}
          </p>
        )}
      </div>
    </div>
  );
};

export const FormCusInput = ({
  formik,
  placeholder,
  name,
  label,
  type,
}: {
  formik: any;
  placeholder: string;
  name: string;
  label: string;
  type?: string;
}) => {
  return (
    <div className="py-2">
      <div className="text-sm text-blue-600 my-1">{label}</div>
      <input
        type={type ?? "text"}
        className={`w-full p-3 px-5 border-b ${
          formik.errors[name] && formik.touched[name]
            ? "border-red-500 bg-red-200 placeholder:text-red-500"
            : "border-zinc-900 bg-zinc-100"
        } focus:border-b-2   rounded-md outline-none`}
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        placeholder={placeholder}
      />
      <div>
        {formik.errors[name] && formik.touched[name] && (
          <p className="text-red-600 text-sm my-1 ml-1">
            {formik.errors[name]}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormInput;

export function FormTextArea({
  formik,
  placeholder,
  name,
  label,
}: {
  formik: any;
  placeholder: string;
  name: string;
  label: string;
}) {
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    formik.setFieldValue(name, data);
  };
  return (
    <div className="py-2">
      <div className="text-sm text-blue-600 my-1">{label}</div>
      <textarea
        className="w-full p-3 px-5 border border-blue-300 rounded-[15px] outline-blue-500"
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        placeholder={placeholder}
      ></textarea>
      <div>
        {formik.errors[name] && formik.touched[name] && (
          <p className="text-red-600 text-sm my-1 ml-1">
            {formik.errors[name]}
          </p>
        )}
      </div>
    </div>
  );
}
// export function FormCkeditor({
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
//   const handleEditorChange = (event: any, editor: any) => {
//     const data = editor.getData();
//     formik.setFieldValue(name, data);
//   };
//   return (
//     <div className="py-2">
//       <div className="text-sm text-blue-600 my-1">{label}</div>
//       <CKEditor
//         editor={ClassicEditor}
//         initData={formik.values[name]}
//         onChange={handleEditorChange}
//       />
//       {/* <textarea
//         className="w-full p-3 px-5 border border-blue-300 rounded-[15px] outline-blue-500"
//         name={name}
//         onChange={formik.handleChange}
//         value={formik.values[name]}
//         placeholder={placeholder}
//       ></textarea> */}
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
export function FormSelect({
  formik,
  placeholder,
  name,
  label,
  items,
}: {
  formik: any;
  placeholder: string;
  name: string;
  label: string;
  items: any[];
}) {
  return (
    <div className="py-2">
      <div className="text-sm text-blue-600 my-1">{label}</div>
      <Select
        options={items}
        className="w-full"
        size="large"
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={(value) => formik.setFieldValue(name, value)}
      ></Select>
      <div>
        {formik.errors[name] && formik.touched[name] && (
          <p className="text-red-600 text-sm my-1 ml-1">
            {formik.errors[name]}
          </p>
        )}
      </div>
    </div>
  );
}

export function FormUpload({
  add_url,
  formik,
  placeholder,
  name,
  label,
  fileTypes,
}: {
  add_url?: any;
  formik: any;
  placeholder: string;
  name: string;
  label: string;
  fileTypes?: string;
}) {
  const [file, setFile] = useState<string | undefined>(undefined);
  const formik_image = formik.values.file;
  const [view, setView] = useState(false);
  const [img, setImg] = useState<any>(null);

  return (
    <>
      <div className="grid gap-2">
        <div
          className={`w-full h-72 rounded-lg border ${
            formik.errors[name] && formik.touched[name]
              ? "bg-red-100 border-red-500"
              : "bg-white border-zinc-900"
          }  flex flex-col items-center justify-center group `}
        >
          {img ? (
            <div
              className="h-full w-full rounded-lg "
              style={{
                backgroundImage: `url(${URL.createObjectURL(img)})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          ) : formik.values.file ? (
            <div
              className="h-full w-full rounded-lg "
              style={{
                backgroundImage: `url(${ROOT_URL}/uploads/news/${formik_image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          ) : (
            <BiSolidImageAdd className="text-8xl opacity-50" />
          )}

          <div></div>
        </div>
        <button
          type="button"
          onClick={() => setView(true)}
          className={`w-full bg-zinc-900 text-white text-md font-semibold p-2 rounded-md`}
        >
          {img || formik_image ? "Change Image" : "Select Image"}
        </button>
      </div>
      {view && (
        <ImageCrop
          close={() => setView(false)}
          formik={formik}
          name={name}
          img={setImg}
        />
      )}
    </>
  );
}

// ------------------cv------------------------

export function FormCV({
  formik,
  placeholder,
  name,
  label,
  fileTypes,
}: {
  formik: any;
  placeholder: string;
  name: string;
  label: string;
  fileTypes?: string;
}) {
  const [file, setFile] = useState();
  return (
    <>
      <div className="py-2">
        <div className="text-sm text-blue-600 my-3"></div>
        <div className="w-full h-72 rounded-2xl bg-gray-100 relative flex flex-col items-center justify-center group">
          <input
            type="file"
            className={`absolute w-full h-full  opacity-0`}
            name={name}
            onChange={(e) => {
              setFile(() => {
                const file = e.target.files![0];
                formik.setFieldValue(name, file);
              });
            }}
            accept={fileTypes ?? "image/png, image/jpg, image/jpeg"}
            placeholder={placeholder}
          />
          {/* <button
            type="button"
            onClick={() => setView(true)}
            className={`absolute w-full h-full  opacity-0`}
          >
            click
          </button> */}
          {formik.values.cv ? (
            <div
              className="h-[60%] w-[80%] rounded-xl"
              style={{
                backgroundImage: `url(/images/pdf_temp.jpg)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          ) : (
            <img
              src="/images/selectimage.png"
              alt="hghfkj"
              className="duration-300 h-28 group-hover:-translate-y-1 group-hover:scale-[1.05]"
            />
          )}
          <p className="mt-3 text-gray-400">
            Drag your CV here or
            <span className="text-blue-400"> upload CV file</span>
          </p>
          {formik.errors[name] && formik.touched[name] && (
            <p className="text-red-600 text-sm my-1 ml-1">
              {formik.errors[name]}
            </p>
          )}

          <div></div>
        </div>
      </div>
    </>
  );
}
