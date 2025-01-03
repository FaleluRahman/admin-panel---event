import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import UploadForm from "./demoform";
import dynamic from "next/dynamic";
function page() {
const UploadForm = dynamic(() => import('./Form'));

  return (
    <AdminLayout active={"Articles"}>
        {/* <UploadForm /> */}
        <UploadForm/>
    </AdminLayout>
  );
}

export default page;
