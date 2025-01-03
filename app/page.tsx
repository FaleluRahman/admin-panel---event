import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import Content from "./events/Content";
export const dynamic = "force-dynamic";

async function Home() {
  // const Articles = await getArticle();

  return (
    <>
      <AdminLayout active={"Articles"}>
      <Content/>
     </AdminLayout>
    </>
  );
}

export default Home;
