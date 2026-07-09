import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center" }}>
    <div>
      <h1 style={{ fontSize: 48, marginBottom: 12 }}>404</h1>
      <p style={{ marginBottom: 16 }}>This page could not be found.</p>
      <Link to="/" style={{ color: "#0057FF" }}>Back to home</Link>
    </div>
  </div>
);

export default NotFound;
