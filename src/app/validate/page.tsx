"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./validate.css";

interface Certificate {
  certificateId: string;
  participantName: string;
  eventName: string;
  organizationName: string;
  status: string;
  issueDate: string;
  revokeReason?: string;
}

interface VerifyResponse {
  valid: boolean;
  message?: string;
  certificate?: Certificate;
}

export default function ValidatePage() {
  const searchParams = useSearchParams();

  const initialId = searchParams.get("id") || "";

  const [certificateId, setCertificateId] = useState(initialId);
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialId) {
      verifyCertificate(initialId);
    }
  }, [initialId]);

  async function verifyCertificate(id: string) {
    if (!id.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://certiwall-minimal.vercel.app/api/verify/${encodeURIComponent(
          id
        )}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();
      setResult(data);
    } catch {
      setResult({
        valid: false,
        message: "Verification service unavailable.",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const url = new URL(window.location.href);
    url.searchParams.set("id", certificateId);
    window.history.replaceState({}, "", url.toString());

    verifyCertificate(certificateId);
  }

  return (
    <>
      <div className="top-bar">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <main className="main">
        <div className="hero">
          <div className="hero-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M20 3L35 10V25C35 32 28 37 20 37C12 37 5 32 5 25V10L20 3Z"
                stroke="#FF6B35"
                strokeWidth="2"
                fill="rgba(255,107,53,0.06)"
              />
              <path
                d="M16 19V15C16 12.5 17.8 11 20 11C22.2 11 24 12.5 24 15V19"
                stroke="#FF6B35"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <rect
                x="14"
                y="19"
                width="12"
                height="9"
                rx="2"
                stroke="#FF6B35"
                strokeWidth="1.5"
                fill="rgba(255,107,53,0.08)"
              />
              <circle cx="20" cy="24" r="1.5" fill="#FF6B35" />
            </svg>
          </div>

          <h1 className="hero-title">Verify Certificate</h1>

          <p className="hero-subtitle">
            Check the authenticity of your
            <span> Cyber Security Week 2026 </span>
            certificate
          </p>
        </div>

        <div className="search-card">
          <form onSubmit={handleSubmit} className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="cert-input"
                placeholder="MUCSW2026-000006"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="verify-btn"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          {result?.valid && result.certificate && (
            <div className="result-card valid visible">
              <div className="result-header">
                <div
                  className="result-icon"
                  style={{ position: "relative" }}
                >
                  ✓
                </div>

                <div>
                  <div className="result-status-title">
                    Certificate Verified!
                  </div>

                  <div className="result-status-sub">
                    This certificate is authentic and valid
                  </div>
                </div>
              </div>

              <div className="result-body">
                <div className="result-field">
                  <span className="result-field-label">
                    Certificate ID
                  </span>
                  <span className="result-field-value cert-id">
                    {result.certificate.certificateId}
                  </span>
                </div>

                <div className="result-field">
                  <span className="result-field-label">
                    Participant
                  </span>
                  <span className="result-field-value name">
                    {result.certificate.participantName}
                  </span>
                </div>

                <div className="result-field">
                  <span className="result-field-label">
                    Event
                  </span>
                  <span className="result-field-value">
                    {result.certificate.eventName}
                  </span>
                </div>

                <div className="result-field">
                  <span className="result-field-label">
                    Organization
                  </span>
                  <span className="result-field-value">
                    {result.certificate.organizationName}
                  </span>
                </div>

                <div className="result-field">
                  <span className="result-field-label">
                    Status
                  </span>
                  <span className="result-field-value">
                    {result.certificate.status}
                  </span>
                </div>

                <div className="result-field">
                  <span className="result-field-label">
                    Issue Date
                  </span>
                  <span className="result-field-value">
                    {new Date(
                      result.certificate.issueDate
                    ).toLocaleDateString()}
                  </span>
                </div>

                {result.certificate.revokeReason && (
                  <div className="result-field">
                    <span className="result-field-label">
                      Revocation Reason
                    </span>
                    <span
                      className="result-field-value"
                      style={{ color: "red" }}
                    >
                      {result.certificate.revokeReason}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {result && !result.valid && (
            <div className="result-card invalid visible">
              <div className="result-header">
                <div className="result-icon">✕</div>

                <div>
                  <div className="result-status-title">
                    Certificate Not Found
                  </div>

                  <div className="result-status-sub">
                    Verification failed
                  </div>
                </div>
              </div>

              <div className="invalid-body">
                <p>{result.message}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="certiwall-brand">
        <div className="certiwall-inner">
          <div className="certiwall-co">Powered By</div>

          <div className="certiwall-logo-row">
            <div className="certiwall-name">
              <a
                href="https://certiwall.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                Certi<span>wall</span>
              </a>
            </div>
          </div>

          <div className="certiwall-tagline">
            A New Era of Digital Certificates, Your ultimate certificate
            solution
          </div>
        </div>
      </footer>

      <div className="bottom-bar">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </>
  );
}
