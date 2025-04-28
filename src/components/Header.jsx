export default function Header() {
  return (
    <div className="container" bis_skin_checked="1">
      <header className="d-flex flex-wrap justify-content-between align-items-center py-2 border-bottom">
        <a href="/" className="">
          <img src="images/logo.png" alt="Logo" className="logo" />
        </a>
        <div className="d-flex ">
          <a
            href="/"
            className="d-flex align-items-center me-3 mt-3 fw-semibold fs-5 link-dark text-decoration-none"
          >
            Home
          </a>
          <a
            href="/orders"
            className="d-flex align-items-center mt-3 fw-semibold fs-5 link-dark text-decoration-none"
          >
            Lista ordini
          </a>
        </div>
      </header>
    </div>
  );
}
