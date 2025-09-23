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
        <div className="min-h-screen bg-[#EEFBOE] p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#000000]">
                  Event Management
                </h1>
                <p className="text-[#8B8C8C] text-sm sm:text-base">
                  Manage and organize your events efficiently
                </p>
              </div>
              
              {/* Enhanced Add Event Button */}
              <Link
                href="/events/add"
                className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-out bg-[#DD0F19] rounded-xl shadow-lg hover:shadow-xl hover:bg-[#b80d16] transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#DD0F19] focus:ring-offset-2"
              >
                <svg 
                  className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-90" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Event
                <div className="absolute inset-0 rounded-xl bg-[#DD0F19] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#8B8C8C]/20 shadow-sm mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#EC5914] rounded-full animate-pulse"></div>
                  <span className="text-sm text-[#8B8C8C]">
                    {events.length} Events Found
                  </span>
                </div>
                <div className="text-xs text-[#8B8C8C]">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="max-w-7xl mx-auto">
            {events.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16 px-4">
                <div className="w-24 h-24 mx-auto mb-6 bg-[#EEFBOE] border-2 border-[#8B8C8C]/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#EC5914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#000000] mb-2">No Events Yet</h3>
                <p className="text-[#8B8C8C] mb-6">Get started by creating your first event</p>
                <Link
                  href="/events/add"
                  className="inline-flex items-center px-4 py-2 bg-[#DD0F19] text-white rounded-lg hover:bg-[#b80d16] transition-colors duration-200"
                >
                  Create Event
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((evt: any, index: number) => (
                  <div 
                    key={index}
                    className="group block transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  >
                    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#8B8C8C]/20">
                      {/* Card Header */}
                      <div className="h-32 bg-[#000000] relative overflow-hidden">
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#DD0F19]/20 rounded-full"></div>
                        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-[#EC5914]/10 rounded-full"></div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-4">
                        {/* Title */}
                        <div>
                          <Link href={"/events/" + evt.id}>
                            <h3 className="text-lg font-semibold text-[#000000] hover:text-[#DD0F19] transition-colors duration-200 line-clamp-2 cursor-pointer">
                              {evt.title || 'Untitled Event'}
                            </h3>
                          </Link>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-3">
                          {/* Time */}
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-[#EEFBOE] border border-[#8B8C8C]/20 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#EC5914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs text-[#8B8C8C] uppercase tracking-wide">Time</p>
                              <p className="text-sm font-medium text-[#000000]">{evt.time || 'Not specified'}</p>
                            </div>
                          </div>

                          {/* Type */}
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-[#EEFBOE] border border-[#8B8C8C]/20 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#DD0F19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs text-[#8B8C8C] uppercase tracking-wide">Type</p>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EC5914]/10 text-[#EC5914] border border-[#EC5914]/20">
                                {evt.type || 'General'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-[#8B8C8C]/20">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex space-x-2">
                              {/* Edit Button */}
                              <Link
                                href={`/events/edit/${evt.id}`}
                                className="inline-flex items-center justify-center w-8 h-8 bg-[#EC5914] hover:bg-[#d14f12] text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#EC5914] focus:ring-offset-1"
                                title="Edit Event"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </Link>

                              {/* Delete Button */}
                              <Link
                                href={`/events/delete/${evt.id}`}
                                className="inline-flex items-center justify-center w-8 h-8 bg-[#DD0F19] hover:bg-[#b80d16] text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DD0F19] focus:ring-offset-1"
                                title="Delete Event"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </Link>
                            </div>

                            {/* View Details Arrow */}
                            <Link href={"/events/" + evt.id} className="flex items-center space-x-1 text-[#8B8C8C] hover:text-[#DD0F19] transition-colors duration-200">
                              <span className="text-xs">View</span>
                              <svg 
                                className="w-4 h-4 transform transition-all duration-200 hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Hover Overlay Effect */}
                      <div className="absolute inset-0 bg-[#DD0F19]/0 hover:bg-[#DD0F19]/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default page;