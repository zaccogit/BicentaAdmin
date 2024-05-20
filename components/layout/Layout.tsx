"use client";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Suspense, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title = "Sample Title" }: any) => {
  //console.log("layout", title)
  const [mobileNavsidebar, setMobileNavsidebar] = useState(false);

  return (
    <>
      <div className="flex bg-gray-100 min-h-screen relative">
        <Sidebar mobileNavsidebar={mobileNavsidebar} />

        <div className="flex-grow text-gray-800">
          <Header
            mobileNavsidebar={mobileNavsidebar}
            setMobileNavsidebar={setMobileNavsidebar}
          />
          {children}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
