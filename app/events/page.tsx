import React from "react";
import Content from "./Content";
import { getArticle } from "./Add/func";
import AdminLayout from "@/components/layouts/AdminLayout";
export const dynamic = "force-dynamic";

async function page() {
  // const Articles = await getArticle();

  return (
    <>
      <AdminLayout active={"Articles"}>
      <Content/>
     </AdminLayout>
    </>
  );
}

export default page;
