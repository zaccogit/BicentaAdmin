/* eslint-disable react/jsx-key */
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavItem = ({ sidebarStatus, menuTitle, subMenu, subMenuArray, hrefLink, children }:any) => {
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);
  const subMenuToggle = () => {
    setSubMenuToggleStatus(!subMenuToggleStatus);
  };

  useEffect(() => {
    if (!sidebarStatus) {
      setSubMenuToggleStatus(false);
    }
  }, [sidebarStatus]);
  //console.log('submenu', sidebarStatus)
  return (
    <>
      {!subMenu ? (
        <li>
          <Link href={hrefLink}>{menuTitle}</Link>
        </li>
      ) : (
        <li>
          <details>
            <summary>{menuTitle}</summary>
            <ul>
              {subMenuArray?.map(({subMenuSingle, index}:any) => (
                <li>
                  <Link href={subMenuSingle.linkHref} key={index}>
                    {subMenuSingle.subMenuTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </li>
      )}

      {/* Chile Menu */}
    </>
  );
};

export default NavItem;
