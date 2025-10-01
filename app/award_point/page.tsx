"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Award,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  Edit,
} from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";

const AdminPanel = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [modalResults, setModalResults] = useState<any>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [assigningPoints, setAssigningPoints] = useState<any>({});

  const API_BASE =
    "https://rend-application.abaqas.in/award/actions.php?api=b1daf1bbc7bbd214045af";
  const EXTERNAL_API = "https://rendezvous.abaqas.in/programs";

  const addToast = (type: string, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${EXTERNAL_API}/action.php?action=pagination&status=announced`
      );
      const data = await response.json();

      if (data.success && data.data) {
        setPrograms(data.data);
      } else {
        setError("Failed to fetch programs");
      }
    } catch (err) {
      setError("Network error: Could not connect to API");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async (program: any) => {
    setSelectedProgram(program);
    setShowModal(true);
    setLoadingModal(true);
    setModalResults(null);

    try {
      const response = await fetch(
        `${EXTERNAL_API}/results.php?action=resultCheck&program=${program.id}`
      );
      const data = await response.json();

      if (data.success && data.data) {
        // Check assignment status for each result from database
        const resultsWithStatus = await Promise.all(
          data.data.map(async (result: any) => {
            try {
              const checkRes = await fetch(
                `${API_BASE}&action=check_assignment&result_id=${result.id}&program_id=${program.id}`
              );
              const checkData = await checkRes.json();
              return {
                ...result,
                isAssigned: checkData.is_assigned || false
              };
            } catch {
              return { ...result, isAssigned: false };
            }
          })
        );

        setModalResults({
          ...data,
          data: resultsWithStatus
        });
      } else {
        addToast("error", "Failed to fetch results");
      }
    } catch (err) {
      addToast("error", "Network error: Could not fetch results");
      console.error("Modal fetch error:", err);
    } finally {
      setLoadingModal(false);
    }
  };

  const handleAssignPoints = async (resultItem: any) => {
    setAssigningPoints((prev: any) => ({ ...prev, [resultItem.id]: true }));

    try {
      const pointsMap: any = { 1: 100, 2: 80, 3: 60 };
      const points = pointsMap[resultItem.rank] || 0;

      if (points === 0) {
        addToast("error", "Only ranks 1-3 are eligible for points");
        setAssigningPoints((prev: any) => ({ ...prev, [resultItem.id]: false }));
        return;
      }

      const response = await fetch(`${API_BASE}&action=add_and_assign`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          result_id: resultItem.id,
          program_id: selectedProgram.id,
          jamia_id: resultItem.jamiaNo,
          student_name: resultItem.student,
          program_name: modalResults?.program?.name || selectedProgram?.name || "",
          program_type: resultItem.team ? "group" : "individual",
          rank_position: resultItem.rank,
        }),
      });

      const responseText = await response.text();
      console.log("Response:", responseText);

      if (!responseText || responseText.trim() === '') {
        addToast("error", "Empty response from server");
        setAssigningPoints((prev: any) => ({ ...prev, [resultItem.id]: false }));
        return;
      }

      let data;
      try {
        data = JSON.parse(responseText.trim());
      } catch (parseError) {
        console.error("Parse error:", parseError);
        console.error("Raw text:", responseText);
        addToast("error", "Invalid server response");
        setAssigningPoints((prev: any) => ({ ...prev, [resultItem.id]: false }));
        return;
      }

      if (data.success) {
        addToast(
          "success",
          `${data.points_assigned} points assigned to ${data.student_name}! Balance: ${data.new_wallet_balance} pts`
        );

        // Update UI to show assigned
        setModalResults((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: prev.data.map((item: any) =>
              item.id === resultItem.id ? { ...item, isAssigned: true } : item
            ),
          };
        });
      } else {
        addToast("error", data.message || "Failed to assign points");
      }
    } catch (err: any) {
      console.error("Error:", err);
      addToast("error", err.message || "Network error");
    } finally {
      setAssigningPoints((prev: any) => ({ ...prev, [resultItem.id]: false }));
    }
  };

  const getUniqueCategories = () => {
    return [...new Set(programs.map((p: any) => p.category))].sort();
  };

  const filteredPrograms = programs.filter((program: any) => {
    const categoryMatch =
      filterCategory === "all" || program.category === filterCategory;
    const searchMatch =
      searchTerm === "" ||
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.category.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const clearFilters = () => {
    setFilterCategory("all");
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`min-w-80 max-w-md p-4 rounded-lg shadow-lg border-l-4 ${
              toast.type === "success"
                ? "bg-green-50 border-green-500"
                : "bg-red-50 border-red-500"
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {toast.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="ml-3 flex-1">
                <p
                  className={`text-sm font-medium ${
                    toast.type === "success" ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-3 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Points Assignment Portal
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Assign points to students based on program results
                </p>
              </div>
            </div>
            <button
              onClick={fetchPrograms}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-red-800">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mb-6 bg-white rounded-lg shadow-sm border p-6 text-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Programs
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by name or category"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Filter
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {getUniqueCategories().map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-800 hover:text-white transition-colors flex items-center justify-center"
              >
                <Filter className="w-4 h-4 mr-1" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Programs Table */}
        <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
          {/* Gradient Header Bar */}
          <div className="h-2 bg-gradient-to-r from-pink-400 to-violet-500"></div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-pink-50 to-violet-50 border-b-2 border-violet-200">
                  <th className="px-6 py-4 pl-10 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Program Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Category
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredPrograms.map((program, idx) => (
                  <tr 
                    key={program.id} 
                    className="hover:bg-gradient-to-r hover:from-pink-25 hover:to-violet-25 transition-all duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-violet-100 text-sm font-bold text-violet-700">
                        {program.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-gray-900 uppercase">
                          {program.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-100 to-violet-100 text-violet-800 border border-violet-200">
                        {program.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleOpenModal(program)}
                        className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        Manage Points
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-violet-100 mb-4">
                <Users className="w-10 h-10 text-violet-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No programs found
              </h3>
              <p className="text-sm text-gray-500">
                Try adjusting your filters to see more results
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="relative inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              {loadingModal ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : modalResults && modalResults.data ? (
                <div className="flex flex-col gap-3 max-h-[80vh]">
                  {/* Header Section */}
                  <div className="flex flex-row items-center justify-between bg-violet-100 p-10 pb-7 pr-20">
                    <div className="flex flex-col items-start justify-between">
                      <p className="uppercase text-sm font-semibold text-gray-600">
                        {modalResults?.program?.category || selectedProgram?.category}
                      </p>

                      <h6 className="font-bold text-3xl bg-gradient-to-r from-pink-400 to-violet-500 bg-clip-text text-transparent text-left uppercase mt-2">
                        {selectedProgram?.name}
                      </h6>

                     
                    </div>
 <div className="flex items-baseline gap-2">
                        <p className="text-xl font-semibold  text-gray-700">#result</p>
                        <h6 className="font-bold text-8xl w-full text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-700 mt-4">
                          {selectedProgram?.id}
                        </h6>
                      </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-600 hover:text-gray-800 absolute top-4 right-4"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Gradient Bar */}
                  <div className="h-2 bg-gradient-to-r from-pink-400 to-violet-500"></div>

                  {/* Table Section */}
                  <div className="flex flex-col gap-3 px-6 pb-6 overflow-y-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2">
                          <th className="text-left py-3 px-2 font-semibold text-gray-700 uppercase text-sm">Place</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700 uppercase text-sm">Jamia id</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700 uppercase text-sm">Name</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700 uppercase text-sm">Campus</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700 uppercase text-sm">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalResults.data.map((result: any, index: number) => (
                          <tr
                            key={index}
                            className={`text-[15px] py-2 border-b hover:bg-gray-50 ${
                              !["1", "2", "3"].includes(result.rank.toString()) && "bg-gray-100"
                            } ${result.isAssigned ? "bg-green-50" : ""}`}
                          >
                         
                            <td className="py-3 px-2">
                              <div
                                className={`rounded-md p-2 flex items-center justify-center h-7 w-7 font-bold ${
                                  result.rank == 1
                                    ? "bg-yellow-200 text-gray-900"
                                    : result.rank == 2
                                    ? "bg-green-200 text-gray-900"
                                    : result.rank == 3
                                    ? "bg-pink-200 text-gray-900"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {result.rank}
                              </div>
                            </td>
                            <td className="py-3 px-2 text-gray-700">{result.jamiaNo}</td>
                            <td className="py-3 px-2 font-bold uppercase text-gray-900">
                              {result.student}
                            </td>
                            <td className="py-3 px-2 text-gray-700">{result.team || "—"}</td>
                            <td className="py-3 px-2">
                              {result.isAssigned ? (
                                <span className="inline-flex items-center text-sm text-green-700 bg-green-200 px-3 py-1 rounded-full font-medium">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Assigned
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleAssignPoints(result)}
                                  disabled={assigningPoints[result.id]}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {assigningPoints[result.id] ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                                  ) : (
                                    <Award className="w-4 h-4 mr-1" />
                                  )}
                                  Assign Points
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No results found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This program doesn't have any results yet
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 text-gray-600 hover:text-gray-800"
                  >
                    <X className="w-6 h-6 mx-auto" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default AdminPanel;