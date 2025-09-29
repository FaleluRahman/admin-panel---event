"use client"

import { useState, useEffect } from "react";
import {
  Users,
  Award,
 
  CheckCircle,
  AlertCircle,
  Loader2,
  Wallet,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Filter,
  X,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";

interface StudentRanking {
  id: number;
  jamia_id: string;
  student_name: string;
  program_name: string;
  program_type: string;
  rank_position: number;
  points_eligible: number;
  points_assigned?: number;
  is_assigned: boolean;
  assigned_date?: string;
  assigned_by?: string;
  can_assign: boolean;
}

interface WalletState {
  balance?: number;
  showBalance: boolean;
}

interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

const AdminPanel = () => {
  const [rankings, setRankings] = useState<StudentRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [assigningPoints, setAssigningPoints] = useState<Record<number, boolean>>({});
  const [showWalletDetails, setShowWalletDetails] = useState<Record<string, WalletState>>({});
  const [fetchingWallet, setFetchingWallet] = useState<Record<string, boolean>>({});
  
  // Filters
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE = "https://rend-application.abaqas.in/award/actions.php?api=b1daf1bbc7bbd214045af";

  // Toast notification functions
  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    initializeSystem();
  }, []);

  const initializeSystem = async () => {
    try {
      // Setup tables first
      await fetch(`${API_BASE}&action=setup_tables`, { method: "POST" });
      await fetchRankings();
    } catch (err) {
      console.error("Initialization error:", err);
      await fetchRankings(); // Try to fetch anyway
    }
  };

  const fetchRankings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}&action=get_rankings`);
      const data = await response.json();

      if (data.success) {
        setRankings(data.data || []);
      } else {
        setError(data.message || "Failed to fetch rankings");
      }
    } catch (err) {
      setError("Network error: Could not connect to backend. Make sure your PHP server is running.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPoints = async (ranking: StudentRanking) => {
    setAssigningPoints((prev) => ({ ...prev, [ranking.id]: true }));

    try {
      const response = await fetch(`${API_BASE}&action=assign_points`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ranking_id: ranking.id }),
      });

      const data = await response.json();

      if (data.success) {
        addToast(
          "success",
          `Points assigned successfully! ${data.points_assigned} pts added to ${data.student_name}'s wallet. New balance: ${data.new_wallet_balance} pts`
        );
        
        // Update local state
        setRankings((prev) =>
          prev.map((r) =>
            r.id === ranking.id
              ? {
                  ...r,
                  is_assigned: true,
                  points_assigned: data.points_assigned,
                  assigned_date: new Date().toISOString(),
                  assigned_by: "admin",
                  can_assign: false,
                }
              : r
          )
        );

        // Update wallet display if visible
        if (showWalletDetails[ranking.jamia_id]?.showBalance) {
          setShowWalletDetails((prev) => ({
            ...prev,
            [ranking.jamia_id]: {
              ...prev[ranking.jamia_id],
              balance: data.new_wallet_balance,
            },
          }));
        }
      } else {
        addToast("error", data.message);
      }
    } catch (err) {
      addToast("error", "Network error: Could not assign points");
      console.error("Assignment error:", err);
    } finally {
      setAssigningPoints((prev) => ({ ...prev, [ranking.id]: false }));
    }
  };

  const checkWalletBalance = async (jamiaId: string) => {
    if (showWalletDetails[jamiaId]?.showBalance) {
      setShowWalletDetails((prev) => ({
        ...prev,
        [jamiaId]: { ...prev[jamiaId], showBalance: false },
      }));
      return;
    }

    setFetchingWallet((prev) => ({ ...prev, [jamiaId]: true }));

    try {
      const response = await fetch(`${API_BASE}&action=get_wallet&jamia_id=${jamiaId}`);
      const data = await response.json();

      if (data.success) {
        setShowWalletDetails((prev) => ({
          ...prev,
          [jamiaId]: { balance: data.wallet_points, showBalance: true },
        }));
      } else {
        setError("Failed to fetch wallet balance");
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError("Network error: Could not fetch wallet balance");
      console.error("Wallet error:", err);
      setTimeout(() => setError(null), 3000);
    } finally {
      setFetchingWallet((prev) => ({ ...prev, [jamiaId]: false }));
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return "/images/1.png";
      case 2: return "/images/2.png";
      case 3: return "/images/3.png";
      default: return "/images/1.png";
    }
  };

  const getUniquePrograms = () => {
    return [...new Set(rankings.map((r) => r.program_name))].sort();
  };

  const filteredRankings = rankings.filter((ranking) => {
    const programMatch = filterProgram === "all" || ranking.program_name === filterProgram;
    const statusMatch = filterStatus === "all" || 
      (filterStatus === "assigned" && ranking.is_assigned) ||
      (filterStatus === "pending" && !ranking.is_assigned);
    const searchMatch = searchTerm === "" || 
      ranking.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ranking.jamia_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ranking.program_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return programMatch && statusMatch && searchMatch;
  });

  // Clear filters
  const clearFilters = () => {
    setFilterProgram("all");
    setFilterStatus("all");
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading student rankings...</p>
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
              className={`min-w-80 max-w-md p-4 rounded-lg shadow-lg border-l-4 animate-slide-in ${
                toast.type === "success"
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
              style={{
                animation: "slideInRight 0.3s ease-out"
              }}
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
                  className={`ml-3 flex-shrink-0 ${
                    toast.type === "success"
                      ? "text-green-600 hover:text-green-800"
                      : "text-red-600 hover:text-red-800"
                  }`}
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
                    Assign points to student wallets based on their individual program Prizes
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchRankings}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Error Message (kept separate from toasts for persistent errors) */}
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

          {/* Filters and Search */}
          <div className="mb-6 bg-white rounded-lg shadow-sm border p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 text-gray-700 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Students
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search by name, ID, or program"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Filter
                </label>
                <select
                  value={filterProgram}
                  onChange={(e) => setFilterProgram(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Programs ({rankings.length})</option>
                  {getUniquePrograms().map((program) => (
                    <option key={program} value={program}>
                      {program} ({rankings.filter(r => r.program_name === program).length})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Filter
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending ({rankings.filter(r => !r.is_assigned).length})</option>
                  <option value="assigned">Assigned ({rankings.filter(r => r.is_assigned).length})</option>
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

          {/* Main Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Eligible Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wallet
                    </th>
                
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRankings.map((ranking) => {
                    const walletDetails = showWalletDetails[ranking.jamia_id];
                    const fetchingWalletData = fetchingWallet[ranking.jamia_id];
                    const isAssigning = assigningPoints[ranking.id];

                    return (
                      <tr 
                        key={ranking.id} 
                        className={`hover:bg-gray-50 ${ranking.is_assigned ? "bg-green-25" : ""}`}
                      >
                        {/* Rank */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <img
                              src={getRankBadgeColor(ranking.rank_position)}
                              alt={`Rank ${ranking.rank_position}`}
                              className="w-6 h-6"
                            />
                          </div>
                        </td>

                        {/* Student Details */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {ranking.student_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Jamia Id: {ranking.jamia_id}
                          </div>
                        </td>

                        {/* Program */}
                        <td className="px-6 py-4 w-fit">
                          <div className="flex flex-col w-fit">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-2xl text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                              {ranking.program_name}
                            </span>
                          </div>
                        </td>

                        {/* Eligible Points */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-green-600">
                            {ranking.points_eligible} pts
                          </div>
                        </td>

                        {/* Wallet */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => checkWalletBalance(ranking.jamia_id)}
                              disabled={fetchingWalletData}
                              className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors disabled:opacity-50"
                            >
                              {fetchingWalletData ? (
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <Wallet className="w-3 h-3 mr-1" />
                              )}
                              {walletDetails?.showBalance ? (
                                <>
                                  <EyeOff className="w-3 h-3 mr-1" />
                                  Hide
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3 mr-1" />
                                  Check
                                </>
                              )}
                            </button>
                            {walletDetails?.showBalance && (
                              <span className="text-sm font-medium text-blue-600">
                                {walletDetails.balance || 0} pts
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {ranking.can_assign ? (
                            <button
                              onClick={() => handleAssignPoints(ranking)}
                              disabled={isAssigning}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isAssigning ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                                  Assigning...
                                </>
                              ) : (
                                <>
                                  <Award className="w-4 h-4 mr-1" />
                                  Assign pts
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="flex items-center text-sm text-green-600 bg-green-100 px-3 py-2 rounded-2xl w-fit"> 
                              <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
                              Assigned
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredRankings.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No rankings found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {rankings.length === 0 
                    ? "No student rankings are available from the backend. Rankings need to be added via the database or API."
                    : `No rankings match the selected filters`}
                </p>
                <button
                  onClick={fetchRankings}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh Data
                </button>
              </div>
            )}
          </div>

          {/* Summary Stats */}
          {rankings.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600">
                    {rankings.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">
                    {rankings
                      .filter((r) => r.is_assigned)
                      .reduce((sum, r) => sum + (r.points_assigned || 0), 0)}{" "}
                    pts
                  </div>
                  <div className="text-sm text-gray-600">Points Assigned</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg border">
                  <div className="text-2xl font-bold text-yellow-600">
                    {rankings.filter((r) => !r.is_assigned).length}
                  </div>
                  <div className="text-sm text-gray-600">Pending Assignments</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border">
                  <div className="text-2xl font-bold text-purple-600">
                    {getUniquePrograms().length}
                  </div>
                  <div className="text-sm text-gray-600">Programs</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminPanel;