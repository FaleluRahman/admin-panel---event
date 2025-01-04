import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";

async function Home() {
  // const Articles = await getArticle();

  return (
    <>
      <AdminLayout active={"Articles"}>
      {/* <Content/> */}
     </AdminLayout>
    </>
  );
}

export default Home;
