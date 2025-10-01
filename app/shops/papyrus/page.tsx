import AdminLayout from "@/components/layouts/AdminLayout";
import PDFDownloadButton from "@/components/layouts/PDFDownloadButton";
import { AxiosInStance } from "@/lib/axios";
import axios from "axios";
import { Coffee, LibraryBig, ReceiptIndianRupee } from "lucide-react";
import React from "react";
import { GiRolledCloth } from "react-icons/gi";
export const dynamic = "force-dynamic";

async function page() {
  const res = await AxiosInStance.get(
    "qrscans/payment.php?api=b1daf1bbc7bbd214045af&id=" + 5
  );
  const data = res.data.data || null;

  return (
    <AdminLayout active={"Articles"}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mb-8 p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <LibraryBig  />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Papyrus  Reading Carnival
                    </h1>
                  </div>
                </div>
                <p className="text-lg text-gray-600 font-medium">Transaction History Dashboard</p>
                {/* <p className="text-sm text-gray-500">Monitor and track all point transactions</p> */}
              </div>
              <div className="flex-shrink-0">
<PDFDownloadButton 
  data={data} 
  title="Papyrus" 
  subtitle="Transaction History" 
  fileName="transaction_history of Papyrus   "
/>              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                 <ReceiptIndianRupee/> 
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Points</div>
                  <div className="text-sm text-gray-400">1 point equals to ₹1 Rupee</div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  {data?.points?.toLocaleString() || '0'}
                </p>
                <div className="flex items-center gap-2">
                
                </div>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Transactions</div>
                  <div className="text-sm text-gray-400">Total Count</div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                  {data?.transactions?.length?.toLocaleString() || '0'}
                </p>
                <div className="flex items-center gap-2">
                  
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Transaction Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-8 py-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
                    <p className="text-sm text-gray-600">Complete record of all point transactions</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 bg-white/60 px-3 py-1.5 rounded-full">
                  {data?.transactions?.length || 0} Transactions
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto" style={{height: "70vh"}}>
              {data?.transactions && data.transactions.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50/30 sticky top-0 z-10 backdrop-blur-sm">
                    <tr>
                      <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200/50">
                        <div className="flex items-center gap-2">
                          Sl. No
                        </div>
                      </th>
                      <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200/50">
                        <div className="flex items-center gap-2">
                          Date & Time
                        </div>
                      </th>
                      <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200/50">
                        <div className="flex items-center gap-2">
                          Student
                        </div>
                      </th>
                      <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200/50">
                        <div className="flex items-center gap-2">
                          Points
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.transactions.map((trn: any, index: number) => (
                      <tr key={trn.id || index} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200 group">
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:text-blue-700 transition-all duration-200">
                              {index + 1}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">{trn.created_at}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                          
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-white bg-blue-500 px-3 py-1.5 rounded-full">{trn.student}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-black ">
                              
                              +{trn.points}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Transactions Found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    There are no transactions to display at this time. Once transactions are recorded, they will appear here.
                  </p>
                  <div className="mt-6">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Refresh Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

export default page;