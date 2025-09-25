import AdminLayout from "@/components/layouts/AdminLayout";
import Form from "./Form";
function page() {

  return (
    <AdminLayout active={"Articles"}>
 
        <Form/>
      
    </AdminLayout>
  );
}

export default page;