import React, { useEffect, useRef } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z"/>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="1" y1="1" x2="13" y2="13"/>
    <line x1="13" y1="1" x2="1" y2="13"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.6H22l-6.4 4.6 2.4 7.6L12 17.2 5.9 21.8l2.4-7.6L2 9.6h7.6L12 2z"/>
  </svg>
);

// ─── Login Card ───────────────────────────────────────────────────────────────

const Login = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "fadeIn 0.18s ease",
        padding: "16px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(22px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .login-card  { font-family: 'Sora', sans-serif; }
        .login-card * { box-sizing: border-box; }

        .auth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 11px 20px;
          border-radius: 10px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s ease;
          border: none;
          outline: none;
          position: relative;
          overflow: hidden;
        }
        .auth-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.18s ease;
        }
        .auth-btn:hover::after { background: rgba(255,255,255,0.06); }
        .auth-btn:active { transform: scale(0.985); }

        .google-btn {
          background: #18181b;
          color: #e4e4e7;
          border: 1px solid #3f3f46;
        }
        .google-btn:hover { border-color: #71717a; }

        .github-btn {
          background: #fff;
          color: #09090b;
          border: 1px solid #e4e4e7;
        }
        .github-btn:hover { background: #f4f4f5; }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #71717a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }
        .close-btn:hover { color: #e4e4e7; background: #27272a; }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #27272a;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 500;
          color: #a1a1aa;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .logo-mark {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          color: #09090b;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 4px 20px rgba(255,255,255,0.08);
        }

        .card-glow {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      {/* Card */}
      <div
        className="login-card"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          background: "#0f0f11",
          border: "1px solid #27272a",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.7)",
          animation: "slideUp 0.22s cubic-bezier(0.34,1.2,0.64,1)",
          overflow: "hidden",
        }}
      >
        <div className="card-glow" />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="logo-mark">D</div>
            <div>
              <div className="badge">
                <SparkleIcon /> Free to start
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <XIcon />
          </button>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{
            margin: "0 0 6px",
            fontSize: "22px",
            fontWeight: 600,
            color: "#fafafa",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}>
            Welcome to DocGen <span style={{ color: "#71717a", fontWeight: 400 }}>AI</span>
          </h2>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#71717a", lineHeight: 1.6 }}>
            Sign in to start generating docs in seconds. No credit card required.
          </p>
        </div>

        {/* Auth buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            className="auth-btn google-btn"
            onClick={() => alert("Google OAuth — wire up your provider here")}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <button
            className="auth-btn github-btn"
            onClick={() => alert("GitHub OAuth — wire up your provider here")}
          >
            <GitHubIcon />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "22px 0" }}>
          <div className="divider-line" />
          <span style={{ fontSize: "12px", color: "#52525b", whiteSpace: "nowrap" }}>or sign in with email</span>
          <div className="divider-line" />
        </div>

        {/* Email placeholder */}
        <input
          type="email"
          placeholder="you@example.com"
          style={{
            width: "100%",
            padding: "11px 14px",
            borderRadius: "10px",
            background: "#18181b",
            border: "1px solid #3f3f46",
            color: "#e4e4e7",
            fontSize: "14px",
            fontFamily: "'Sora', sans-serif",
            outline: "none",
            transition: "border-color 0.15s",
            marginBottom: "10px",
          }}
          onFocus={e => e.target.style.borderColor = "#71717a"}
          onBlur={e => e.target.style.borderColor = "#3f3f46"}
        />
        <button
          className="auth-btn"
          style={{ background: "#fff", color: "#09090b", fontWeight: 600 }}
          onClick={() => alert("Email sign-in — wire up your auth here")}
        >
          Continue with Email
        </button>

        {/* Footer */}
        <p style={{
          margin: "20px 0 0",
          fontSize: "12px",
          color: "#52525b",
          textAlign: "center",
          lineHeight: 1.6,
        }}>
          By continuing, you agree to our{" "}
          <a href="#" style={{ color: "#71717a", textDecoration: "underline" }}>Terms</a>
          {" "}and{" "}
          <a href="#" style={{ color: "#71717a", textDecoration: "underline" }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;