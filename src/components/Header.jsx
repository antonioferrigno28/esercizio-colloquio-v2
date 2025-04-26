export default function Header() {
  return (
    <div className="container" bis_skin_checked="1">
      <header className="d-flex flex-wrap justify-content-between align-items-center py-2 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 link-dark text-decoration-none"
        >
          <img src="images/logo.png" alt="Logo" className="logo" />
        </a>
        <h1 className="fs-4 fw-semibold fst-italic mt-3">
          Shopping facile, soddisfazione garantita!
        </h1>
      </header>
    </div>
  );
}
