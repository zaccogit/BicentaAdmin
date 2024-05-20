import { CloudIcon, DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";

const Nav = ({ sidebarOutsideClick }: any) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);

  const sidebarClose = () => {
    setSidebarStatus(false);
  };

  const sidebarOpen = () => {
    setSidebarStatus(true);
  };

  const subMenuToggle = () => {
    setSubMenuToggleStatus(!subMenuToggleStatus);
  };

  //if menu has chile menu then  use seperate array
  const childMenu = [
    {
      subMenuTitle: "child One",
      linkHref: "/",
    },
    {
      subMenuTitle: "child Two",
      linkHref: "/",
    },
    {
      subMenuTitle: "child Three",
      linkHref: "/",
    },
  ];

  useEffect(() => {
    if (sidebarOutsideClick) {
      setSidebarStatus(false);
    }
  }, [sidebarOutsideClick]);
  //console.log("sidebar Nav", sidebarOutsideClick)
  return (
    <>
      <div className="menu menu-lg divide-y-2 w-56 rounded-box gap-2">
        <NavItem
          hrefLink="/dashboard"
          sidebarStatus={sidebarStatus}
          menuTitle="Inicio"
          subMenu={false}
          subMenuArray={null}
        />
        <NavItem
          hrefLink="/dashboard/Interaction"
          sidebarStatus={sidebarStatus}
          menuTitle="Interacción"
          subMenu={false}
          subMenuArray={null}
        />

        <NavItem
          hrefLink="/dashboard/Training"
          sidebarStatus={sidebarStatus}
          menuTitle="Entrenamiento"
          subMenu={false}
          subMenuArray={null}
        />

        {/* this menu has child Menu     */}
        {/* <NavItem
          hrefLink='#'
          sidebarStatus={sidebarStatus}
          menuTitle="Chiled Menu"
          subMenu={true}
          subMenuArray={childMenu}
          /> */}
      </div>
    </>
  );
};

export default Nav;
