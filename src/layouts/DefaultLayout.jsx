import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <div className="container py-5 mb-5">
        <div className="main-content">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
}
