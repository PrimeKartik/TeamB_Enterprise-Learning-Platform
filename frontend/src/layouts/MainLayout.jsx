import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-base flex flex-col">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <ScrollToTopButton />

    </div>
  );
}