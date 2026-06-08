import "./validate.css";

interface Props {
  searchParams: Promise<{
    id?: string;
  }>;
}

async function verifyCertificate(id: string) {
  try {
    const response = await fetch(
      `https://certiwall-minimal.vercel.app/api/verify/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    return await response.json();
  } catch {
    return {
      valid: false,
      message: "Verification service unavailable",
    };
  }
}

export default async function ValidatePage({
  searchParams,
}: Props) {
  const { id } = await searchParams;

  const result = id ? await verifyCertificate(id) : null;

  return (
    <body>
      <div className="top-bar">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <main className="main">
        <div className="hero">
          <h1 className="hero-title">Verify Certificate</h1>

          <p className="hero-subtitle">
            Check the authenticity of your
            <span> certificate</span>
          </p>
        </div>

        <div className="search-card">
          <form
            method="GET"
            action="/validate"
            className="input-group"
          >
            <div className="input-wrapper">
              <input
                name="id"
                defaultValue={id}
                className="cert-input"
                placeholder="MUCSW2026-000006"
              />
            </div>

            <button
              type="submit"
              className="verify-btn"
            >
              Verify
            </button>
          </form>

          {result?.valid && (
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
                <div className="result-icon">
                  ✕
                </div>

                <div>
                  <div className="result-status-title">
                    Not Found
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

      <div className="bottom-bar">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </body>
  );
}
