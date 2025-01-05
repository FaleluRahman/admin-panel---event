import AdminLayout from "@/components/layouts/AdminLayout";
import { AxiosInStance } from "@/lib/axios";
import axios from "axios";
import React from "react";
const dynamic = "force-dynamic";
async function page() {
  const res = await AxiosInStance.get(
    "qrscans/payment.php?api=b1daf1bbc7bbd214045af&id=" + 1
  );
  const data = res.data.data || null;
  return (
    <AdminLayout active={"Articles"}>
      <div>
        <div>
          <h1 className="text-5xl font-bold text-center py-2 text-black">
            CAFE
          </h1>
          <div className="w-4/5 mx-auto">
            <h2>
              Total Points Recieved: <b>{data?.points || 0}</b>
            </h2>
            <div className="h-[90vh] overflow-auto bg-slate-50">
              <table className="table table-zebra text-black">
                <thead>
                  <tr>
                    <th>Sl.no</th>
                    <th>Date & Time</th>
                    <th>Student</th>
                    <th>points</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.transactions?.map((trn: any, index: number) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{trn.time}</td>
                      <td>{trn.student}</td>
                      <td>{trn.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default page;
