"use client";

import { useState, useMemo, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput, {
  FormCusInput,
  BodyInput,
  FormSelect,
  FormUpload,
  TitleInput,
} from "@/components/common/FormAssets";
import { useRouter } from "next/navigation";
import { PiUploadBold } from "react-icons/pi";
import { RiSave3Line } from "react-icons/ri";
import { convertToDate } from "@/components/common/ConvertToDDMMYYYY";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { Select } from "antd";
import { antFilterOption } from "@/components/common/antFillteroption";
import { ArraytoString, StringtoArray } from "@/components/common/decodeTags";
import { updateArticle, uploadImage } from "../../Add/func";
import { id } from "date-fns/locale";
import { Categories } from "../../Add/Form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const UploadForm = ({ data }: { data: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const POST_STATUS = useMemo(
    () => [
      { value: "active", label: "active" },
      { value: "inactive", label: "inactive" },
    ],
    []
  );

  useEffect(() => {
    if (data) {
      formik.setValues({
        file: data?.image,
        image: data?.image,
        title: data?.title,
        body: data?.body,
        type: data?.category,
        url: data?.url,
        tags: StringtoArray(data?.tags),
        status: data?.status ?? "active",
      });
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      file: null,
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
      tags: Yup.array().min(1, "At least one tag is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (formik.values.file !== data?.image) {
          const imageUploadResult = await uploadImage(values.file);
          if (imageUploadResult?.success) {
            const image = imageUploadResult.filename;
            const newsUploadResult = await updateArticle(
              data?.id,
              values.title,
              values.body,
              image,
              values.type,
              values.url,
              ArraytoString(values.tags),
              values.status
            );
            if (newsUploadResult) {
              toast.success("News updated successfully");
              router.replace("/admin/articles/");
              router.refresh();
            } else {
              toast.error("Something went wrong!");
            }
          }
        } else {
          const image = data?.image;
          const newsUploadResult = await updateArticle(
            data?.id,
            values.title,
            values.body,
            image,
            values.type,
            values.url,
            ArraytoString(values.tags),
            values.status
          );
          if (newsUploadResult) {
            toast.success("News updated successfully");
            router.replace("/admin/articles/");
            router.refresh();
          } else {
            toast.error("Something went wrong!");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-[95%] max-w-[1200px] flex items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="col-span-2">
          <TitleInput
            formik={formik}
            label="Title"
            name="title"
            placeholder="Title"
          />
          <BodyInput formik={formik} name="body" label="" />

          <div className="bg-white rounded-md mt-4 p-4 grid gap-1">
            <div className="flex justify-between items-center">
              <p>Select Tags</p>
            </div>
            <Select
              variant="borderless"
              mode="tags"
              className="w-full border rounded-md focus:border-zinc-900 mt-2 py-1 cursor-pointer"
              showSearch
              placeholder="Select tags"
              size="large"
              filterOption={antFilterOption}
              value={formik.values["tags"]}
              onChange={(value) => formik.setFieldValue("tags", value)}
              options={Categories}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid gap-2 w-full text-lg">
            <button
              className={`bg-zinc-800 hover:bg-black ${
                loading && "bg-zinc-700"
              } duration-300 rounded-lg text-base font-semibold text-white flex items-center justify-center gap-3 py-3 px-10`}
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
                  <p>Updating...</p>
                </>
              ) : (
                <>
                  <PiUploadBold className="text-lg ml-2" />
                  <p>Update</p>
                </>
              )}
            </button>
            <button
              className="btn bg-white text-zinc-800 border-zinc-700"
              disabled
            >
              <RiSave3Line className="mr-2 text-lg" />
              Save & Unlist
            </button>
          </div>
          <div
            className={` border mt-5 rounded-md p-4 grid gap-3 ${
              formik.errors["file"] && formik.touched["file"]
                ? "bg-red-100 border-red-500"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <p>Select image</p>
            </div>
            <FormUpload
              add_url=""
              formik={formik}
              label="Upload Image"
              placeholder="Select Item"
              name="file"
              fileTypes="image/*"
            />
          </div>

          <div className="mt-2 p-2 rounded-lg bg-zinc-200 grid gap-2">
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
              <FormSelect
                formik={formik}
                name="type"
                placeholder="Select Category"
                label=""
                items={Categories}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
