"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Define the expected shape of your API response (the inner certificate object)
interface CertificateData {
  id?: string;
  certificateId: string;
  participantId: string;
  eventId: string;
  templateId: string;
  pdfUrl: string | null;
  pngUrl: string | null;
  status: "generated" | "revoked" | string;
  issueDate: string;
  emailStatus: string;
  emailSentAt: string | null;
  emailOpened: boolean;
  qrCodeData: string; // JSON string
  revokedAt: string | null;
  revokeReason: string | null;
  createdAt: string;
  updatedAt: string;
}

// 1. We move the main logic into a child component so we can use useSearchParams safely
function ValidateContent() {
  const searchParams = useSearchParams();
  const urlId = searchParams.get("id") || "";

  const [searchId, setSearchId] = useState(urlId);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Extracted the fetch logic so it can be called by both the form and the URL hook
  const verifyCertificate = async (idToVerify: string) => {
    if (!idToVerify) return;

    setLoading(true);
    setError("");
    setCertificate(null);

    try {
      const res = await fetch(
        `https://certiwall-minimal.vercel.app/api/verify/${encodeURIComponent(idToVerify)}`,
        { cache: "no-store" }
      );
      
      if (!res.ok) {
        throw new Error("Certificate not found or invalid ID.");
      }
      
      const data = await res.json();
      
      // FIX: Extract the certificate object from the wrapped API response
      if (data.certificate) {
        setCertificate(data.certificate);
      } else {
        // Fallback in case the API sometimes returns the object directly
        setCertificate(data);
      }
      
      // If the API returns valid: false, you might want to show an error or treat it as revoked
      if (data.valid === false && !data.certificate) {
         throw new Error("This certificate is marked as invalid.");
      }

    } catch (err: any) {
      setError(err.message || "An error occurred while verifying.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-verify if the URL has an ID on first load
  useEffect(() => {
    if (urlId) {
      verifyCertificate(urlId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlId]);

  // Handle manual form submission
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCertificate(searchId);
  };

  // Helper to safely parse the JSON string stored in qrCodeData
  const getParsedQrData = (qrString: string) => {
    try {
      return JSON.parse(qrString);
    } catch (e) {
      return {};
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

 return (
  <div className="certiwall-inner">
    <div className="certiwall-co text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">
      Powered By
    </div>

    <div className="certiwall-logo-row mb-1">
      <div className="certiwall-name text-xl font-black font-display">
        <a
          href="https://certiwall.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-[#ff6b35] transition-colors"
        >
          Certi
          <span style={{ color: "#ff6b35" }}>wall</span>
        </a>
      </div>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden p-6 sm:p-10 my-8">

        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: "linear-gradient(135deg, var(--pink, #ff4e7c), var(--orange, #ff6b35))",
          }}
        />

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter Certificate ID (e.g. MUCYBER2026-000001)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 bg-gray-50 border border-gray-200 text-center sm:text-left text-gray-700 font-bold px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="text-white font-bold px-10 py-4 rounded-xl transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            style={{ background: "#ff6b35" }}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 text-red-500 font-bold p-6 rounded-2xl text-center mb-8">
            {error}
          </div>
        )}

        {certificate &&
          (() => {
            const qrData = getParsedQrData(certificate.qrCodeData);
            const isRevoked = certificate.status === "revoked";

            return (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div
                  className={`p-6 rounded-2xl flex items-start sm:items-center gap-4 mb-8 transition-colors ${
                    isRevoked ? "bg-red-500/90 text-white" : "bg-[#7cdbc4] text-white"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    {isRevoked ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold font-display leading-tight mb-1">
                      {isRevoked ? "Certificate Revoked!" : "Certificate Verified!"}
                    </h2>
                    <p className="text-white/90 text-sm font-body">
                      {isRevoked
                        ? "This certificate is no longer valid and has been revoked by the issuer."
                        : "This certificate is authentic and valid."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <DataRow label="Certificate ID" value={certificate.certificateId} valueColor="#ff4e7c" />
                  <DataRow label="Participant" value={qrData.participantName || "-"} />
                  <DataRow label="Event" value={qrData.eventName || "-"} />
                  <DataRow
                    label="Status"
                    value={certificate.status}
                    valueColor={isRevoked ? "#ef4444" : "#4b5563"}
                  />
                  <DataRow label="Issue Date" value={formatDate(certificate.issueDate)} />

                  {isRevoked && (
                    <>
                      <DataRow label="Revoked At" value={formatDate(certificate.revokedAt)} valueColor="#ef4444" />
                      <DataRow label="Revoke Reason" value={certificate.revokeReason || "No reason provided"} valueColor="#ef4444" />
                    </>
                  )}
                </div>
              </div>
            );
          })()}
      </div>
    </div>
  </div>
);
}

// 2. Wrap the parent page in a Suspense boundary for Next.js requirements
export default function ValidatePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center p-4 sm:p-6" style={{ background: "var(--cream, #fdfbf7)" }}>
        
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="text-gray-400 font-bold animate-pulse">Loading validation engine...</div>
          </div>
        }>
          <ValidateContent />
        </Suspense>

        {/* Certiwall Footer */}
        <footer className="certiwall-brand w-full text-center py-6 mt-auto">
          <div className="certiwall-inner">
            <div className="certiwall-co text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Powered By</div>
            <div className="certiwall-logo-row mb-1">
              <div className="certiwall-name text-xl font-black font-display">
                <a href="https://certiwall.in" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#ff6b35] transition-colors">
                  Certi<span style={{ color: "#ff6b35" }}>wall</span>
                </a>
              </div>
            </div>
            <div className="certiwall-tagline text-xs text-gray-400 font-body">
              A New Era of Digital Certificates, Your ultimate certificate solution
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

// Reusable component for the table rows
function DataRow({ label, value, valueColor = "#4b5563" }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex flex-col sm:flex-row py-4 border-b border-gray-100 last:border-0 gap-1 sm:gap-4">
      <div className="sm:w-1/3 text-xs font-bold text-gray-400 tracking-[0.15em] uppercase flex items-center">
        {label}
      </div>
      <div 
        className="sm:w-2/3 text-sm font-bold uppercase" 
        style={{ color: valueColor }}
      >
        {value}
      </div>
    </div>
  );
}
