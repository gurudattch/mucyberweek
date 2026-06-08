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
      `https://certiwall-minimal.vercel.app/api/verify/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );

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
    <>
      <div className="top-bar">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <main className="main">
                <div class="hero">
            <div class="hero-icon">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3L35 10V25C35 32 28 37 20 37C12 37 5 32 5 25V10L20 3Z"
                          stroke="#FF6B35" stroke-width="2" fill="rgba(255,107,53,0.06)"/>
                    <path d="M16 19V15C16 12.5 17.8 11 20 11C22.2 11 24 12.5 24 15V19"
                          stroke="#FF6B35" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    <rect x="14" y="19" width="12" height="9" rx="2" stroke="#FF6B35" stroke-width="1.5" fill="rgba(255,107,53,0.08)"/>
                    <circle cx="20" cy="24" r="1.5" fill="#FF6B35"/>
                </svg>
            </div>
            <h1 class="hero-title">Verify Certificate</h1>
            <p class="hero-subtitle">Check the authenticity of your <span>Cyber Security Week 2026</span> certificate</p>
        </div>
          <div class="certiwall-inner">
            <div class="certiwall-co">Powered By</div>
            <div class="certiwall-logo-row">
                <div class="certiwall-logo">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="8" fill="#4ECDC4"/>
                        <path d="M10 16L14 20L22 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 8V6C6 4.9 6.9 4 8 4H10" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
                        <path d="M22 4H24C25.1 4 26 4.9 26 6V8" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
                        <path d="M26 24V26C26 27.1 25.1 28 24 28H22" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
                        <path d="M10 28H8C6.9 28 6 27.1 6 26V24" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
                    </svg>
                </div>
                <div class="certiwall-name"><a href="https://certiwall.in">Certi<span>wall</span></a></div>
            </div>
        </div>
        <div class="wavy">
            <svg viewBox="0 0 140 10" fill="none">
                <path d="M0 5C12 1 23 9 35 5C47 1 58 9 70 5C82 1 93 9 105 5C117 1 128 9 140 5"
                      stroke="#FF69B4" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
            </svg>
        </div>
     
        <div className="search-card">
          <form
            action="/validate"
            method="GET"
            className="input-group"
          >
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
                    Issue Date
                  </span>
                  <span className="result-field-value">
                    {new Date(
                      result.certificate.issueDate
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="result-field">
                  <span className="result-field-label">
                    Participant
                  </span>
                  <span className="result-field-value name" style="color:red">
                    {result.certificate.revokeReason}
                  </span>
                </div>
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
      <footer class="certiwall-brand">
        <div class="certiwall-inner">
            <div class="certiwall-co">Powered By</div>
            <div class="certiwall-logo-row">
                <div class="certiwall-logo">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="8" fill="#4ECDC4"/>
                        <path d="M10 16L14 20L22 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 8V6C6 4.9 6.9 4 8 4H10" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
                        <path d="M22 4H24C25.1 4 26 4.9 26 6V8" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
                        <path d="M26 24V26C26 27.1 25.1 28 24 28H22" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
                        <path d="M10 28H8C6.9 28 6 27.1 6 26V24" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
                    </svg>
                </div>
                <div class="certiwall-name"><a href="https://certiwall.in">Certi<span>wall</span></a></div>
            </div>
            <div class="certiwall-tagline">A New Era of Digital Certificates, Your ultimate certificatate solutions</div>
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
