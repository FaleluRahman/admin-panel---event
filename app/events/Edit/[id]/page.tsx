import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
// import UploadForm from "./Form";

import UploadForm from "./Form";
import { decodeId } from "@/components/Decode";
async function page({ params }: { params: any }) {
  const ids = decodeId(params?.id);
  return (
    <AdminLayout active={"Articles"}>
      <div className="flex justify-center">
        {/* <UploadForm data={ThisArticle?.data} /> */}
      </div>
    </AdminLayout>
  );
}

export default page;
