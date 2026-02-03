import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { rewriteMessage } from "../service/axios";

export default function Rewrite() {
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");
  const [tone, setTone] = useState("friendly");
  const [platform, setPlatform] = useState("email");
  const [length, setLength] = useState("short");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => message.trim().length > 0, [message]);

  const handleSubmit = async () => {
    if (!canSubmit || isLoading) return;
    setIsLoading(true);
    setError("");
    setOutput("");
    try {
      const response = await rewriteMessage({
        message,
        tone,
        platform,
        length,
      });
      setOutput(response.data.rewritten_message);
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        "Something went wrong. Please try again.";
      setError(detail);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      setError("Copy failed. Please select and copy manually.");
    }
  };

  return (
    <div className="rewrite-page">
      <header className="rewrite-header">
        <div className="container rewrite-header-inner">
          <div>
            <p className="eyebrow">Rewrite workspace</p>
            <h1>Give every message the right tone.</h1>
            <p className="subtle">
              Paste a draft, choose a style, and get a refined version ready to
              send.
            </p>
          </div>
          <div className="rewrite-actions">
            <Link to="/" className="btn btn-ghost">
              Back to home
            </Link>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
            >
              {isLoading ? "Rewriting..." : "Rewrite now"}
            </button>
          </div>
        </div>
      </header>

      <main className="container rewrite-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>Original message</h2>
            <span className="pill">Draft</span>
          </div>
          <textarea
            className="panel-input"
            rows="10"
            placeholder="Paste your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {error ? <div className="alert">{error}</div> : null}
          <div className="controls">
            <div>
              <p className="label">Tone</p>
              <div className="chips">
                {[
                  { key: "formal", label: "Formal" },
                  { key: "semi-formal", label: "Semi-formal" },
                  { key: "casual", label: "Casual" },
                  { key: "friendly", label: "Friendly" },
                  { key: "persuasive", label: "Persuasive" },
                  { key: "empathetic", label: "Empathetic" },
                ].map((item) => (
                  <button
                    key={item.key}
                    className={`chip ${tone === item.key ? "chip-active" : ""}`}
                    type="button"
                    onClick={() => setTone(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="control-row">
              <div>
                <p className="label">Length</p>
                <select
                  className="select"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
              <div>
                <p className="label">Platform</p>
                <select
                  className="select"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
            >
              {isLoading ? "Rewriting..." : "Rewrite message"}
            </button>
          </div>
        </section>

        <section className="panel panel-output">
          <div className="panel-header">
            <h2>Polished version</h2>
            <span className="pill">Ready to send</span>
          </div>
          <div className="output-box">
            {output ? (
              <p>{output}</p>
            ) : (
              <p className="muted">
                Your rewritten message will appear here. Preview, edit, and copy
                when you’re happy with it.
              </p>
            )}
          </div>
          <div className="output-actions">
            <button className="btn btn-ghost" type="button" onClick={handleCopy}>
              Copy
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
            >
              {isLoading ? "Working..." : "Regenerate"}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
