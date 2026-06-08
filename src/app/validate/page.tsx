export const dynamic = "force-dynamic";

import "./validate.css";

interface PageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

async function verifyCertificate(id: string) {
  try {
    const response = await fetch(
      `https://certiwall-minimal.vercel.app/api/verify/${encodeURIComponent(
        id
      )}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        valid: false,
        message: "Certificate not found.",
      };
    }

    return await response.json();
  } catch {
    return {
      valid: false,
      message: "Verification service unavailable.",
    };
  }
}

export default async function ValidatePage({
  searchParams,
}: PageProps) {
  const { id } = await searchParams;

  const result = id ? await verifyCertificate(id) : null;

  return (
    <main className="main">
      <div className="search-card">
        <form action="/validate" method="GET" className="input-group">
          <div className="input-wrapper">
            <input
              type="text"
              name="id"
              defaultValue={id ?? ""}
              className="cert-input"
              placeholder="MUCSW2026-000006"
              autoComplete="off"
            />
          </div>

          <button type="submit" className="verify-btn">
            Verify
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
                  {result.certificate.issueDate
                    ? new Date(
                        result.certificate.issueDate
                      ).toLocaleDateString()
                    : "N/A"}
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
  );
}
