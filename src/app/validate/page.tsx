"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./validate.css";

export default function ValidatePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(
      `https://certiwall-minimal.vercel.app/api/verify/${encodeURIComponent(id)}`
    )
      .then((r) => r.json())
      .then((data) => setResult(data))
      .catch(() =>
        setResult({
          valid: false,
          message: "Verification service unavailable",
        })
      )
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className="main">
      <div className="hero">
        <h1 className="hero-title">Verify Certificate</h1>
      </div>

      <div className="search-card">
        <form action="/validate" method="GET" className="input-group">
          <div className="input-wrapper">
            <input
              name="id"
              defaultValue={id ?? ""}
              className="cert-input"
              placeholder="MUCSW2026-000006"
            />
          </div>

          <button type="submit" className="verify-btn">
            Verify
          </button>
        </form>

        {loading && (
          <div className="invalid-body">
            <p>Verifying certificate...</p>
          </div>
        )}

        {result?.valid && (
          <div className="result-card valid visible">
            <div className="result-header">
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
                  Issued On
                </span>
                <span className="result-field-value">
                  {new Date(
                    result.certificate.issueDate
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {result && !result.valid && (
          <div className="result-card invalid visible">
            <div className="result-header">
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
  );
}
