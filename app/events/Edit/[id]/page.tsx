import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
// import UploadForm from "./Form";
import { getArticlebyId } from "../../Add/func";
import { decodeId } from "@/components/common/Decode";
import dynamic from "next/dynamic";
async function page({ params }: { params: any }) {
  const UploadForm = dynamic(() => import('./Form'), { ssr: false });
  const ids = decodeId(params?.id);
  const ThisArticle = await getArticlebyId(ids);
  return (
    <AdminLayout active={"Articles"}>
      <div className="flex justify-center">
        <UploadForm data={ThisArticle?.data} />
      </div>
    </AdminLayout>
  );
}

export default page;
