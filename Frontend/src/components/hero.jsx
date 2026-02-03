import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <main className="landing">
      <section className="container landing-hero">
        <h1>Email & message rewriter</h1>
        <p>
          A simple tool to clean up messages fast. Paste your draft, choose a
          tone, and get a better version in seconds.
        </p>
        <div className="landing-actions">
          <Link to="/rewrite" className="btn btn-primary">
            Go to rewriter
          </Link>
          <Link to="/rewrite" className="btn btn-ghost">
            Start now
          </Link>
        </div>
      </section>
    </main>
  )
}
