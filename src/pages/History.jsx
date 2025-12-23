import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  LayoutGrid,
  Upload,
  History,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  Eye,
  Download,
  Trash2,
  Calendar,
  Filter,
  Search,
} from "lucide-react";
import { useAuth } from "../firebase/useAuth";
import { logOut } from "../firebase/auth";

const HistoryPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  const historyItems = [
    {
      id: 1,
      name: "BankStatement_Jan2025.pdf",
      type: "Bank Statement",
      uploadedAt: "2025-01-15 10:24 AM",
      processedAt: "2025-01-15 10:24 AM",
      status: "Completed",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "GSTR-3B_Report.xlsx",
      type: "GST Report",
      uploadedAt: "2025-01-15 09:10 AM",
      processedAt: "2025-01-15 09:11 AM",
      status: "Completed",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "VendorInvoice_1023.pdf",
      type: "Invoice",
      uploadedAt: "2025-01-14 03:45 PM",
      processedAt: "2025-01-14 03:46 PM",
      status: "Completed",
      size: "856 KB",
    },
    {
      id: 4,
      name: "Payroll_Q4_2024.xls",
      type: "Payroll",
      uploadedAt: "2025-01-13 11:20 AM",
      processedAt: "2025-01-13 11:21 AM",
      status: "Completed",
      size: "3.2 MB",
    },
    {
      id: 5,
      name: "TaxReturn_2024.pdf",
      type: "Tax Document",
      uploadedAt: "2025-01-12 02:15 PM",
      processedAt: "2025-01-12 02:16 PM",
      status: "Completed",
      size: "1.5 MB",
    },
    {
      id: 6,
      name: "ExpenseReport_Dec.xlsx",
      type: "Expense Report",
      uploadedAt: "2025-01-11 09:30 AM",
      processedAt: "2025-01-11 09:31 AM",
      status: "Completed",
      size: "2.1 MB",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20 font-sans">
      {/* ------------------ SIDEBAR ------------------ */}
      <aside className="w-[260px] bg-[#FFFFFF] border-r border-[#E5E7EB]/80 flex flex-col justify-between shadow-premium">
        <div>
          <div className="flex items-center px-5 py-5 border-b border-[#E5E7EB]">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 border border-blue-100/50">
              <img src={logo} alt="" className="w-7 h-7" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent ml-3">FinSight</span>
          </div>

          <nav className="mt-6 px-3 space-y-1.5">
            <SidebarLink 
              icon={<LayoutGrid className="w-5 h-5" />} 
              label="Dashboard" 
              onClick={() => navigate("/dashboard")}
            />
            <SidebarLink 
              icon={<Upload className="w-5 h-5" />} 
              label="Upload Document" 
              onClick={() => navigate("/dashboard/upload")}
            />
            <SidebarLink 
              icon={<History className="w-5 h-5" />} 
              label="History" 
              active
              onClick={() => navigate("/dashboard/history")}
            />
            <SidebarLink 
              icon={<HelpCircle className="w-5 h-5" />} 
              label="Support" 
              onClick={() => navigate("/dashboard/support")}
            />
            <SidebarLink 
              icon={<Settings className="w-5 h-5" />} 
              label="Settings" 
              onClick={() => navigate("/dashboard/settings")}
            />
          </nav>
        </div>

        <div className="p-4 border-t border-[#E5E7EB]">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 text-[#475569] hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all duration-200 font-medium"
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ------------------ MAIN CONTENT ------------------ */}
      <main className="flex-1 flex flex-col">
        {/* ---------- TOP BAR ---------- */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-xl px-6 lg:px-8 py-4 lg:py-5 shadow-sm border-b border-[#E5E7EB]/50">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#0F172A] tracking-[-0.01em] leading-[1.3]">
            Document History
          </h1>

          <div className="flex items-center space-x-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center border border-blue-100/50">
              <FileText className="text-[#1E40AF] w-5 h-5" />
            </div>
          </div>
        </header>

        {/* ---------- HISTORY CONTENT ---------- */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E5E7EB]/60 p-5 lg:p-6">
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="w-full pl-11 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all duration-200"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[#E5E7EB] rounded-xl hover:bg-[#F8FAFC] hover:border-[#1E40AF]/30 transition-all duration-200 text-sm font-medium text-[#64748B] hover:text-[#0F172A]">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[#E5E7EB] rounded-xl hover:bg-[#F8FAFC] hover:border-[#1E40AF]/30 transition-all duration-200 text-sm font-medium text-[#64748B] hover:text-[#0F172A]">
                  <Calendar className="w-4 h-4" />
                  Date Range
                </button>
              </div>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E5E7EB]/60 overflow-hidden">
              <div className="px-5 lg:px-6 py-4 lg:py-5 border-b border-[#E5E7EB] bg-gradient-to-r from-[#F8FAFC]/50 to-transparent">
                <h3 className="text-base lg:text-lg font-semibold text-[#0F172A] tracking-[-0.01em] leading-[1.3]">
                  All Documents ({historyItems.length})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-[#64748B] bg-[#F8FAFC]/80 border-b border-[#E5E7EB]">
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Document Name</th>
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Type</th>
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Uploaded</th>
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Processed</th>
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Size</th>
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Status</th>
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {historyItems.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white hover:bg-[#F8FAFC]/50 transition-colors duration-150"
                      >
                        <td className="py-3 lg:py-4 px-4 lg:px-6 font-medium text-[#0F172A]">
                          {item.name}
                        </td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6 text-[#64748B]">{item.type}</td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6 text-[#64748B]">{item.uploadedAt}</td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6 text-[#64748B]">{item.processedAt}</td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6 text-[#64748B]">{item.size}</td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6">
                          <span className="inline-flex px-3 py-1.5 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6">
                          <div className="flex items-center gap-2 lg:gap-3">
                            <button className="p-2 text-[#94A3B8] hover:text-[#1E40AF] hover:bg-[#EFF6FF] rounded-lg transition-all duration-200" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-[#94A3B8] hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200" title="Download">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-[#94A3B8] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sidebar Link Component ---
const SidebarLink = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left group ${
      active 
        ? "text-[#2563EB] bg-[#EFF6FF]/60" 
        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
    }`}
  >
    {/* Subtle active indicator */}
    {active && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#2563EB] rounded-r-full"></div>
    )}
    <span className={`flex-shrink-0 mr-3 transition-colors duration-200 ${
      active ? 'text-[#2563EB]' : 'text-[#94A3B8] group-hover:text-[#475569]'
    }`}>
      {icon}
    </span>
    <span className="flex-1">{label}</span>
  </button>
);

export default HistoryPage;


