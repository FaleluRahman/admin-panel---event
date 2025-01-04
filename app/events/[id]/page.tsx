import AdminLayout from "@/components/layouts/AdminLayout";
import { AxiosInStance } from "@/lib/axios";
import QRCode from "react-qr-code";
import { notFound } from "next/navigation";

async function page({ params }: { params: any }) {
  const id = params.id;

  let event: any = null;

  await AxiosInStance.get(
    "/events/actions.php?api=b1daf1bbc7bbd214045af&id=" + id
  )
    .then((res) => {
      event = res?.data?.data || null;
    })
    .catch((error) => console.log(error));

  if (!event) {
    return notFound();
  }
  return (
    <>
      <AdminLayout active={"Articles"}>
        < div className="bg-zinc-200 shadow-md rounded-md p-2 boder flex justify-center flex-col items-center gap-3 border-zinc-300 text-black w-72 mx-auto min-h-60">
          <h3 className="text-xl font-bold">{event?.title}</h3>
          <p className="text-base font-semibold">{event?.type}</p>
          
            <QRCode
              size={256}
              bgColor="none"
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`event=${event?.id}`}
              viewBox={`0 0 256 256`}
            />
      
        </div>
      </AdminLayout>
    </>
  );
}

export default page;
