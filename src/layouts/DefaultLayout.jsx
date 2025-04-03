import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function DefaultLayout() {
  return (
    <>
      <div className="wrapper">
        <Header></Header>

        <Outlet></Outlet>

        <Footer></Footer>
      </div>
    </>
  );
}
