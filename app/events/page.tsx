import AdminLayout from "@/components/layouts/AdminLayout";
import { AxiosInStance } from "@/lib/axios";
import Link from "next/link";
export const dynamic = "force-dynamic";

async function page() {
  let events: any = [];
  await AxiosInStance.get("/events/actions.php?api=b1daf1bbc7bbd214045af")
    .then((res) => {
      events = res?.data?.data || [];
    })
    .catch((err) => console.log(err));
  console.log(events);

  return (
    <>
      <AdminLayout active={"Articles"}>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3">
         <div className="  flex w-full flex-col justify-end">
         <a 
          className="bg-blue-500 rounded-xl px-2 py-1 w-fit  "
          href="/events/add">Add Event</a>
         </div>
     
          {events.map((evt: any, index: number) => (
            <Link href={"/events/" + evt.id} key={index}>
              <div className="bg-zinc-200 shadow-md rounded-md p-2 boder border-zinc-300 text-black w-full justify-between">
                <h3>Title:{evt.title}</h3>
                <p>Time:{evt.time}</p>
                <p>Type:{evt.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </AdminLayout>
    </>
  );
}

export default page;
