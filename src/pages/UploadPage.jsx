import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  LayoutGrid,
  Upload as UploadIcon,
  History,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../firebase/useAuth";
import { logOut } from "../firebase/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/DropdownMenu";

const DOCUMENT_TYPES = [
  { value: "bank_statement", label: "Bank Statement" },
  { value: "gst_return", label: "GST Returns" },
  { value: "trial_balance", label: "Trial Balance" },
  { value: "audit", label: "Audit" },
];

const UploadPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Audit-specific state
  const [auditFiles, setAuditFiles] = useState({
    trialBalance: null,
    profitLossStatement: null,
    balanceSheet: null,
    generalLedger: null,
    cashBook: null,
    bankStatement: null,
    fixedAssetRegister: null,
    gstReturns: null,
    tdsSummary: null,
  });

  // GST-specific state
  const [gstFiles, setGstFiles] = useState({
    gstr2bSummary: null,
    purchaseRegister: null,
    vendorMaster: null,
  });

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  // Remove file
  const removeFile = () => {
    setFile(null);
    setDocumentType("");
    // Reset audit files when document type changes
    setAuditFiles({
      trialBalance: null,
      profitLossStatement: null,
      balanceSheet: null,
      generalLedger: null,
      cashBook: null,
      bankStatement: null,
      fixedAssetRegister: null,
      gstReturns: null,
      tdsSummary: null,
    });
  };

  // Handle audit file uploads
  const handleAuditFileChange = (field, file) => {
    setAuditFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  // Remove audit file
  const removeAuditFile = (field) => {
    setAuditFiles(prev => ({
      ...prev,
      [field]: null
    }));
  };

  // Handle GST file uploads
  const handleGstFileChange = (field, file) => {
    setGstFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  // Remove GST file
  const removeGstFile = (field) => {
    setGstFiles(prev => ({
      ...prev,
      [field]: null
    }));
  };

  // Start processing
  const handleStartProcessing = async () => {
    if (documentType === "audit") {
      // Validate audit inputs - check if at least one file is uploaded
      const uploadedFiles = Object.values(auditFiles).filter(file => file !== null);
      if (uploadedFiles.length === 0) {
        alert("Please upload at least one PDF or DOCX file to generate the audit report.");
        return;
      }
      
      try {
        navigate("/dashboard/processing", {
          state: {
            documentType: "audit",
            auditFiles: auditFiles,
            isMultipleFiles: true
          }
        });
      } catch (error) {
        console.error("Error starting processing:", error);
        alert("Failed to start processing. Please try again.");
      }
    } else if (documentType === "gst_return") {
      // Validate GST inputs - check if at least one Excel file is uploaded
      const uploadedFiles = Object.values(gstFiles).filter(file => file !== null);
      if (uploadedFiles.length === 0) {
        alert("Please upload at least one Excel file (GSTR-2B Summary, Purchase Register, or Vendor Master) to generate GST reports.");
        return;
      }
      
      try {
        navigate("/dashboard/processing", {
          state: {
            documentType: "gst_return",
            gstFiles: gstFiles,
            isMultipleFiles: true
          }
        });
      } catch (error) {
        console.error("Error starting processing:", error);
        alert("Failed to start processing. Please try again.");
      }
    } else {
      // Regular single file upload
      if (!file) return;
      if (!documentType) {
        alert("Please select a document type before processing.");
        return;
      }
      
      try {
        navigate("/dashboard/processing", { 
          state: { 
            fileName: file.name, 
            fileSize: file.size, 
            file: file,
            documentType: documentType
          } 
        });
      } catch (error) {
        console.error("Error starting processing:", error);
        alert("Failed to start processing. Please try again.");
      }
    }
  };

  // Check if audit form is valid - at least one file must be uploaded
  const isAuditFormValid = () => {
    return Object.values(auditFiles).some(file => file !== null);
  };

  const isGstFormValid = () => {
    return Object.values(gstFiles).some(file => file !== null);
  };

  // Check if regular form is valid
  const isRegularFormValid = () => {
    return file && documentType;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20 font-sans">
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
              icon={<UploadIcon className="w-5 h-5" />} 
              label="Upload Document" 
              active
              onClick={() => navigate("/dashboard/upload")}
            />
            <SidebarLink 
              icon={<History className="w-5 h-5" />} 
              label="History" 
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
      <main className="flex-1 flex flex-col bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20">
        {/* ---------- TOP BAR ---------- */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-xl px-6 py-4 shadow-sm border-b border-[#E5E7EB]/50">
          <h1 className="text-lg font-semibold text-[#0F172A] tracking-[-0.01em]">
            Upload Document
          </h1>
        </header>

        {/* ---------- UPLOAD CONTENT ---------- */}
        <div className={`flex-1 overflow-y-auto flex flex-col px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 ${
          (documentType === "audit" || documentType === "gst_return") ? "items-start" : "items-center justify-center"
        }`}>
          {/* ---------- PAGE TITLE ---------- */}
          <div className={`text-center mb-6 lg:mb-8 w-full px-2 sm:px-4 ${(documentType === "audit" || documentType === "gst_return") ? "max-w-6xl mx-auto" : "max-w-2xl mx-auto"}`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-3 tracking-[-0.01em] leading-[1.15] break-words">
              Upload Your Financial Document
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#64748B] leading-[1.6] break-words whitespace-normal px-2">
              Supported formats: <span className="font-semibold text-[#0F172A]">PDF</span>,{" "}
              <span className="font-semibold text-[#0F172A]">Excel</span>,{" "}
              <span className="font-semibold text-[#0F172A]">CSV</span>, Bank Statements, Invoices
            </p>
          </div>

          {/* ---------- UPLOAD CARD CONTAINER ---------- */}
          <div className={`w-full px-2 sm:px-4 ${(documentType === "audit" || documentType === "gst_return") ? "max-w-6xl mx-auto" : "max-w-2xl mx-auto"}`}>
            <div className="bg-white rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E7EB] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-visible">
              {/* ---------- DOCUMENT TYPE SELECTOR ---------- */}
              <div className="w-full mb-6 sm:mb-8">
                <label className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-2 sm:mb-3 tracking-[-0.01em]">
                  Document Type <span className="text-red-500">*</span>
                </label>
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger
                    className={`w-full px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 bg-white border-2 rounded-xl text-left flex items-center justify-between gap-2 sm:gap-3 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:ring-offset-2 ${
                      documentType
                        ? "border-[#1E40AF] shadow-[0_4px_12px_rgba(30,64,175,0.12)]"
                        : "border-[#E5E7EB]"
                    } hover:border-[#1E40AF]/60 hover:shadow-[0_2px_8px_rgba(30,64,175,0.08)] hover:-translate-y-0.5 active:translate-y-0`}
                  >
                    <span className={`break-words whitespace-normal text-left flex-1 min-w-0 pr-2 text-sm sm:text-base font-medium ${
                      documentType ? "text-[#0F172A]" : "text-[#64748B]"
                    }`}>
                      {documentType
                        ? DOCUMENT_TYPES.find((dt) => dt.value === documentType)?.label
                        : "Select document type"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ease-out flex-shrink-0 ${
                        documentType ? "text-[#1E40AF]" : "text-gray-400"
                      } ${dropdownOpen ? "transform rotate-180" : ""}`}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-white border-2 border-[#E5E7EB] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)] p-1 min-w-[200px]"
                    align="start"
                    sideOffset={8}
                  >
                    {DOCUMENT_TYPES.map((type) => (
                      <DropdownMenuItem
                        key={type.value}
                        onClick={() => {
                          setDocumentType(type.value);
                          // Reset files when changing document type
                          if (type.value !== "audit") {
                            setFile(null);
                            setAuditFiles({
                              trialBalance: null,
                              profitLossStatement: null,
                              balanceSheet: null,
                              generalLedger: null,
                              cashBook: null,
                              bankStatement: null,
                              fixedAssetRegister: null,
                              gstReturns: null,
                              tdsSummary: null,
                            });
                          } else {
                            setFile(null);
                          }
                        }}
                        className={`w-full px-4 py-2.5 text-left transition-all duration-150 ease-out focus:outline-none break-words whitespace-normal text-sm sm:text-base rounded-lg ${
                          documentType === type.value
                            ? "bg-[#EFF6FF] text-[#1E40AF] font-semibold"
                            : "text-[#0F172A] hover:bg-[#F8FAFC] font-medium"
                        }`}
                      >
                        {type.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* ---------- UPLOAD SECTION (Conditional based on document type) ---------- */}
              {documentType === "audit" ? (
                <AuditUploadForm 
                  auditFiles={auditFiles}
                  onFileChange={handleAuditFileChange}
                  onRemoveFile={removeAuditFile}
                />
              ) : documentType === "gst_return" ? (
                <GstUploadForm 
                  gstFiles={gstFiles}
                  onFileChange={handleGstFileChange}
                  onRemoveFile={removeGstFile}
                />
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`w-full min-h-72 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ease-out cursor-pointer ${
                    dragOver
                      ? "border-[#1E40AF] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] shadow-[0_8px_24px_rgba(30,64,175,0.25),0_2px_8px_rgba(30,64,175,0.15)] scale-[1.01]"
                      : "border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#1E40AF]/60 hover:bg-gradient-to-br hover:from-[#F8FAFC] hover:to-[#F1F5F9] hover:shadow-[0_4px_16px_rgba(30,64,175,0.1)] hover:-translate-y-0.5"
                  }`}
                >
                  {!file ? (
                    <>
                      <div className={`mb-6 p-5 rounded-2xl transition-all duration-300 ease-out ${
                        dragOver 
                          ? "bg-white/80 shadow-[0_4px_12px_rgba(30,64,175,0.15)] scale-110" 
                          : "bg-white/50 hover:bg-white/70 hover:scale-105 hover:-translate-y-1"
                      }`}>
                        <UploadIcon className={`w-12 h-12 transition-all duration-300 ease-out ${
                          dragOver ? "text-[#1E40AF] scale-110" : "text-[#64748B]"
                        }`} />
                      </div>
                      <p className={`text-sm sm:text-base font-semibold mb-2 transition-all duration-300 ease-out break-words whitespace-normal px-3 sm:px-4 text-center ${
                        dragOver ? "text-[#1E40AF] scale-105" : "text-[#0F172A]"
                      }`}>
                        Drag & Drop your document here
                      </p>
                      <p className="text-[#64748B] text-xs sm:text-sm mb-4 transition-opacity duration-300 break-words whitespace-normal px-3 sm:px-4 text-center">
                        or click to browse
                      </p>
                      <span className="text-[#CBD5E1] text-xs font-medium my-2 flex items-center gap-2 w-full max-w-[200px] px-4">
                        <span className="flex-1 h-px bg-[#E5E7EB]"></span>
                        OR
                        <span className="flex-1 h-px bg-[#E5E7EB]"></span>
                      </span>
                      <label className="cursor-pointer bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] hover:from-[#1E3A8A] hover:to-[#7C3AED] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-[0_4px_12px_rgba(30,64,175,0.3)] hover:shadow-[0_6px_16px_rgba(30,64,175,0.4)] transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 ease-out mt-2 active:scale-[0.98] active:translate-y-0 break-words whitespace-normal">
                        Browse Files
                        <input
                          type="file"
                          accept=".pdf,.xls,.xlsx,.csv,.doc,.docx,.jpg,.png"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </>
                  ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-5 w-full px-6">
                  <div className="p-4 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-2xl shadow-[0_4px_12px_rgba(30,64,175,0.15)]">
                    <FileText className="w-12 h-12 text-[#1E40AF]" />
                  </div>
                  <div className="space-y-1 w-full max-w-full px-4">
                    <p className="text-[#0F172A] font-semibold text-base break-words whitespace-normal w-full">{file.name}</p>
                    <p className="text-[#64748B] text-sm">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={removeFile}
                      className="flex items-center px-5 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-all duration-200 ease-out border border-red-200/50 hover:border-red-300 hover:shadow-[0_2px_8px_rgba(239,68,68,0.15)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
                    >
                      <XCircle className="w-4 h-4 mr-2" /> Remove
                    </button>
                    <label className="flex items-center px-5 py-2.5 rounded-xl bg-[#EFF6FF] text-[#1E40AF] text-sm font-semibold hover:bg-[#DBEAFE] transition-all duration-200 ease-out border border-[#1E40AF]/20 hover:border-[#1E40AF]/30 hover:shadow-[0_2px_8px_rgba(30,64,175,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1E40AF]/20 focus-within:ring-offset-2">
                      <UploadIcon className="w-4 h-4 mr-2" />
                      Re-upload
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              )}
                </div>
              )}

              {/* ---------- PROCESS BUTTON ---------- */}
              <div className="mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 border-t border-[#E5E7EB]">
                <button
                  onClick={handleStartProcessing}
                  disabled={
                    documentType === "audit" ? !isAuditFormValid() : 
                    documentType === "gst_return" ? !isGstFormValid() : 
                    !isRegularFormValid()
                  }
                  className={`w-full py-3 sm:py-4 rounded-xl text-white font-semibold text-sm sm:text-base transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:ring-offset-2 break-words whitespace-normal ${
                    (documentType === "audit" ? isAuditFormValid() : 
                     documentType === "gst_return" ? isGstFormValid() : 
                     isRegularFormValid())
                      ? "bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] hover:from-[#1E3A8A] hover:to-[#7C3AED] shadow-[0_6px_20px_rgba(30,64,175,0.4)] hover:shadow-[0_8px_28px_rgba(30,64,175,0.5)] transform hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] active:translate-y-0"
                      : "bg-[#E5E7EB] text-[#94A3B8] cursor-not-allowed"
                  }`}
                >
                  Start AI Processing
                </button>
                {documentType && documentType !== "audit" && documentType !== "gst_return" && !file && (
                  <p className="mt-3 text-sm text-red-600 text-center font-medium">
                    Please upload a file to continue
                  </p>
                )}
                {documentType === "audit" && !isAuditFormValid() && (
                  <p className="mt-3 text-sm text-red-600 text-center font-medium">
                    Please upload at least one PDF or DOCX file to generate the audit report
                  </p>
                )}
                {documentType === "gst_return" && !isGstFormValid() && (
                  <p className="mt-3 text-sm text-red-600 text-center font-medium">
                    Please upload at least one Excel file to generate GST reports
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Audit Upload Form Component ---
const AuditUploadForm = ({ auditFiles, onFileChange, onRemoveFile }) => {
  const [dragOverField, setDragOverField] = useState(null);

  // Handle drag and drop
  const handleDragOver = (e, fieldKey) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(fieldKey);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);
  };

  const handleDrop = (e, fieldKey) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Validate it's a PDF or DOCX
      const isValidFile = file.type === "application/pdf" || 
                         file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                         file.type === "application/msword" ||
                         file.name.toLowerCase().endsWith(".pdf") ||
                         file.name.toLowerCase().endsWith(".docx") ||
                         file.name.toLowerCase().endsWith(".doc");
      if (isValidFile) {
        onFileChange(fieldKey, file);
      } else {
        alert("Please drop a PDF or DOCX file only.");
      }
    }
  };

  const auditInputs = [
    {
      key: "trialBalance",
      label: "Trial Balance",
      description: "PDF or DOCX file containing trial balance",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📊"
    },
    {
      key: "profitLossStatement",
      label: "Profit & Loss Statement",
      description: "PDF or DOCX file containing profit & loss statement",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📈"
    },
    {
      key: "balanceSheet",
      label: "Balance Sheet",
      description: "PDF or DOCX file containing balance sheet",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📋"
    },
    {
      key: "generalLedger",
      label: "General Ledger",
      description: "PDF or DOCX file containing general ledger sample",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📔"
    },
    {
      key: "cashBook",
      label: "Cash Book",
      description: "PDF or DOCX file containing cash book records",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "💰"
    },
    {
      key: "bankStatement",
      label: "Bank Statement",
      description: "PDF or DOCX file containing bank statement",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "🏦"
    },
    {
      key: "fixedAssetRegister",
      label: "Fixed Asset Register",
      description: "PDF or DOCX file containing fixed asset register",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "🏢"
    },
    {
      key: "gstReturns",
      label: "GST Returns",
      description: "PDF or DOCX file containing GST returns",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📑"
    },
    {
      key: "tdsSummary",
      label: "TDS Summary",
      description: "PDF or DOCX file containing TDS summary (e.g., FY 2023-24)",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📄"
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-blue-900 mb-1">INPUTS FOR AUDIT REPORT</h3>
        <p className="text-sm text-blue-700">Please upload the PDF or DOCX files you have. Upload as many as available - the audit report will be generated from all uploaded documents.</p>
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auditInputs.map((input) => (
          <div 
            key={input.key} 
            className="bg-white border-2 rounded-lg p-4 transition-colors"
            style={{
              borderColor: dragOverField === input.key ? "#3b82f6" : auditFiles[input.key] ? "#10b981" : "#e5e7eb",
              backgroundColor: dragOverField === input.key ? "#eff6ff" : "white"
            }}
            onDragOver={(e) => handleDragOver(e, input.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, input.key)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  {input.icon} {input.label}
                  {input.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <p className="text-xs text-gray-500 mb-3">{input.description}</p>
              </div>
            </div>
            
            {auditFiles[input.key] ? (
              <div className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                <div className="flex items-center flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 break-words whitespace-normal">{auditFiles[input.key].name}</span>
                </div>
                <button
                  onClick={() => onRemoveFile(input.key)}
                  className="ml-2 text-red-600 hover:text-red-700 transition"
                  title="Remove file"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div 
                  className={`border-2 border-dashed rounded-md p-3 text-center transition-colors ${
                    dragOverField === input.key
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <UploadIcon className={`w-5 h-5 mx-auto mb-1 ${
                    dragOverField === input.key ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <span className={`text-xs ${
                    dragOverField === input.key ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}>
                    {dragOverField === input.key ? "Drop PDF here" : "Click to upload or drag & drop"}
                  </span>
                </div>
                <input
                  type="file"
                  accept={input.accept}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Validate it's a PDF or DOCX
                      const isValidFile = file.type === "application/pdf" || 
                                         file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                         file.type === "application/msword" ||
                                         file.name.toLowerCase().endsWith(".pdf") ||
                                         file.name.toLowerCase().endsWith(".docx") ||
                                         file.name.toLowerCase().endsWith(".doc");
                      if (isValidFile) {
                        onFileChange(input.key, file);
                      } else {
                        alert("Please select a PDF or DOCX file only.");
                      }
                    }
                  }}
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- GST Upload Form Component ---
const GstUploadForm = ({ gstFiles, onFileChange, onRemoveFile }) => {
  const [dragOverField, setDragOverField] = useState(null);

  // Handle drag and drop
  const handleDragOver = (e, fieldKey) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(fieldKey);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);
  };

  const handleDrop = (e, fieldKey) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Validate it's an Excel file
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
          file.type === "application/vnd.ms-excel" ||
          file.name.toLowerCase().endsWith(".xlsx") ||
          file.name.toLowerCase().endsWith(".xls")) {
        onFileChange(fieldKey, file);
      } else {
        alert("Please drop an Excel file (.xlsx or .xls) only.");
      }
    }
  };

  const gstInputs = [
    {
      key: "gstr2bSummary",
      label: "GSTR-2B Summary",
      description: "Excel file containing GSTR-2B summary data",
      accept: ".xlsx,.xls",
      required: false,
      icon: "📊"
    },
    {
      key: "purchaseRegister",
      label: "Purchase Register",
      description: "Excel file containing purchase register data",
      accept: ".xlsx,.xls",
      required: false,
      icon: "🛒"
    },
    {
      key: "vendorMaster",
      label: "Vendor Master",
      description: "Excel file containing vendor master data",
      accept: ".xlsx,.xls",
      required: false,
      icon: "👥"
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-green-900 mb-1">INPUTS FOR GST REPORTS</h3>
        <p className="text-sm text-green-700">Please upload the Excel files you have. Upload as many as available - GST reports will be generated from all uploaded documents.</p>
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gstInputs.map((input) => (
          <div 
            key={input.key} 
            className="bg-white border-2 rounded-lg p-4 transition-colors"
            style={{
              borderColor: dragOverField === input.key ? "#3b82f6" : gstFiles[input.key] ? "#10b981" : "#e5e7eb",
              backgroundColor: dragOverField === input.key ? "#eff6ff" : "white"
            }}
            onDragOver={(e) => handleDragOver(e, input.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, input.key)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  {input.icon} {input.label}
                  {input.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <p className="text-xs text-gray-500 mb-3">{input.description}</p>
              </div>
            </div>
            
            {gstFiles[input.key] ? (
              <div className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                <div className="flex items-center flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 break-words whitespace-normal">{gstFiles[input.key].name}</span>
                </div>
                <button
                  onClick={() => onRemoveFile(input.key)}
                  className="ml-2 text-red-600 hover:text-red-700 transition"
                  title="Remove file"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div 
                  className={`border-2 border-dashed rounded-md p-3 text-center transition-colors ${
                    dragOverField === input.key
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                  }`}
                >
                  <UploadIcon className={`w-5 h-5 mx-auto mb-1 ${
                    dragOverField === input.key ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <span className={`text-xs ${
                    dragOverField === input.key ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}>
                    {dragOverField === input.key ? "Drop Excel here" : "Click to upload or drag & drop"}
                  </span>
                </div>
                <input
                  type="file"
                  accept={input.accept}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.name.toLowerCase().endsWith(".xlsx") || file.name.toLowerCase().endsWith(".xls")) {
                        onFileChange(input.key, file);
                      } else {
                        alert("Please select an Excel file (.xlsx or .xls)");
                      }
                    }
                  }}
                />
              </label>
            )}
          </div>
        ))}
      </div>
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

export default UploadPage;
