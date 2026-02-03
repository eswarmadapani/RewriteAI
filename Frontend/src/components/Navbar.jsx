import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="brand">RewriteAI</Link>
        <Link to="/rewrite" className="btn btn-primary">
          Open rewriter
        </Link>
      </div>
    </header>
  )
}
